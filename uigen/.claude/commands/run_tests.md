

Your goal is to run the tests for: $ARGUMENTS if it is provided. If not run all test created in the project.

Do the following:
1. Run `npm run test -- --reporter=verbose 2>&1` 
2. For each file tested, write a summary of what was covered.
   The summary should be done according to the following requirements:
   - An overall status on the test processes, ex : "All 19 tests pass. Here's a summary of what's covered:"
   - Each file tested will be introduced with a title based on the following pattern : "
     path_of_the_file — "Total amount" tests across "Total amount" groups"
     Then, we will have a recap table with two collumns :" Group" and "What's tested"
