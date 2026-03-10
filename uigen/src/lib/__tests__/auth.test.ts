import { describe, test, expect, vi, beforeEach } from "vitest";
import { SignJWT, jwtVerify } from "jose";

// Mock server-only so it doesn't throw outside Next.js
vi.mock("server-only", () => ({}));

// Track cookies set/deleted across calls
const cookieStore = {
  values: {} as Record<string, { value: string; options: Record<string, unknown> }>,
  set: vi.fn((name: string, value: string, options: Record<string, unknown>) => {
    cookieStore.values[name] = { value, options };
  }),
  get: vi.fn((name: string) => cookieStore.values[name]),
  delete: vi.fn((name: string) => {
    delete cookieStore.values[name];
  }),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(cookieStore)),
}));

// Import after mocks are in place
const { createSession, getSession, deleteSession } = await import("@/lib/auth");

const JWT_SECRET = new TextEncoder().encode("development-secret-key");

beforeEach(() => {
  cookieStore.values = {};
  vi.clearAllMocks();
});

describe("createSession", () => {
  test("sets an httpOnly cookie named 'auth-token'", async () => {
    await createSession("user-1", "user@example.com");

    expect(cookieStore.set).toHaveBeenCalledOnce();
    const [name, , options] = cookieStore.set.mock.calls[0];
    expect(name).toBe("auth-token");
    expect(options.httpOnly).toBe(true);
  });

  test("cookie is sameSite lax and path '/'", async () => {
    await createSession("user-1", "user@example.com");

    const [, , options] = cookieStore.set.mock.calls[0];
    expect(options.sameSite).toBe("lax");
    expect(options.path).toBe("/");
  });

  test("cookie expires approximately 7 days from now", async () => {
    const before = Date.now();
    await createSession("user-1", "user@example.com");
    const after = Date.now();

    const [, , options] = cookieStore.set.mock.calls[0];
    const expires = (options.expires as Date).getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    expect(expires).toBeGreaterThanOrEqual(before + sevenDaysMs - 1000);
    expect(expires).toBeLessThanOrEqual(after + sevenDaysMs + 1000);
  });

  test("cookie value is a valid signed JWT", async () => {
    await createSession("user-1", "user@example.com");

    const [, token] = cookieStore.set.mock.calls[0];
    const { payload } = await jwtVerify(token, JWT_SECRET);
    expect(payload).toBeTruthy();
  });

  test("JWT payload contains userId and email", async () => {
    await createSession("user-42", "hello@example.com");

    const [, token] = cookieStore.set.mock.calls[0];
    const { payload } = await jwtVerify(token, JWT_SECRET);
    expect(payload.userId).toBe("user-42");
    expect(payload.email).toBe("hello@example.com");
  });

  test("JWT expires in 7 days", async () => {
    const before = Math.floor(Date.now() / 1000);
    await createSession("user-1", "user@example.com");
    const after = Math.floor(Date.now() / 1000);

    const [, token] = cookieStore.set.mock.calls[0];
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const sevenDaysSeconds = 7 * 24 * 60 * 60;

    expect(payload.exp).toBeGreaterThanOrEqual(before + sevenDaysSeconds - 5);
    expect(payload.exp).toBeLessThanOrEqual(after + sevenDaysSeconds + 5);
  });
});

describe("getSession", () => {
  test("returns null when no cookie is present", async () => {
    const session = await getSession();
    expect(session).toBeNull();
  });

  test("returns the session payload for a valid token", async () => {
    await createSession("user-1", "user@example.com");

    const session = await getSession();

    expect(session).not.toBeNull();
    expect(session?.userId).toBe("user-1");
    expect(session?.email).toBe("user@example.com");
  });

  test("returns null for a token signed with a different secret", async () => {
    const wrongSecret = new TextEncoder().encode("wrong-secret");
    const token = await new SignJWT({ userId: "user-1", email: "user@example.com" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(wrongSecret);

    cookieStore.values["auth-token"] = { value: token, options: {} };

    const session = await getSession();
    expect(session).toBeNull();
  });

  test("returns null for a malformed token", async () => {
    cookieStore.values["auth-token"] = { value: "not.a.valid.jwt", options: {} };

    const session = await getSession();
    expect(session).toBeNull();
  });

  test("returns null for an expired token", async () => {
    const token = await new SignJWT({ userId: "user-1", email: "user@example.com" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("-1s")
      .sign(JWT_SECRET);

    cookieStore.values["auth-token"] = { value: token, options: {} };

    const session = await getSession();
    expect(session).toBeNull();
  });

  test("returned payload includes expiresAt", async () => {
    await createSession("user-1", "user@example.com");

    const session = await getSession();
    expect(session?.expiresAt).toBeDefined();
  });
});
