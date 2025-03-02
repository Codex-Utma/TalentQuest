import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questionnaire from "./pages/questionnaire";
import './index.css';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/questionnaire" element={<Questionnaire/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
