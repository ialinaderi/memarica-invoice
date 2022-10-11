import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import Form from "./components/form";
import { faCoffee, faHistory } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/header";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="*" element={<h1>404</h1>} />
            </Route>
        </Routes>
    );
};

export default App;
