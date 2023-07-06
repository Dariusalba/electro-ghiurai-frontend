import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function DocEditor() {
  const editorRef = useRef(null);

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="
        <div>
          <h2>Sport Analysis App</h2>
          <h4>Description: </h4>
          <p>This app will have to analyze from various databases how much people do sports. It will have info about Football, Jogging, Cycling, etc.</p>
          <br/>
          <h4>Data Dictionary:</h4>
          <table>
            <tbody c>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <h4>Function Declarations:</h4>
          <table>
            <tbody c>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
              <tr>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
                <td>Pui ceva lung aici, raule</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <h4>Algorithm implementation:</h4>
          <p><code>#include&lt;iostream&gt;</code></p>
          <p><code>using namespace std;</code></p>
          <p><code>int main() {</code></p>
          <p><code>&nbsp; &nbsp; &nbsp;cout&lt;&lt;Pui ceva lung aici, raule&lt;&lt;endl;</code></p>
          <p><code>&nbsp; &nbsp; &nbsp;return 0;</code></p>
          <p><code>}</code></p>
        </div>
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