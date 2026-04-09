# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Setup
uv venv && source .venv/bin/activate
uv pip install -e .

# Run MCP server
uv run main.py

# Run tests
uv run pytest

# Run a single test
uv run pytest tests/test_document.py::test_name
```

## Architecture

This is a Python MCP (Model Context Protocol) server that exposes tools to AI assistants. The server is initialized in `main.py` using `FastMCP`, and tools are registered with `mcp.tool()(function)`.

Tools live in `tools/` as plain Python functions and are imported + registered in `main.py`. The MCP framework handles all communication with AI clients.

## Defining Tools

Tools are plain Python functions registered with:

```python
mcp.tool()(my_function)
```

Use `Field` from pydantic for parameter descriptions:

```python
from pydantic import Field

def my_tool(
    param1: str = Field(description="Detailed description of this parameter"),
    param2: int = Field(description="Explain what this parameter does")
) -> ReturnType:
    """One-line summary.

    Detailed explanation of functionality.

    When to use:
    - Scenario A
    - Not when doing X

    Examples:
    >>> my_tool("foo", 42)
    "result"
    """
```

Docstrings should include: one-line summary, detailed explanation, when to use (and not use), and examples with expected output.
