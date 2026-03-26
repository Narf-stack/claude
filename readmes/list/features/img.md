# Image Handling 





## Basics
<br/>

![code](../../img/img_handling.jpg)

<br/>
<br/>


## Limitations 
<br/>

keep in mind when working with images:

> - Up to `100 images` across all messages in a single request
> - Max size of `5MB` per image
> - When sending one image: `max height/width of 8000px`
> - When sending multiple images: `max height/width of 2000px`
> - Images can be included as base64 encoding or a URL to the image
> - Each image counts as tokens based on its dimensions: `tokens = (width px × height px) / 750`


<br/>
<br/>

## Key concepts
<br/>

The key to getting good results with images is applying the same prompting engineering techniques we would use with text. 
<br/>

We can dramatically improve Claude's accuracy by:

> - Providing detailed guidelines and analysis steps
> - Using one-shot or multi-shot examples
> - Breaking down complex tasks into smaller steps