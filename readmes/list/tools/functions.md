
## What Are Tool Functions?
<br/>

A tool function is a plain Python function that gets executed automatically when Claude decides it needs extra information to help a us. For example, if we ask "What time is it?", Claude would call our `date/time` tool to get the current time.

Here's an example of a weather tool function. 

![Tool function](../../img/tool.png)


> [!IMPORTANT]
> Always validate inputs and provides clear error messages - these are important best practices.
<br/>
<br/>
<br/>

## Best Practices for Tool Functions
<br/>


> - Use descriptive names: Both the function name and parameter names should clearly indicate their purpose
> - Validate inputs: Check that required parameters aren't empty or invalid, and raise errors when they are
> - Provide meaningful error messages: Claude can see error messages and might retry the function call with corrected parameters

The validation is particularly important because Claude learns from errors. If we raise a clear error like `Location cannot be empty`, Claude might try calling the function again with a proper location value.

<br/>
<br/>
<br/>

