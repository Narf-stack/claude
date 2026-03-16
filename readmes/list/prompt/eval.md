



A typical prompt evaluation workflow follows five key steps that help systematically to improve our prompts through objective measurement. 

![Prompt eval](../img/prompt-eval.png)


### Feed through claude 
The evaluation process follows a clear workflow:
- take the dataset of test cases
- combine each one with the prompt template
- send it to Claude for processing
- evaluate the output using a grader system.




## Graders

### Types  
There are three different type of graders

![Grader](../img/grader.png)



- **Code graders**, programmatically evaluate outputs using custom logic
- **Model graders**, use another AI model to assess the quality
- **Human graders**, manually reviewed and scored outputs by humans

### Code Graders
<ins>Common uses: </ins>

> - Checking output length
> - Verifying output does/doesn't have certain words
> - Syntax validation for JSON, Python, or regex
> - Readability scores

The only requirement is that the code returns some usable signal - usually a number between 1 and 10.

#### Model Graders
Feed the original output into another API call for evaluation. 

Offers flexibility for assessing : 
> - Response quality
> - Quality of instruction following
> - Completeness
> - Helpfulness
> - Safety


### Human Graders

The most flexibility but are time-consuming and tedious. 
Useful for evaluating:

> - General response quality
> - Comprehensiveness
> - Depth
> - Conciseness
> - Relevance



### Defining Evaluation Criteria

`How will we know if the prompt is producing good outputs ?`
Before implementing any grader, we need clear evaluation criteria. 

<ins>Example:</ins> For a code generation prompt, we might focus on:

> - **Format**, should return only Python, JSON, or Regex without explanation
> - **Valid Syntax**, produced code should have valid syntax
> - **Task Following**, response should directly address the user's task with accurate code

The first two criteria work well with `code graders`, while _task following_ is better suited for `model graders`.