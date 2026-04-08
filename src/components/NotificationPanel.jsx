import { AnimatePresence, motion } from "framer-motion";
import { useAuction } from "../context/AuctionContext";

export default function NotificationPanel() {
  const { notifications, acceptInvite, rejectInvite, dismissNotification } = useAuction();

  return (
    <div className="fixed top-24 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className="w-96 bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(234,179,8,0.15)] pointer-events-auto"
          >
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
                  acceptInvite("You");
                  dismissNotification(notif.id);
                }}
                className="flex-1 bg-yellow-600 text-black py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:scale-105 duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  rejectInvite("You");
                  dismissNotification(notif.id);
                }}
                className="flex-1 border border-zinc-700 bg-zinc-900/50 text-zinc-300 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 hover:text-white transition-colors duration-300"
              >
                Decline
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
