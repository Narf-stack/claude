

## TypeScript Type Checking Hook
<br/>
When Claude modifies a function signature, it often doesn't update all the places where that function is called throughout the project.
<br/>

The solution is a `post-tool-use` hook that runs the TypeScript compiler after every file edit:
<br/>

-  Runs `tsc --noEmit` to check for type errors
-  Captures any errors found
-  Feeds the errors back to Claude immediately
-  Prompts Claude to fix the issues in other files

This hook works for any typed language where we can run a type checker. For untyped languages, we could implement similar functionality using `automated tests` instead.
<br/>
<br/>

## Query Duplication Prevention Hook
<br/>
In larger projects with many database queries, Claude sometimes creates duplicate functionality instead of reusing existing code.

<ins>Example : </ins>

> consider a project structure with multiple query files, each containing many SQL functions.\
 When you ask Claude to "create a Slack integration that alerts about orders pending longer than 3 days," it might write a new query instead of using the existing `getPendingOrders()` function.



The query duplication hook addresses this by implementing a review process:

- Triggers when Claude modifies files in the `./queries` directory
- Launches a separate instance of Claude Code programmatically
- Asks the second instance to review the changes and check for similar existing queries
- If duplicates are found, provides feedback to the original Claude instance
- Prompts Claude to remove the duplicate and use the existing functionality
 

 
## Implementation Considerations

For the query hook, we should consider these trade-offs:

- Benefits: Cleaner codebase with less duplication
- Costs: Additional time and API usage for each query directory edit

In this case, it is best to `only monitor critical directories/files` to minimize overhead

