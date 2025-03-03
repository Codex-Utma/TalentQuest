import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questionnaire from "./pages/questionnaire";
import './index.css';
import AdministratorPage from "./pages/administrator";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/questionnaire" element={<Questionnaire/>} />
      <Route path="/administrator" element={<AdministratorPage/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
