# Hooks

<br/>

Hooks allow us to run commands before or after Claude attempts to run a tool. 
Useful for :
  - implementing automated workflows like code formatters after file edits
  - executing tests when files change
  - blocking access to specific files

<br/>
<br/>

## How Hooks Work
<br/>

There are two types of hooks:

> - PreToolUse hooks - Run before a tool is called
> - PostToolUse hooks - Run after a tool is called
> - Hook Configuration

Hooks are defined in Claude settings files. We can add them to:

> - Global - ~/.claude/settings.json (affects all projects)
> - Project - .claude/settings.json (shared with team)
> - Project (not committed) - .claude/settings.local.json (personal settings)

We can write hooks by hand in these files or use the `/hooks` cmd inside Claude Code.

<br/>
<br/>


## Configuration 
<br/>

### PreToolUse Hooks
<br/>

`PreToolUse` hooks run before a tool is executed. They include a matcher that specifies which tool types to target:
```bash
"PreToolUse": [
  {
    "matcher": "Read",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/read_hook.ts"
      }
    ]
  }
]
``` 

Before the `Read` tool is executed, this configuration runs the specified command. The command receives details about the tool call Claude wants to make, and we can:
- Allow the operation to proceed normally
- Block the tool call and send an error message back to Claude
<br/>

### PostToolUse Hooks
<br/>

`PostToolUse` hooks run after a tool has been executed. Here's an example that triggers after write, edit, or multi-edit operations:
```bash
"PostToolUse": [
  {
    "matcher": "Write|Edit|MultiEdit",
    "hooks": [
      {
        "type": "command", 
        "command": "node /home/hooks/edit_hook.ts"
      }
    ]
  }
]
``` 

Since the tool call has already occurred, PostToolUse hooks can't block the operation. However, they can:
- Run follow-up operations (like formatting a file that was just edited)
- Provide additional feedback to Claude about the tool use


<br/>


> [!NOTE]
> Practical Applications
  > - Code formatting - Automatically format files after Claude edits them
  > - Testing - Run tests automatically when files are changed
  > - Access control - Block Claude from reading or editing specific files
  > - Code quality - Run linters or type checkers and provide feedback to Claude
  > - Logging - Track what files Claude accesses or modifies
  > - Validation - Check naming conventions or coding standards

PreToolUse hooks give control over what Claude can do, while PostToolUse hooks let us enhance what Claude has done.

<br/>


> [!IMPORTANT]  
> Security Best Practices for writing more secure hooks:
  > - Validate and sanitize inputs - Never trust input data blindly
  > - Always quote shell variables - Use "$VAR" not $VAR
  > - Block path traversal - Check for .. in file paths
  > - Use absolute paths - Specify full paths for scripts
  > - Skip sensitive files - Avoid .env, .git/, keys, etc.


<br/>
<br/>

## Disabled hook 
<br/>

To disable a hook, we can add the following code at the begining of the hook definition
```bash
process.exit(0) 
``` 