# Response streaming
<br/>

As we cant ensure an imediate answer from the Model, `Streaming` will help us to improve the UI/UX while the Model is computing.
Streaming is the ability to show  pieces of the answers ahead - as if we are typing- to make the user wait, instead of one big answer at once.
<br/>
<br/>


## Stream Events
<br/>

When we enable streaming, Claude sends back several types of events:

      
```bash
MessageStart - A new message is being sent
        ↓
ContentBlockStart - Start of a new block containing text, tool use, or other content
        ↓
ContentBlockDelta - Chunks of the actual generated text
         ↓
ContentBlockStop - The current content block has been completed
         ↓
MessageDelta - The current message is complete
         ↓
MessageStop - End of information about the current message
``` 
<br/>
<br/>


## Basic Streaming Implementation
<br/>

To enable streaming, add `stream=True` to the `messages.create` call:

```bash
messages = []
add_user_message(messages, "Write a 1 sentence description of a fake database")

stream = client.messages.create(
  model=model,
  max_tokens=1000,
  messages=messages,
  stream=True
)

for event in stream:
  print(event)
``` 
<br/>
<br/>


## Simplified Text Streaming
<br/>

We can use the SDK's simplified streaming interface that extracts just the text content:

```bash
with client.messages.stream(
    model=model,
    max_tokens=1000,
    messages=messages
) as stream:
    for text in stream.text_stream:
      print(text, end="")
``` 

This approach automatically filters out everything except the actual text content


<br/>
<br/>

## Getting the Complete Message
<br/>

While streaming individual chunks is great for user experience, you often need the complete message for storage or further processing. After streaming completes, you can get the assembled final message:

with client.messages.stream(
    model=model,
    max_tokens=1000,
    messages=messages
) as stream:
    for text in stream.text_stream:
        # Send each chunk to your client
        pass
    
    # Get the complete message for database storage
    final_message = stream.get_final_message()
This gives you the best of both worlds: real-time streaming for users and a complete message object for your application logic.