import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestRide from "./pages/RequestRide";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} />
        {/* Outras rotas serão adicionadas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
