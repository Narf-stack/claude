# Prompt engineering 



This is about taking a written prompt and improving it to get more reliable, higher-quality outputs. This process involves iterative refinement - starting with a basic prompt, evaluating its performance, then systematically applying engineering techniques to improve it.

<br/>
<br/>

## The Iterative Improvement Process
<br/>

The approach follows a clear cycle that we can repeat until we achieve the desired results:


> - **Set a goal**, define what we want the prompt to accomplish
> - **Write an initial prompt**, create a basic first attempt
> - **Evaluate the prompt**, test it against our criteria
> - **Apply prompt engineering techniques**, use specific methods to improve performance
> - **Re-evaluate**, verify that our changes actually improved the results

Each iteration should show measurable improvement in the evaluation scores.
<br/>
<br/>

## Setting Up the Evaluation Pipeline
<br/>

***<ins>Notebook prompt_eng</ins>***
<br/>
Creating a prompt that generates one-day meal plans for athletes. The prompt needs to take into account an athlete's height, weight, goals, and dietary restrictions, then produce a comprehensive meal plan.


The evaluation setup uses a `PromptEvaluator` class that handles dataset generation and model grading. When creating the evaluator instance, we can control concurrency with the `max_concurrent_tasks` parameter:

```bash
evaluator = PromptEvaluator(max_concurrent_tasks=5)
``` 
<br/>

-> increase it for faster processing, if API quota allows
<br/>
<br/>

<ins>Generating Test Data</ins>
<br/>

We need to define what inputs the prompt needs:

```bash
dataset = evaluator.generate_dataset(
  task_description="Write a compact, concise 1 day meal plan for a single athlete",
  prompt_inputs_spec={
    "height": "Athlete's height in cm",
    "weight": "Athlete's weight in kg", 
    "goal": "Goal of the athlete",
    "restrictions": "Dietary restrictions of the athlete"
  },
  output_file="dataset.json",
  num_cases=3
)
``` 

We can keep the number of test cases low (2-3) during development to speed up your iteration cycle, and increase it for final validation.
<br/>
<br/>

<ins>Writing Initial Prompt</ins>

We should always start with a simple, naive prompt to establish a baseline. Later, based on the grading, we should tune it, make it more define and granular to improve it.
<br/>

Here's an example of a basic first attempt:

```bash
def run_prompt(prompt_inputs):
  prompt = f"""
  What should this person eat?

  - Height: {prompt_inputs["height"]}
  - Weight: {prompt_inputs["weight"]}
  - Goal: {prompt_inputs["goal"]}
  - Dietary restrictions: {prompt_inputs["restrictions"]}
  """
    
  messages = []
  add_user_message(messages, prompt)
  return chat(messages)
``` 
<br/>
<br/>
 

<ins>Adding Evaluation Criteria</ins>
<br/>

When running the evaluation, we can specify additional criteria that the grading model should consider:

```bash
results = evaluator.run_evaluation(
  run_prompt_function=run_prompt,
  dataset_file="dataset.json",
  extra_criteria="""
  The output should include:
  - Daily caloric total
  - Macronutrient breakdown  
  - Meals with exact foods, portions, and timing
  """
)
``` 
<br/>

This helps ensure the prompt is evaluated against the specific requirements that matter.
<br/>
<br/>

<ins>Analyzing Results</ins>
<br/>

After running an evaluation, we get both a numerical score and a detailed HTML report (output.html). The report shows exactly how each test case performed, including the model's reasoning for each score.
We should use this feedbacks to guide the next iteration.

