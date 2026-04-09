from markitdown import MarkItDown, StreamInfo
from io import BytesIO
from pathlib import Path
from pydantic import Field


def binary_document_to_markdown(binary_data: bytes, file_type: str) -> str:
    """Converts binary document data to markdown-formatted text."""
    md = MarkItDown()
    file_obj = BytesIO(binary_data)
    stream_info = StreamInfo(extension=file_type)
    result = md.convert(file_obj, stream_info=stream_info)
    return result.text_content


def document_path_to_markdown(
    path: str = Field(description="Absolute or relative path to a PDF or DOCX file"),
) -> str:
    """Convert a PDF or DOCX file at a given path to markdown-formatted text.

    Reads the file from disk and converts its contents to markdown. Supports
    .pdf and .docx file formats, determined automatically from the file extension.

    When to use:
    - When you have a local file path to a document and need its text content
    - When you want to extract and process the contents of a PDF or DOCX file

    Examples:
    >>> document_path_to_markdown("/path/to/report.pdf")
    "# Report Title\\n\\nContent..."
    >>> document_path_to_markdown("/path/to/document.docx")
    "# Document Title\\n\\nContent..."
    """
    file_path = Path(path)
    file_type = file_path.suffix.lstrip(".")
    binary_data = file_path.read_bytes()
    return binary_document_to_markdown(binary_data, file_type)
