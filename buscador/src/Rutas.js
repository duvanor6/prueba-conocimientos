import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inicio from "./core/Inicio"

const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Inicio/>}/>
            </Routes>
        </Router>
    );
}

export default Rutas;