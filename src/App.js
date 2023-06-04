import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Order from './pages/Order';
import Account from './pages/Account';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeAccountCreation from './pages/EmployeeAccountCreation'
import EmployeeDashboard from './pages/EmployeeDashboard';
import DocEditorTest from './pages/DocEditorTest';
import ReportPage from './pages/ReportPage';
import EmployeeReport from './pages/EmployeeReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/employee/account" element={<EmployeeAccountCreation />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/doceditor" element={<DocEditorTest />} />
        <Route path="/manager/report" element={<ReportPage />} />
        <Route path="/manager/employee/report" element={<EmployeeReport />} />
        <Route path="*" element={<h1 className='not-found'>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
