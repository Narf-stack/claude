# PDF Handling 





## Basics
<br/>

To process a PDF file with Claude, we use nearly identical code to what we'd use for images. The main differences are in the file type specifications and variable names for clarity.
<br/>
 
```bash

with open("earth.pdf", "rb") as f:
  file_bytes = base64.standard_b64encode(f.read()).decode("utf-8")

messages = []

add_user_message(
    messages,
    [
        {
            "type": "document",
            "source": {
                "type": "base64",
                "media_type": "application/pdf",
                "data": file_bytes,
            },
        },
        {"type": "text", "text": "Summarize the document in one sentence"},
    ],
)

``` 
<br/>
<br/>
<br/>


## Key Changes from Image Processing
When adapting your image processing code for PDFs, we need to update several elements:

> - Change the file extension from `.png` to `.pdf`
> - Update the variable name from `image_bytes` to `file_bytes` for clarity
> - Set the type to `document` instead of `image`
> - Change the media type to `application/pdf` instead of `image/png`
