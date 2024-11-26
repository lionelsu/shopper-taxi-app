import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestRide from "./pages/RequestRide";
import RideOptions from "./pages/RideOptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} />
        <Route path="/options" element={<RideOptions />} />
      </Routes>
    </Router>
  );
}

export default App;
