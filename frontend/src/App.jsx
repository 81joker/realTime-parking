import React from "react";
import Home from "./pages/Home";
import { BrowserRouter , Routes , Route} from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<StepOne />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
