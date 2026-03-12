# Controlling model output

`prefilled assistant messages` and `stop sequences`, give  a precise control over how Claude responds and when it stops generating text.
<br/>
<br/>
<br/>

## Prefilled Assistant Messages
<br/>

Influencing Claude answer through `Message prefilling` is providing the beginning of Claude's response. It will steer Claude in a specific direction.


<ins>Example : </ins>

```bash
"Is tea or coffee better at breakfast?" 

# without prefilling
--> Claude will give a balanced response mentioning both options. 

# with prefilling
--> We add an assistant message saying "Coffee is better because", Claude will continue from there and build a case for coffee.
``` 
<br/>
<br/>

<ins>Basic code structure:</ins>
<br/>

```bash
from anthropic import Anthropic
import os

client = Anthropic()

response = client.messages.create(
  model="claude-3-5-sonnet",
  max_tokens=1000,
  messages=[
    {
      "role": "user",
      "content": "Is tea or coffee better at breakfast?"
    },
    {
      "role": "assistant",
      "content": "Coffee is better because"
    }
  ]
)
print(response.content[0].text)
``` 

We can steer Claude in any direction using this technique.

<br/>
<br/>
<br/>

## Stop Sequences
<br/>

Stop sequences force Claude to end its response immediately when it generates a specific string of characters - `stop sequence`. This is perfect for controlling the length or endpoint of responses.
The stop sequence itself is not included in the final response.

<ins>Example : </ins>

```bash
"Count from 1 to 10" 
--> we choose a stop sequence of "5"

# output
--> 1, 2, 3, 4, 
``` 
<br/>

<ins>Basic code implementation:</ins>

```bash
def chat(messages, stop_sequences=[]):
  # An add stop_sequences to the API call parameters
    params = {
    "model": model,
    "max_tokens": 1000,
    "messages": messages,
    "temperature": temperature,
    "stop_sequences": stop_sequences
  }
  .....

# Then we can use it like this:
 
  messages = []
  add_user_message(messages, "Count from 1 to 10")
  answer = chat(messages, stop_sequences=["5"])


# Output
'1,2,3,4,'
``` 
<br/>

We can fine-tune exactly where the stopping occurs. If I want to avoid trailing punctuation, I can use a more specific stop sequence like ", 5" instead of just "5".
<br/>
<br/>

## Practical Applications

> - **Consistent formatting:** Use prefilling to ensure responses always start with a specific structure
> - **Controlled length:** Use stop sequences to cap responses at natural breakpoints
> - **Biased responses:** Need Claude to take a particular stance rather than being neutral
> - **Structured output:** Combine both techniques to generate responses that fit specific templates
