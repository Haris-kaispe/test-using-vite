import { useState } from "react";
import "./App.css";
import FormOne from "./components/Forms";
import Table from "./components/Table";
import TableP from "./components/TableP";
import { Routing } from "./Router";

function App() {
  return (
    <div className="App">
      <Routing />
      {/* <FormOne />
  <TableP />*/}
    </div>
  );
}

export default App;
