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


