import './App.css';
import Todo from "./Components/ToDo/Todo";
import Homepage from "./Components/Homepage/Homepage";


import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Todo/>}/>
            <Route path={"/homepage"} element={<Homepage/>}/>


        </Routes>

    </BrowserRouter>
}

export default App;
