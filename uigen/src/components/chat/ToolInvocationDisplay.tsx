"use client";

import { Loader2 } from "lucide-react";

interface StrReplaceArgs {
  command?: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  path?: string;
}

interface FileManagerArgs {
  command?: string;
  path?: string;
}

type ToolArgs = StrReplaceArgs | FileManagerArgs | Record<string, unknown>;

interface ToolInvocationDisplayProps {
  toolName: string;
  args: ToolArgs;
  state: "call" | "partial-call" | "result";
  result?: unknown;
}

function getStrReplaceLabel(args: StrReplaceArgs): string {
  const filename = args.path ? args.path.split("/").pop() : null;
  const name = filename || args.path || "file";

  switch (args.command) {
    case "create":
      return `Creating ${name}`;
    case "str_replace":
    case "insert":
      return `Editing ${name}`;
    case "view":
      return `Reading ${name}`;
    default:
      return `Updating ${name}`;
  }
}

function getLabel(toolName: string, args: ToolArgs): string {
  if (toolName === "str_replace_editor") {
    return getStrReplaceLabel(args as StrReplaceArgs);
  }
  return toolName;
}

export function ToolInvocationDisplay({
  toolName,
  args,
  state,
  result,
}: ToolInvocationDisplayProps) {
  const isDone = state === "result" && result != null;
  const label = getLabel(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
