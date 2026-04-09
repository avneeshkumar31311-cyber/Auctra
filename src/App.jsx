import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auction from "./pages/Auction";
import AuctionLobby from "./pages/AuctionLobby";
import InviteGateway from "./pages/InviteGateway";
import NotificationPanel from "./components/NotificationPanel";
import { AuctionProvider } from "./context/AuctionContext";

export default function App() {
  return (
    <AuctionProvider>
      <BrowserRouter>
        <NotificationPanel />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/lobby" element={<AuctionLobby />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/sell" element={<Landing defaultShowSeller={true} />} />
        </Routes>
      </BrowserRouter>
    </AuctionProvider>
  );
}