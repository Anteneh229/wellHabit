import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'






import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Register from './pages/register';
import Login from './pages/login';


export default function App() {
    const { user, setUser } = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    },[])

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to='/'>My Portfolio</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {user ?

                                // Todo Add logic to have the user name.
                                <>
                                  
                                </>

                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/register' >Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/login' >Login</Link>
                                    </li>

                                </>}
                        </ul>
                    </div>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
            </Routes>
        </Router>
    )
}