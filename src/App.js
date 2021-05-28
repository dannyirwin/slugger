import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

import { useState } from "react";

function App() {
  const [movementButtons, setMovementButtons] = useState({});

  return (
    <div className="App">
      <Header />
      <Main setMovementButtons={setMovementButtons} />
    </div>
  );
}

export default App;
