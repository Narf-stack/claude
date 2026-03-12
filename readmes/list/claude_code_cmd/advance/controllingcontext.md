
## Controlling Context
Controlling and directin the flow of conversation
<br/>
<br/>

### Interrupt Claude
```bash
Escape
``` 
Interrupt Claude, allowing us to redirect or correct it. Also useful to fix issues with `#` memories.
<br/>
<br/>

### Repetetive error

```bash
press "Escape" 
and then add a memory "#"
``` 
In case of repetitive errors we can interrupt Claude while the error is happening, then add a  add a memory `"#" + rule` in the Claude.md file to avoid this mistake in the future.

```bash
Escape
# then
"# vitest config file is in vitest.config.mts"
``` 
<br/>
<br/>

### Rewind a Conversation
Revert to a previous message

```bash
Escape + Escape
``` 
It will show us all the previously sent messages.
Removes context not relevant to the current task
<br/>
<br/>

### Focus
Summarize the conversation and continue. Very useful when Claude has learned a lot about the current task.
```bash
/compact
``` 
Helps Claude stay focused but remember what it has learned in the current session.
<br/>
<br/>

### Cleaning
Dumps current conversation history.
```bash
/clear
``` 
Useful when switching between different tasks, or after having a long run conversation.

<br/>
<br/>
<br/>



## Custom commands
<br/>

We can create custom commands to automate repetitive tasks that run frequently.
<br/>
<br/>

### Standard creation

To create a custom command, we need to set up a specific folder structure in our project:

1. Find the `.claude` folder
2. Create a new directory called `commands` inside it
3. Create a new markdown file with the desired command name (ex, `audit.md`)
    The filename becomes the command name - so `audit.md` creates the `/audit` command.
<br/>
<br/>

<ins>Example</ins>: **Audit Command**
<br/>

Audit project dependencies for vulnerabilities:

This audit command does three things:
> - Runs `npm audit` to find vulnerable installed packages
> - Runs `npm audit fix` to apply updates
> - Runs `tests` to verify the updates didn't break anything

After creating the file, restart Claude Code.
<br/>

### Commands with Arguments

Custom commands can accept arguments using the `$ARGUMENTS` placeholder. 
For example, a `write_tests.md` command might contain:

```bash
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitests with React Testing Library
* Place test files in a __tests__ directory in the same folder as the source file
* Name test files as [filename].test.ts(x)
* Use @/ prefix for imports

Coverage:
* Test happy paths
* Test edge cases
* Test error states
``` 

Once sets, we can run this command with a file path:

`/write_tests the use-auth.ts file in the hooks directory` 

Arguments don't have to be file paths - they can be any string we want to pass to give Claude context and direction for the task.
<br/>
<br/>



> [!NOTE]
> Key Benefits
  > - Automation - Turn repetitive workflows into single commands
  > - Consistency - Ensure the same steps are followed every time
  > - Context - Provide Claude with specific instructions and conventions for the project
  > - Flexibility - Use arguments to make commands work with different inputs

<br/>

Custom commands are particularly useful for project-specific workflows like : 
- running test suites
- deploying code
- generating boilerplate following specific conventions.


