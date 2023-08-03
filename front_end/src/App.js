import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';
import Tasks from './components/Tasks';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/add" element={ <AddTask /> } />
        <Route path="/update/:id" element={ <UpdateTask />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;