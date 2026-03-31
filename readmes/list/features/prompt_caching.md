# Prompt caching





## Cache Breakpoints
<br/>
We need to manually add cache breakpoints to specific blocks in our messages. Here's how it works:

```bash
user_message = { "role": "user",
'content": [
{
"type":"text",
"text": "<Long prompt>",
}
'cache_control": { "type": "ephemeral"
}
``` 


everything up to and including the breakpoint will be cached 
![prompt ordering](../../img/prompt%20ordering.png)

can add up to four cache breakpoint

<br/>
<br/>


##  Minimum Content Length
<br/>

Content must be at least 1024 tokens long to be cached (sum of all messages/blocks you're trying to cache)
<br/>
<br/>

##  Recap
<br/>

> - Requests that use cached content are cheaper and faster to execute
> - Initial request will write to the cache
> - Follow up requests can read from the cache
> - Cache lives for `one hour`
> - Only useful if you're repeatedly sending the same content (but this happens extremely frequently)