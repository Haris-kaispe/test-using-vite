import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
import { FormTwo } from "./components/FormTwo";
import { FormThree } from "./components/FormThree";
import FormOne from "./components/Forms";

export function Routing() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<FormOne />} />
        <Route exact path="/form2" element={<FormTwo />} />
        <Route exact path="/form3" element={<FormThree />} />
      </Routes>
    </Router>
  );
}
