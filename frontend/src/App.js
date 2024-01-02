import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Apply from './components/Apply';
import Internalmobility from './components/Internalmobility';
import Login from './components/Login';
import Signup from './components/Signup';
import Template from './components/Template';
import Addpostevacant from './components/addpostevacant';
import Poste from './components/Poste';
import Dashboard from './components/dashboard';
import NavU from './components/navU';
import ApplyU from './components/ApplyU';
import ShowTable from './components/showTable';



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Template" element={<Template />} />
          <Route path="/Internalmobility" element={<Internalmobility />} />
          <Route path="/Apply" element={<Apply />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Poste" element={<Poste />} />
          <Route path="/addpostevacant" element={<Addpostevacant />} />  
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/showTable" element={<ShowTable />} />  
          <Route path="/applyU" element={<ApplyU />} />  
                

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
