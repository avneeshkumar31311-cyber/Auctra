import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
const AuctionContext = createContext();

export const useAuction = () => useContext(AuctionContext);

export const AuctionProvider = ({ children }) => {
  const [auction, setAuction] = useState(() => {
    try {
      const saved = localStorage.getItem('auctra_current_auction');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      item: null, // { title, image, price, etc }
      seller: null,
      invitedBidders: [],
      acceptedBidders: [],
      rejectedBidders: [],
      status: 'idle', // idle, waiting, ready, live, ended
    };
  });

  useEffect(() => {
    localStorage.setItem('auctra_current_auction', JSON.stringify(auction));
  }, [auction]);
  const [notifications, setNotifications] = useState([]);

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
          type: 'invite',
          itemName: payload.item.title || "Unknown Asset",
          seller: payload.seller || "Auctra Host",
          status: "pending",
          itemData: payload.item,
          sellerData: payload.seller,
          auctionId: payload.auctionId
        }
      ]);
    };

    const handleBidderAccepted = (payload) => {
      console.log("🌐 BIDDER ACCEPTED:", payload);
      
      // Notify the host visually!
      const notifId = Date.now() + Math.random();
      setNotifications(prev => [
        ...prev,
        {
          id: notifId,
          type: 'info',
          message: `${payload.bidder} joined the waiting room.`
        }
      ]);

      setTimeout(() => {
        setNotifications(current => current.filter(n => n.id !== notifId));
      }, 5000);

      setAuction(prev => {
        // Prevent Seller inherently appearing in the bidder list!
        if (payload.bidder === prev.seller || payload.bidder === 'Auctra Host') return prev;
        
        // Only add if not already in acceptedBidders
        if (prev.acceptedBidders.includes(payload.bidder)) return prev;
        
        const newAccepted = [...prev.acceptedBidders, payload.bidder];
        let newStatus = prev.status;
        if (prev.status === 'waiting' && newAccepted.length >= 2) {
           newStatus = 'ready';
        }
        return { ...prev, acceptedBidders: newAccepted, status: newStatus };
      });
    };

    socket.on('new_auction_invite', handleNewInvite);
    socket.on('bidder_accepted_invite', handleBidderAccepted);
    
    // Hydration mechanism from system design
    const handleHydration = (stateUpdate) => {
       console.log("🌐 ROOM HYDRATION RECEIVED:", stateUpdate);
       setAuction(prev => ({
         ...prev,
         ...stateUpdate
       }));
    };
    socket.on('auction_state_update', handleHydration);

    const handleAuctionLive = (payload) => {
       console.log("🔥 SYSTEM FORCING TRANSITION TO LIVE ROOM:", payload);
       setAuction(prev => ({ ...prev, status: 'LIVE' }));
    };
    socket.on('auction_live', handleAuctionLive);

    return () => {
      socket.off('new_auction_invite', handleNewInvite);
      socket.off('bidder_accepted_invite', handleBidderAccepted);
      socket.off('auction_state_update', handleHydration);
      socket.off('auction_live', handleAuctionLive);
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
      invitedBidders: [], // Real Users only, Host not included
      acceptedBidders: [], // Host not explicitly accepted
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

  const acceptInvite = (bidder, notifDetails = null) => {
    let user = { name: `Guest_${Math.floor(Math.random()*1000)}` };
    try {
      const parsed = JSON.parse(localStorage.getItem('auctra_user'));
      if (parsed) user = parsed;
    } catch(e) {}
    const actualBidder = bidder === "You" ? user.name : bidder;

    // Broadcast RSVP
    socket.emit('accept_auction_invite', { auctionId: notifDetails ? notifDetails.auctionId : "demo_1", bidder: actualBidder });

    setAuction(prev => {
      if (prev.acceptedBidders.includes(actualBidder)) return prev;

      const newAccepted = [...prev.acceptedBidders, actualBidder];
      let newStatus = prev.status;
      if (prev.status === 'idle' || prev.status === 'waiting') {
         if (newAccepted.length >= 2) newStatus = 'ready';
         else newStatus = 'waiting';
      }

      return {
        ...prev,
        item: notifDetails ? notifDetails.itemData : prev.item,
        seller: notifDetails ? notifDetails.sellerData : prev.seller,
        id: notifDetails ? notifDetails.auctionId : prev.id,
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
    const targetRoom = auction?.id || "demo_1";
    socket.emit('start_live_auction', { auctionId: targetRoom, durationMs: 15000 });
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
