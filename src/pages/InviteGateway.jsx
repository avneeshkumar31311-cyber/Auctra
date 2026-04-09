import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuction } from "../context/AuctionContext";
import { motion } from "framer-motion";

export default function InviteGateway() {
  const { auctionId, token } = useParams();
  const navigate = useNavigate();
  const { auction } = useAuction(); // Pull auction context to hydrate
  
  const [status, setStatus] = useState("verifying"); // verifying, error

  useEffect(() => {
    if (!token || !auctionId) {
      setStatus("error");
      setTimeout(() => navigate("/"), 4000);
      return;
    }

    const verifyToken = async () => {
      try {
        // We call the Backend REST API we built
        const response = await fetch(`http://localhost:3000/api/v1/invites/validate?auctionId=${auctionId}&token=${token}`);
        const data = await response.json();

        if (data.valid) {
          // Logically tell the local Context we accepted an invite securely!
          // We don't have the full notifDetails here instantly, the socket will hydrate us!
          // BUT we can set LocalStorage token so the Socket knows we have access.
          localStorage.setItem(`auctra_token_${auctionId}`, token);
          
          if (data.auctionStatus === "LIVE") {
             navigate(`/auction/${auctionId}`);
          } else {
             navigate(`/auction/${auctionId}/lobby`);
          }
        } else {
          setStatus("error");
          setTimeout(() => navigate("/"), 4000);
        }
      } catch (err) {
        setStatus("error");
        setTimeout(() => navigate("/"), 4000);
      }
    };

    // Simulate network delay for UI aesthetics
    setTimeout(verifyToken, 1500);

  }, [auctionId, token, navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center relative z-10 shadow-2xl"
      >
        <div className="mb-6">
          <span className="material-symbols-outlined text-yellow-500 text-5xl">
            {status === "verifying" ? "admin_panel_settings" : "gpp_bad"}
          </span>
        </div>

        <h2 className="text-2xl font-serif text-white mb-2">
           {status === "verifying" ? "Authenticating Invite" : "Access Denied"}
        </h2>
        
        {status === "verifying" ? (
          <>
            <p className="text-zinc-400 font-sans text-sm mb-6">
              Establishing a secure connection to the live auction room. Please stand by.
            </p>
            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-yellow-500"
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, ease: "linear" }}
               ></motion.div>
            </div>
          </>
        ) : (
          <p className="text-red-400 font-sans text-sm mb-6">
            Your invitation link is invalid or has expired. Redirecting to homepage...
          </p>
        )}
      </motion.div>
    </div>
  );
}
