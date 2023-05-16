import DocEditor from '../components/DocEditor';
import { Link } from "react-router-dom";

function DocEditorTest() {
  return (
    <div>
      <div className="welcome2">
          <Link to="/employee/dashboard">
            <h1 className='welcome-h1'>ElectroGhiurai</h1>
          </Link>
      </div>
      <div className="app doc-app">
        <h1 className='app-h1'>Document Editor</h1>
        <DocEditor className="doc-edit"/>
        <br/>
      </div>
    </div>
  );
}

export default DocEditorTest;
