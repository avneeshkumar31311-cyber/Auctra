import { AnimatePresence, motion } from "framer-motion";
import { useAuction } from "../context/AuctionContext";
import { useNavigate } from "react-router-dom";

export default function NotificationPanel() {
  const { notifications, acceptInvite, rejectInvite, dismissNotification } = useAuction();
  const navigate = useNavigate();

  return (
    <div className="fixed top-24 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className={`w-96 backdrop-blur-xl rounded-2xl p-6 pointer-events-auto ${
              notif.type === 'info' 
                ? 'bg-zinc-900/90 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                : 'bg-black/80 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.15)]'
            }`}
          >
            {notif.type === 'info' ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500 text-2xl">person_add</span>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">Lobby Update</p>
                    <p className="font-sans text-sm text-white mt-1">{notif.message}</p>
                  </div>
                </div>
                <button onClick={() => dismissNotification(notif.id)} className="text-zinc-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-3xl">mail</span>
                  <div>
                    <p className="font-label text-xs uppercase tracking-[0.2em] text-yellow-600 font-bold">Exclusive Invite</p>
                    <p className="font-sans text-sm text-zinc-400">From: {notif.seller}</p>
                  </div>
                </div>

                <h4 className="font-serif text-2xl text-white mb-2">{notif.itemName}</h4>
                <p className="text-zinc-500 text-xs font-sans mb-6">
                  You have been invited to participate in a private real-time auction. Please RSVP to secure your paddle.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      acceptInvite("You", notif);
                      dismissNotification(notif.id);
                    }}
                    className="flex-1 bg-yellow-600 text-black py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:scale-105 duration-300"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      rejectInvite("You", notif);
                      dismissNotification(notif.id);
                    }}
                    className="flex-1 border border-zinc-700 bg-zinc-900/50 text-zinc-300 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 hover:text-white transition-colors duration-300"
                  >
                    Decline
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
