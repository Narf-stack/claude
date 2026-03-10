

# Entry level
<br/>

## Connexion
Change the way to log to claude code 
```bash
/login
``` 

Dissconnect from your account
```bash
/logout
``` 
<br/>

## Launch 
enter the folder
```bash
claude

# then 
/init

# it will :
# -scan the codebase
# -create a summary
# -write the summary to the CLAUDE.md file
# - this file is included in every request
``` 
<br/>

## Commit changes 
Claude can create our PR. it will save our changes and write a valuable commit message

```bash
stage and commit changes
```
<br/>

## Screenshot 
To paste a screenshot in claude code use 

```bash
CTRL + v 
```
<br/>

## File mention
use the `@` + path of the file 

```bash
How does the auth system work ?
@src/component/auth.tsx
```
By mentionning a file we help claude to go straigth away in the right place instead of scrolling the through the code base
<br/>

## Memory mode 
In Claude code typing a `#` will put us in memory mode, and allow to change the claude.md file to add rules. It is always the following pattern ` "#" + rules `

Type :
```bash
# use comments for only complex code 

# DB schema is sets in @prisma/schema.prisma. Reference it anytine you need to better understand the structure of the data strored in the database, and update the claude.md file with a dedicated point on it 
```

and then select the file we want to add this new rules to  

Or update the claude.md manualy 

<br/>
<br/>
<br/>





# Advance Concepts
<br/>


## Boost Claude reasonning abilities

The more complex the task, the more research Claude will have to do. To boost Claude IQ we can either enter in `Planning mode`, `Thinking modes` or both together for very complex tasks.
Both options consume a fair ammout of tokens. 
<br/>

### Planning mode
we can enable it with
```bash
shift + Tab Shift+ Tab
```

Claude will do some thorough exploration and planning before writing any code. It will inform us of its plan to complete the task so we can either accept it or redirect it.
<br/>

Useful when the task requires : 
  - a wide understanding of the code base, and looking at different area
  - several steps to be completed  

<br/>

### Thinking modes

Allows Claude to reason about more challenging problems. To do so we should use one of the key word enabling the thinking modes. 
<br/>

Useful when the task : 
  - is targetting a particullasr tricky bit of logic
  - is troubleshooting a difficult bug 

```bash
# Less thinking 
"Think"
   ↓
"Think more"
   ↓
"Think a lot"
   ↓
"Think longer"
   ↓
"Ultrathink"
# More thinking
``` 

For instance we can simplys say 
```bash
This is a tough task so ultrathink about the best way to implement it
``` 
<br/>
<br/>






## Controlling Context
Controlling and directin the flow of conversation
<br/>

### Interrupt Claude
```bash
Escape
``` 
Interrupt Claude, allowing us to redirect or correct it. Also useful to fix issues with `#` memories.
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

### Rewind a Conversation
Revert to a previous message

```bash
Escape + Escape
``` 
It will show us all the previously sent messages.
Removes context not relevant to the current task
<br/>

### Focus
Summarize the conversation and continue. Very useful when Claude has learned a lot about the current task.
```bash
/compact
``` 
Helps Claude stay focused but remember what it has learned in the current session.
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

### Standard creation

To create a custom command, we need to set up a specific folder structure in our project:

1 - Find the `.claude` folder
2 - Create a new directory called `commands` inside it
3 - Create a new markdown file with the desired command name (ex, `audit.md`)
    The filename becomes the command name - so `audit.md` creates the `/audit` command.
<br/>

Example: Audit Command
audit project dependencies for vulnerabilities:

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


