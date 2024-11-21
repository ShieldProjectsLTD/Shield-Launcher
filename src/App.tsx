import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About.tsx";
import { MenuBar } from "./components/MenuBar/MenuBar.tsx";

import "./styles/App.css";

const App = () => {

  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <MenuBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
