import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Mainhome from './pages/main/Mainhome';
import AddEmployee from './pages/main/Addemployee';
import EmployeeCard from './pages/main/EmployeeCard';
import ListDesignations from './pages/main/ListDesignations';
import AddDesignation from './pages/main/AddDesignation';
import UpdateEmployee from './pages/main/UpdateEmployee';
import UpdateDesignation from './pages/main/UpdateDesignation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MiniDrawer from './pages/main/SideDrawer';
import LeavePolicyCards from './pages/main/LeavePolicy';
import './App.css';

function App() {

  return (
    <>
       <Router>
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mainhome' element={<Mainhome />} />
        <Route path='/addemployee' element={<AddEmployee />} />
        <Route path="/employee/:employeeId" element={<EmployeeCard />} />  
        <Route path='/designations' element={<ListDesignations />} />
        <Route path='/designation' element={<AddDesignation />} />
        <Route path='/updateemployee' element={<UpdateEmployee />} />
        <Route path='/updatedesignation' element={<UpdateDesignation />} />
        <Route path='/minidrawer' element={<MiniDrawer/>} />
        <Route path='/leavepolicy' element={<LeavePolicyCards />} />
        
        
      </Routes>
    </Router>
    
    </>
  )
}

export default App
