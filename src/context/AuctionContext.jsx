import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
const AuctionContext = createContext();

export const useAuction = () => useContext(AuctionContext);

export const AuctionProvider = ({ children }) => {
  const [auction, setAuction] = useState({
    item: null, // { title, image, price, etc }
    seller: null,
    invitedBidders: [],
    acceptedBidders: [],
    rejectedBidders: [],
    status: 'idle', // idle, waiting, ready, live, ended
  });

  // Join global socket on mount to listen for Cross-Profile Invites
  useEffect(() => {
    let user = null;
    try { user = JSON.parse(localStorage.getItem('auctra_user')); } catch (e) {}
    const userId = user && user.name ? user.name : `Anon_${Math.floor(Math.random()*100)}`;
    
    socket.emit('join_global_lobby', { userId });

    const handleNewInvite = (payload) => {
      console.log("🌐 INCOMING GLOBAL INVITE:", payload);
      setNotifications(prev => [
        ...prev, 
        {
          id: payload.auctionId || Date.now(),
          itemName: payload.item.title || "Unknown Asset",
          seller: payload.seller || "Auctra Host",
          status: "pending"
        }
      ]);
    };

    socket.on('new_auction_invite', handleNewInvite);

    return () => {
      socket.off('new_auction_invite', handleNewInvite);
    };
  }, []);

  const createAuction = (itemDetails) => {
    let user = { name: "Auctra User" };
    try {
      const parsed = JSON.parse(localStorage.getItem('auctra_user'));
      if (parsed) user = parsed;
    } catch(e) {}
    
    const payload = {
      id: "demo_1",
      item: itemDetails,
      seller: user.name,
      invitedBidders: [user.name], // Only Real Users now!
      acceptedBidders: [user.name], // Host implicitly accepts
      rejectedBidders: [],
      status: 'waiting',
    };

    setAuction(payload);

    // Physically push this auction state globally so other Chrome Profiles receive it in their UI!
    socket.emit('create_auction', {
       auctionId: "demo_1",
       item: itemDetails,
       seller: user.name
    });
  };

  const acceptInvite = (bidder) => {
    let user = { name: "Guest" };
    try {
      const parsed = JSON.parse(localStorage.getItem('auctra_user'));
      if (parsed) user = parsed;
    } catch(e) {}
    const actualBidder = bidder === "You" ? user.name : bidder;

    setAuction(prev => {
      if (prev.acceptedBidders.includes(actualBidder)) return prev;

      const newAccepted = [...prev.acceptedBidders, actualBidder];
      let newStatus = prev.status;
      // Start button only unlocks when 2 real users accept!
      if (prev.status === 'waiting' && newAccepted.length >= 2) {
         newStatus = 'ready';
      }

      return {
        ...prev,
        acceptedBidders: newAccepted,
        status: newStatus
      };
    });

    setNotifications([]);
  };

  const rejectInvite = (bidder) => {
    let user = { name: "Guest" };
    try {
      const parsed = JSON.parse(localStorage.getItem('auctra_user'));
      if (parsed) user = parsed;
    } catch(e) {}
    const actualBidder = bidder === "You" ? user.name : bidder;

    setAuction(prev => {
      if (prev.rejectedBidders.includes(actualBidder)) return prev;
      return {
        ...prev,
        rejectedBidders: [...prev.rejectedBidders, actualBidder]
      };
    });
    setNotifications([]);
  };

  const startAuction = () => {
    socket.emit('start_live_auction', { auctionId: "demo_1", durationMs: 15000 });
    setAuction(prev => ({ ...prev, status: 'live' }));
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AuctionContext.Provider value={{
      socket,
      auction,
      notifications,
      createAuction,
      acceptInvite,
      rejectInvite,
      startAuction,
      dismissNotification
    }}>
      {children}
    </AuctionContext.Provider>
  );
};
