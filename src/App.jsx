import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auction from "./pages/Auction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/sell" element={<Landing defaultShowSeller={true} />} />
      </Routes>
    </BrowserRouter>
  );
}