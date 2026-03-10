




# CLAUDE files 

## CLAUDE.md, on project level
serve as : 
> -  a general context for Claude to understand the code base and find relevant code more quickly
> - a location where we can get claude guidance 


## CLAUDE.local.md 

> - will not be commited and shard on the repo 
> - keep personal instructions and customization for claude


## ~/.claude/CLAUDE.md
Global md file

> - will contains instruction applied for all project 
> - keep personal instructions and customization for claude





# File mention

use the `@` + path of the file 

```bash
How does the auth system work ?
@src/component/auth.tsx
```
By mentionning a file we help claude to go straigth away in the right place instead of scrolling the through the code base


# Memory mode 

in Claude code typing a `#` will put us in memory mode, and allow to change the claude.md file to add rules 

Type : 
```bash
# use comments for only complex code 
--> # rules 
```
and then select the file we want to add this new rules to  

Or update the claude.md manualy 
