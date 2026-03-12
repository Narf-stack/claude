# Structured data

Claude can be quite descriptive and provide loads of explanation, which can be too much when we simply want structured data.
We can combine `assistant message prefilling` with `stop sequences` to get exactly the content shape we want. Here's how it works:

```bash
messages = []

add_user_message(messages, "Generate a very short event bridge rule as json")
add_assistant_message(messages, "```json")

text = chat(messages, stop_sequences=["```"])
``` 
<br/>

This technique works by:

The user message tells Claude what to generate.\
The `prefilled assistant` message makes Claude think it already started a markdown code block
Claude continues by writing just the JSON content.\
When Claude tries to close the code block with ```, the stop sequence immediately ends generation.

The result is clean JSON with no extra formatting:
```bash

{
  "source": ["aws.ec2"],
  "detail-type": ["EC2 Instance State-change Notification"],
  "detail": {
    "state": ["running"]
  }
}
``` 
<br/>
<br/>
<br/>

## Processing the Response
<br/>

You might notice some extra newline characters in the response. These are easy to handle:

```bash
import json

# Clean up and parse the JSON
clean_json = json.loads(text.strip())
``` 
<br/>
<br/>
<br/>

## Beyond JSON
<br/>

This technique isn't limited to JSON generation. Use it anytime you need structured data without commentary:

> - Python code snippets
> - Bulleted lists
> - CSV data

<br/>

The key is identifying what Claude naturally wants to wrap your content in, then using that as the prefill and stop sequence. For code, it's usually markdown code blocks. For lists, it might be different formatting markers.
