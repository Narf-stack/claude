
# claude


Change the way to log to claude code 
```bash
/login
``` 

## Lauch claude in a project 
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


## Commit changes 

Claude can create our PR. it will save our changes and write a valuable commit message

```bash
stage and commit changes
```


## Screenshot 

To paste a screenshot in claude code use 

```bash
CTRL + v 
```

## File mention

use the `@` + path of the file 

```bash
How does the auth system work ?
@src/component/auth.tsx
```
By mentionning a file we help claude to go straigth away in the right place instead of scrolling the through the code base


## Memory mode 

in Claude code typing a `#` will put us in memory mode, and allow to change the claude.md file to add rules. It is always the following pattern ` "#" + rules `

Type :
```bash
# use comments for only complex code 

# DB schema is sets in @prisma/schema.prisma. Reference it anytine you need to better understand the structure of the data strored in the database, and update the claude.md file with a dedicated point on it 
```

and then select the file we want to add this new rules to  

Or update the claude.md manualy 



## Boost Claude reasonning capacities

The more complex the task, the more research Claude will have to do. To boost Claude IQ we can either enter in `Planning mode`, `Thinking modes` or both together for very complex tasks.
Both options consume a fair ammout of tokens. 

### Planning mode
we can enable it with

```bash
shift + Tab Shift+ Tab
```

Claude will do some thorough exploration and planning before writing any code. It will inform us of its plan to complete the task so we can either accept it or redirect it.

Useful when the task requires : 
  - a wide understanding of the code base, and looking at different area
  - several steps to be completed  

### Thinking modes

Allows Claude to reason about more challenging problems. To do so we should use one of the key word enabling the thinking modes. 

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