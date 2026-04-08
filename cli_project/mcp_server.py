from mcp.server.fastmcp.prompts import base

from pydantic import Field

from mcp.server.fastmcp import FastMCP

# Creation of the MCP server
mcp = FastMCP("DocumentMCP", log_level="ERROR")


docs = {
  "deposition.md": "This deposition covers the testimony of Angela Smith, P.E.",
  "report.pdf": "The report details the state of a 20m condenser tower.",
  "financials.docx": "These financials outline the project's budget and expenditures.",
  "outlook.pdf": "This document presents the projected future performance of the system.",
  "plan.md": "The plan outlines the steps for the project's implementation.",
  "spec.txt": "These specifications define the technical requirements for the equipment.",
}

# tool to read a doc
@mcp.tool(
  name = "read_doc_contents",
  # The clearer the descriptipon, the better the model will be able to use the tool
  description = "Read the contents of a document and return it as a string.", 
)

def read_doc(doc_id: str = Field("id of the doc to read")) -> str: 
  """Reads the contents of a document given its ID."""
  if doc_id not in docs:
    raise ValueError(f"Document {doc_id} not found.")
  return docs[doc_id]


# tool to edit a doc
@mcp.tool(
  name = "edit_doc_contents",
  description = "Edit the contents of a document given its ID and new content.",
)
def edit_doc(
  doc_id: str = Field("id of the doc to edit"),
  old_content: str = Field("current content of the doc"), 
  new_content: str = Field("new content for the doc")
  ) -> str:
  """Edits the contents of a document given its ID and new content."""
  if doc_id not in docs:
    raise ValueError(f"Document {doc_id} not found.")
  if docs[doc_id] != old_content:
    raise ValueError(f"Current content of the document does not match the provided old content.")
  docs[doc_id] = docs[doc_id].replace(old_content, new_content)
  return f"Document {doc_id} updated successfully with new content {new_content} ."

# Resource to return all doc id's
@mcp.resource(
  "docs://documents",
  mime_type="application/json"
)
def list_docs() -> list[str]:
  """Returns a list of all document IDs."""
  return list(docs.keys())

# resource to return the contents of a particular doc
@mcp.resource(
  "docs://documents/{doc_id}",
  mime_type="text/plain"
)
def get_doc(doc_id: str) -> str:
  """Returns the contents of a document given its ID."""
  if doc_id not in docs:
    raise ValueError(f"Document {doc_id} not found.")
  return docs[doc_id]

# Prompt to rewrite a doc in markdown format
@mcp.prompt(
  name="format",
  description="Rewrite a document in markdown format."
)
def rewrite_doc_markdown(doc_id: str = Field("id of the doc to format")) -> list[base.Message]:
  """Rewrites a document in markdown format."""
  if doc_id not in docs:
    raise ValueError(f"Document {doc_id} not found.")
  prompt = f"""
    Your goal is to reformat a document to be written with markdown syntax.

    The id of the document you need to reformat is:

    {doc_id}


    Add in headers, bullet points, tables, etc as necessary. Feel free to add in extra formatting.
    Use the 'edit_document' tool to edit the document. After the document has been reformatted...
    """
  return [
    base.UserMessage(prompt)
  ]

# TODO: Write a prompt to summarize a doc


if __name__ == "__main__":
    mcp.run(transport="stdio")
