import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestRide from "./pages/RequestRide";
import RideOptions from "./pages/RideOptions";
import RideHistory from "./pages/RideHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} />
        <Route path="/options" element={<RideOptions />} />
        <Route path="/history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
