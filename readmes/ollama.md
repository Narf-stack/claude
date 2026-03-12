


#  Set up 

To use claude code for free we can dowload a model on our laptop

> https://ollama.com/blog/claude
> https://www.aitheboring.com/p/how-to-use-claude-code-for-free
> https://www.youtube.com/watch?v=AKKx1PoNtnM
> https://gist.github.com/iam-veeramalla/d0f46791619b0db348d8312060a80f2d

<br/>

- Step 1: Install Ollama
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


- Step 3: Install Claude Code
```bash
curl -fsSL https://claude.ai/install.sh | sh
``` 

After that, typing claude in your terminal should fire it up.

- Step 4: Connect Claude Code to the model 
In the app folder, lauch  


```bash
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_BASE_URL=http://localhost:11434

ollama launch claude --config
```
And select the downloaded model.

or if you already know the model you would like to use, use its name. 
Example with the `qwen3-coder:30b` 

```bash
ollama launch claude --model qwen3-coder:30b
```
<br/>
<br/>

# Command 
## Listing 
<br/>

See the models dowloaded 

```bash
ollama list 
```