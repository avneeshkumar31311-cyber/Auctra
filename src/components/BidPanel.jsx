import { useState } from "react";

export default function BidPanel() {
  const [bid, setBid] = useState(48405000);

  return (
    <div className="p-8 text-center">
      <h2 className="text-6xl text-yellow-500">${bid}</h2>

      <input
        className="border-b w-full text-3xl mt-6 bg-transparent"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
      />

      <button className="bg-yellow-500 px-10 py-4 mt-6 w-full">
        Confirm Bid
      </button>
    </div>
  );
}