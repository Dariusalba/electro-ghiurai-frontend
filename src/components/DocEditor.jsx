import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function DocEditor() {
  const editorRef = useRef(null);

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="
        <h1 style = text-align:center>{Order Title}</h1>
        </br>
        <p style = text-align:center>{Enter Order Description}</p>
        </br>
        </br>
        </br>
        </br>
        </br>
        </br>
        <h2 style = text-align:center>Data Dictionary</h2>
        <table style = width:100%>
          <tr>
            <td>
            <b>Name</b>
            </td>
            <td>
            <b>Description</b>
            </td>
            <td>
            <b>Type</b>
            </td>
            <td>
            <b>Other</b>
            </td>
          </tr>
          <tr>
            <td>
            {Insert Name}
            </td>
            <td>
            {Insert Description}
            </td>
            <td>
            {Insert Type}
            </td>
            <td>
            {Other}
            </td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
        </table>
        </br>
        </br>
        </br>
        </br>
        </br>
        </br>
        <h2 style = text-align:center>Function Interfaces</h2>
        <table style = width:100%>
          <tr>
            <td>
            <b>Name</b>
            </td>
            <td>
            <b>Description</b>
            </td>
            <td>
            <b>Return</b>
            </td>
            <td>
            <b>Other</b>
            </td>
          </tr>
          <tr>
            <td>
            {Insert Name}
            </td>
            <td>
            {Insert Description}
            </td>
            <td>
            {Insert Return Type}
            </td>
            <td>
            {Other}
            </td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td>
          </tr>
        </table>
        </br>
        </br>
        </br>
        </br>
        </br>
        </br>
        <h2 style = text-align:center>Algorithm Implementation</h2>
        <h3 style = text-align:center>{Algorithm description}</h3>
        </br>
        </br>
        <code>
          Insert your algorithm implementation/pseudocode.
        </code>
        "
        init={{
          min_height: 712,
          resize: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'print',
            'preview anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'paste',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat |",
          selector: "textarea",
          content_style:
            "body { background-color: rgb(163, 163, 163), font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

export default DocEditor;