import { describe, test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

afterEach(cleanup);

describe("ToolInvocationDisplay", () => {
  describe("str_replace_editor", () => {
    test("shows 'Creating <filename>' for create command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create", path: "/src/App.jsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Creating App.jsx")).toBeTruthy();
    });

    test("shows 'Editing <filename>' for str_replace command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "str_replace", path: "/src/components/Card.tsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Editing Card.tsx")).toBeTruthy();
    });

    test("shows 'Editing <filename>' for insert command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "insert", path: "/src/index.js" }}
          state="call"
        />
      );
      expect(screen.getByText("Editing index.js")).toBeTruthy();
    });

    test("shows 'Reading <filename>' for view command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "view", path: "/src/App.jsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Reading App.jsx")).toBeTruthy();
    });

    test("shows 'Updating <filename>' for undo_edit command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "undo_edit", path: "/src/App.jsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Updating App.jsx")).toBeTruthy();
    });

    test("uses filename segment from path", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create", path: "App.jsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Creating App.jsx")).toBeTruthy();
    });

    test("falls back to 'file' when path is missing", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create" }}
          state="call"
        />
      );
      expect(screen.getByText("Creating file")).toBeTruthy();
    });
  });

  describe("unknown tools", () => {
    test("renders tool name as-is for unknown tools", () => {
      render(
        <ToolInvocationDisplay
          toolName="file_manager"
          args={{}}
          state="call"
        />
      );
      expect(screen.getByText("file_manager")).toBeTruthy();
    });
  });

  describe("state indicators", () => {
    test("shows spinner when state is 'call'", () => {
      const { container } = render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create", path: "/App.jsx" }}
          state="call"
        />
      );
      expect(container.querySelector(".animate-spin")).toBeTruthy();
    });

    test("shows green dot when state is 'result' with a result", () => {
      const { container } = render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create", path: "/App.jsx" }}
          state="result"
          result="ok"
        />
      );
      expect(container.querySelector(".bg-emerald-500")).toBeTruthy();
      expect(container.querySelector(".animate-spin")).toBeNull();
    });

    test("shows spinner when state is 'result' but result is null", () => {
      const { container } = render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          args={{ command: "create", path: "/App.jsx" }}
          state="result"
          result={null}
        />
      );
      expect(container.querySelector(".animate-spin")).toBeTruthy();
    });
  });
});
