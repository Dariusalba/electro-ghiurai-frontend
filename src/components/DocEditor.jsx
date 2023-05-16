import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function DocEditor() {
  const editorRef = useRef(null);

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Aici scrii ce doresti tu!</p>"
        init={{
          width: 1000,
          height: 700,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | table",
          selector: "textarea",
          table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
          content_style:
            "body { background-color: rgb(163, 163, 163), font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

export default DocEditor;