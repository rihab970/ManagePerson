import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from './components/Header';
import Footer from './components/Footer';
import AddPerson from './pages/AddPerson';
import UpdateePerson from './pages/UpdateePerson';


function App() {
  return (
    <Router>
      <Header/>
       <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add' element={<AddPerson/>}/>
          <Route path='/update/:id' element={<UpdateePerson/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
