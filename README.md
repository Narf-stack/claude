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




#  Use claude for free 
https://ollama.com/blog/claude
https://www.aitheboring.com/p/how-to-use-claude-code-for-free
https://www.youtube.com/watch?v=AKKx1PoNtnM
https://gist.github.com/iam-veeramalla/d0f46791619b0db348d8312060a80f2d


> - Step 1: Install Ollama
Head to the Ollama website and download it. 
```bash
https://ollama.com/
``` 
open the Ollama widget, go in settings and change the context length to 32 k

> - Step 2: Download a Model
In terminal run:
```bash
ollama run gpt-oss:(size)
``` 

Replace (size) with model version for `gpt-oss`. 
Or browse all available models and pick one


> - Step 3: Install Claude Code
```bash
curl -fsSL https://claude.ai/install.sh | sh
``` 

After that, typing claude in your terminal should fire it up.

> - Step 4: Connect Claude Code to the model 
In the app folder, lauch  


```bash
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_BASE_URL=http://localhost:11434

ollama launch claude --config
```
And select the downloaded model.

See the model dowloaded 
```bash
ollama list 
```


# Memory mode 

in Claude code typing a `#` will put us in memory mode, and allow to change the claude.md file to add rules 

Type : 
```bash
# use comments for only complex code 
--> # rules 
```
and then select the file we want to add this new rules to  

Or update the claude.md manualy 


# File mention

use the `@` + path of the file 

```bash
How does the auth system work ?
@src/component/auth.tsx
```
By mentionning a file we help claude to go straigth away in the right place instead of scrolling the through the code base