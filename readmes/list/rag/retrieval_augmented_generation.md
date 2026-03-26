# Retrieval Augmented Generation (RAG)





RAG is a technique that helps us work with large documents that are too big to fit into a single prompt. Instead of cramming everything into one massive prompt, RAG breaks documents into chunks and only includes the most relevant pieces when answering questions.
<br/>
<br/>
<br/>


## When to Use RAG

RAG involves many technical decisions and requires more work than simply including everything in a prompt. 
<br/>

We need to analyze whether the benefits outweigh the complexity for the app. It's especially valuable when working with very large documents, multiple documents, or when one need to optimize for cost and performance.
<br/>

The key insight is that RAG trades simplicity for scalability and efficiency. While it requires more upfront work to implement properly, it enables us to work with document collections that would be impossible to handle with simple prompt stuffing.

<br/>
<br/>
<br/>

## Pipeline
<br/>

Basic RAG workflow
```bash
"Extracting text chuchks from the doc to study" -> Chunking strategie
   ↓
"Generate embeddings for each chunk"
   ↓
"Create a vector store and add each embedding to it"
   ↓
"Generate an embedding for the user's question"
   ↓
"Search the store to find the most relevant chunks" -> Semantic Search through text embeddings
``` 
<br/>
<br/>

### Chunking strategie

![strategie](../../img/chunking.jpg)
<br/>
<br/>

### Semantic Search
<br/>

The most common approach for finding relevant chunks is `semantic search`. Unlike keyword-based search that looks for exact word matches, semantic search uses text embeddings to understand the meaning and context of both the user's question and each text chunk.

Since Anthropic doesn't currently provide embedding generation, the recommended provider is VoyageAI.
Use a vector DB to store the embeddings, then we will find most similar embeddings using cosine similarity.
 


<br/>
<br/>

### Lexical Search
<br/>

finds exact term matches using classic text search
BM25 (Best Match 25) is a popular algorithm for lexical search in RAG systems. Here's how it processes a search query:

<br/>


```bash
"Tokenize the query" 
  -> "Break the user's question into individual terms. For example, "a INC-2023-Q4-011" becomes ["a", "INC-2023-Q4-011"]"
   ↓
"Count term frequency"
  -> "See how often each term appears across all the documents."
   ↓
"Weight terms by importance"
  -> "Terms that appear less frequently get higher importance scores"
   ↓
"Find best matches"
  -> "Return documents that contain more instances of the higher-weighted terms."
``` 
<br/>


BM25 excels at finding exact matches because it:
> - Gives higher weight to rare, specific terms
> - Ignores common words that don't add search value
> - Focuses on term frequency rather than semantic meaning
> - Works especially well for technical terms, IDs, and specific phrases




## Reciprocal Rank Fusion
Merging results from different search methods,for an hybrid approach, isn't as simple as just concatenating lists. Each method uses different scoring systems, so we need a way to normalize and combine their rankings fairly


![strategie](../../img/Reciprocal%20Rank%20Fusion.jpg)


We combine these into a single table showing each text chunk's rank from both indexes, then apply the RRF formula:

```bash
RRF_score(d) = Σ(1 / (k + rank_i(d)))
``` 

Where k is a constant (often 60, but we'll use 1 for clearer results) and rank_i(d) is the rank of document d in the i-th ranking.