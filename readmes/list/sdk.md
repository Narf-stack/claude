# The Claude Code SDK 

Allows us to run Claude Code programmatically from within our own applications and scripts. It's available for TypeScript, Python, and via the CLI, giving you the same Claude Code functionality you use at the terminal but integrated into larger workflows.



> [!NOTE]
> Key Features :
> - Runs Claude Code programmatically
> - Same Claude Code functionality as the terminal version
> - Inherits all settings from Claude Code instances in the same directory
> - Read-only permissions by default
> - Most useful as part of larger pipelines or tools


## Basic Usage

Here's a simple TypeScript example that asks Claude to analyze code for duplicate queries:

```bash
import { query } from "@anthropic-ai/claude-code";

const prompt = "Look for duplicate queries in the ./src/queries dir";

for await (const message of query({
  prompt,
})) {
  console.log(JSON.stringify(message, null, 2));
}
``` 


## Permissions and Tools

By default, the SDK only has read-only permissions. It can read files, search directories, and perform grep operations, but it cannot write, edit, or create files.

To enable write permissions, you can add the `allowedTools` option to your query:

```bash
for await (const message of query({
  prompt,
  options: {
    allowedTools: ["Edit"]
  }
})) {
  console.log(JSON.stringify(message, null, 2));
}
``` 

Alternatively, we can configure permissions in the `settings file within the .claude directory` for project-wide access.

## Practical Applications

Consider using it for:
> - Git hooks that automatically review code changes
> - Build scripts that analyze and optimize code
> - Helper commands for code maintenance tasks
> - Automated documentation generation
> - Code quality checks in CI/CD pipelines

