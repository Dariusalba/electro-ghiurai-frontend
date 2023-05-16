import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function DocEditor() {
  const editorRef = useRef(null);
  const [content, setContent] = useState();

  const handleGetContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const handleClearContent = () => {
    editorRef.current.setContent("");
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={handleGetContent}>Get editor content</button>
      <button onClick={handleClearContent}>Clear editor content</button>

      <div>
        Content of tinymce :
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}

export default DocEditor;