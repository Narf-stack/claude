

## Lyfe cycle 

```bash
  Write a tool function
        ↓
  Write a JSON schema
        ↓
Call Claude with the Json Schema 
         ↓
      Run tool
         ↓
Add tool result and call Claude again
``` 

## Tool Functions
<br/>

A tool function is a plain Python function that gets executed automatically when Claude decides it needs extra information to help a us. For example, if we ask "What time is it?", Claude would call our `date/time` tool to get the current time.

Here's an example of a weather tool function. 

![Tool function](../../img/tool.png)


> [!IMPORTANT]
> Always validate inputs and provides clear error messages - these are important best practices.
<br/>
<br/>
<br/>

### Best Practices for Tool Functions
<br/>


> - Use descriptive names: Both the function name and parameter names should clearly indicate their purpose
> - Validate inputs: Check that required parameters aren't empty or invalid, and raise errors when they are
> - Provide meaningful error messages: Claude can see error messages and might retry the function call with corrected parameters

The validation is particularly important because Claude learns from errors. If we raise a clear error like `Location cannot be empty`, Claude might try calling the function again with a proper location value.

<br/>
<br/>
<br/>

## JSON Schema

Used to informed Claude about the different existing tools (i.e, Doc) 
The complete tool specification has three main parts:

> - Name - A clear, descriptive name for your tool (like "get_weather")
> - Description - What the tool does, when to use it, and what it returns
> - Input_schema - The actual JSON schema describing the function's arguments

![Json Schema](../../img/json.png)
