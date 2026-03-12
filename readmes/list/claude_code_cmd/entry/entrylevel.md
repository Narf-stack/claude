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

