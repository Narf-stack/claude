
# Github MCP 

This integration provides two main workflows: 
  - mention support for issues and pull requests
  -  automatic pull request reviews


## Set Up 
<br/>

To get started, in Claude, run :

```bash
/install-github-app

# This command walks you through the setup process:
- Install the Claude Code app on GitHub
- Add your API key
``` 
It will automatically generate a pull request with the workflow files
It will add two different GitHub Actions options ( Mention action, Pull Request Action). Once merged, the workflow files will be in `.github/workflows` directory.
<br/>
<br/>

## Default GitHub Actions
<br/>

The integration provides two main workflows:
  - Mention Action
  - Mention Claude in any issue or pull request using @claude. 

When mentioned, Claude will:
  - Analyze the request and create a task plan
  - Execute the task with full access to your codebase
  - Respond with results directly in the issue or PR
  - Pull Request Action

Whenever a PR is created, Claude will:
  - Reviews the proposed changes
  - Analyzes the impact of modifications
  - Posts a detailed report on the pull request
<br/>
<br/>


## Customizing the Workflows
<br/>

After merging the initial pull request, we can customize the workflow files to fit your project's needs. Here's how to enhance the mention workflow:

### Adding Project Setup
<br/>

Before Claude runs, we can add steps to prepare the environment:

```bash
- name: Project Setup
  run: |
    npm run setup
    npm run dev:daemon
``` 

### Custom Instructions
<br/>

Provide Claude with context about the project setup:

```bash
custom_instructions: |
  The project is already set up with all dependencies installed.
  The server is already running at localhost:3000. Logs from it
  are being written to logs.txt. If needed, you can query the
  db with the 'sqlite3' cli. If needed, use the mcp__playwright
  set of tools to launch a browser and interact with the app.
``` 

### MCP Server Configuration
<br/>

You can configure MCP servers to give Claude additional capabilities:
```bash
mcp_config: |
  {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": [
          "@playwright/mcp@latest",
          "--allowed-origins",
          "localhost:3000;cdn.tailwindcss.com;esm.sh"
        ]
      }
    }
  }
``` 


<br/>
<br/>

## Tool Permissions
When running Claude in `GitHub Actions`, we must explicitly list all allowed tools. This is especially important when using MCP servers.

```bash
allowed_tools: "Bash(npm:*),Bash(sqlite3:*),mcp__playwright__browser_snapshot,mcp__playwright__browser_click,..."
``` 

Unlike local development, there's no shortcut for permissions in GitHub Actions. Each tool from each MCP server must be individually listed.
