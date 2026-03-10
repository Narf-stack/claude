
# claude


Change the way to log to claude code 
```bash
/login
``` 

# Lauch claude in a project 
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




# File mention

use the `@` + path of the file 

```bash
How does the auth system work ?
@src/component/auth.tsx
```
By mentionning a file we help claude to go straigth away in the right place instead of scrolling the through the code base


# Memory mode 

in Claude code typing a `#` will put us in memory mode, and allow to change the claude.md file to add rules. It is always the following pattern ` "#" + rules `

Type :
```bash
# use comments for only complex code 

# DB schema is sets in @prisma/schema.prisma. Reference it anytine you need to better understand the structure of the data strored in the database, and update the claude.md file with a dedicated point on it 
```

and then select the file we want to add this new rules to  

Or update the claude.md manualy 




