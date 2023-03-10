# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I added the unit tests for the given function, also I made the following choices to make the code more readable:

1. First, I created a helper function createHash to reduce code duplication.
2. Then, I renamed `candidate` to `partitionKey` to make it more clear that the function is returning a partition key.
3. I also initialized `partitionKey` to `event.partitionKey` so that it's guaranteed to get rid of extra if check later.
4. Then, I simplified the logic by returning TRIVIAL_PARTITION_KEY early if event doesn't exist.
5. Lastly, I reorganized the conditional statements to make the code flow more naturally and reduce the number of nested if statements.