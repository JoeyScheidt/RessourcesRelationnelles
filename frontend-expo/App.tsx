import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Help from "./components/Help/Help";
import Resources from "./components/Resources/Resources";
import ResourcesEdit from "./components/ResourcesEdit/ResourcesEdit";
import NoPage from "./components/NoPage/NoPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/add" element={<ResourcesEdit />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;