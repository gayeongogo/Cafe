import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Recode from "./Recode";
import EditRecode from "./EditRecode";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recode" element={<Recode />} />
        <Route path="/edit/:id" element={<EditRecode />} />
      </Routes>
    </div>
  )
}
