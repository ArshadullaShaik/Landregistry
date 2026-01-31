import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LandDetails from './pages/LandDetails';
import OfficerPanel from './pages/OfficerPanel';
import Deploy from './pages/Deploy';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/officer" element={<OfficerPanel />} />
        <Route path="/deploy" element={<Deploy />} />
        <Route path="/land/:id" element={<LandDetails />} />
      </Routes>
    </div>
  );
};

export default App;
