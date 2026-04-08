import { useNavigate } from "react-router-dom";

export default function ProductGrid() {
  const navigate = useNavigate();

  const products = [
    { lot: "881", title: "Chronos V Obsidian", price: "₹1,42,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUPeAPLCJNMoeh0kmJxi4J6d3EyF6bdRjtHdoeNCT365iTifGpVBor4qgHmzI1aLVLPZjdMc8PLeZtN2rO0mBbNHkkKUX1FnxIQIGo3CzCT6iG6DhR2v1lPQmEW2AFk2i4MRqUNUCH8dI-bnlY6USWOVkXU9bbMS-Z5oHpbU_O6QpVuOZu7yRMFiZYENaNmv1O-8pz2MG1C2JJYT-vpedX6se75WYoWPzGUnC5BZcmwdxUz07PyrdIgm60WR1reeLIU-D1eJ9P7wY" },
    { lot: "742", title: "1969 Spectre Coupe", price: "₹8,90,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbNH6Gg02iDZ42015qkZ-PxoumCqiqiTBMi70iAYShu0LrhbwTlr6np2e4RnzcgEmPWPtfVhcAn9NudFWrpqmvwuJaqUoFPQEF5RQAQdjyqQWWkOHE_zbG-mT2IdjSGyDXWoBwQBmeE2T3geO9iq4OxtitLdAetQXua58hFdYPkq4SeqrRl0QHP2O3J7EOo0HXVMsHgSQQK3cQL6vE6IskAY8ifHHWYgQMXVxqVPxdekDlJc3MLJbl7Y948iPsIVdP8t8MECwby8" },
    { lot: "912", title: "Celestial Tear Emerald", price: "₹45,500", tag: "Pre-Bid", isPulse: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHTczVi89xadL3X1MR6dGnMzxM_za3-5u4CEs5sdxA0QjK78vewjRDwTQADZMRXQaZ9_eDhXmOw0Ty7yAIQBmG85zMVo4jv7DHKU3mMfyDRdgl589CJIvhvX0S_lzEtwAupcq2BjUHiMCbsyvcGG1Ctzy-0EIKSLPpTUEJyYOyqEqishvgnys2gDFY9gGYN-GTQeMi_TyKLzJMhGa7Fw1-kCAOf9FKT6srDklB5zS4d3UBZzeGuy_R68EQ8kj-37ZOygK1OJnvmFI" },
    { lot: "303", title: "Gilded Void No. 4", price: "₹2,10,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBorQIQJCD_hotwP0wh9qW0LqSwC3I-Cz3EgLZ9rirQts76HMfO-igOw_O_ZjOjnKCCWxgJzsKLwIMPKh-2krBC1ndGjbpqA17y8JZXHFE875dgZp_IT6BxUexQiu-6KU9rAAFMHw993DQsi4y6LSC95FuQbcGAMhyrCHT2dvf97rht0vpMrwfy32_bGQAtbRa8RqvQn2Aw9QTY-4ltwDI29Svv2sJIJNebmMWoUMxbP3K3mzYpktN8uiT9bmpTMpfA5ciS2dpTA5E" },
    { lot: "550", title: "Domaine de la Romanée", price: "₹18,200", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4whTNaHflkFSWb0yPgRWpL0N9-dgPNkWItQmeB8NU6mDgDLhy0o1LO3MYXTlKlV05puiNcQoYuAq8sOQhTPgkpBojqf_HoOdgyWpTH9Uy473c3czJK7yqMr8dB1HFeWthIoMrsdoPqbq8LNaPy_NQaorFM89Ky1kNNJBA_ykK2J7Mv2cZ8D2Zjor6qqBh7MaSVinqFl9BQ5Bx8WJq2tkSLrt4Se_x8Swbof9_8M-UL5XVdyZPGJULp3lXQWj3sjm2QW1Apm2qRg" },
    { lot: "112", title: "14th Century Ledger", price: "₹67,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtMpvS9JSWv-hyMtr9mGpVSnsCYqtMcrKDie3wZEX3N4tRJaMmhSu0hF9uJ1s__VieIfU-fUYoNmheNsh7SYDdNX2RM8vsM3K9fgcEdmsxfXJz_bQqqkUNbcQ6k2Ka9XCt9gXaLDXI1F3QNc-Oethf5bgpmWpLrPPcblbHW_Ao0CgVVkWwWwkHLNelTUmMM6fVBvnEA9kS9kmNCPy7Dt5c1CQPMAIrXBBDqnUvNI3WJIP-0eAvG7EkAbWPYLVIP79obqZ3QGP-oxA" },
    { lot: "441", title: "Leica M3 Prototype", price: "₹34,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv4Ui8bEFHil38iZUPAHVK1a7RSTjCBxRGSzCQ1YXFC_XNvOE95oxQBOOa2e09pF2aZUqNbs4HgV4LQSYOcwYrJ4UCdWfyPDUjsUkZStgGhW_TEw0EeHskqs1eVBg6A0JM5u_CGmKDhNegAEuiktlGjIYoeaIxHVFc01JljLbGEYyyuzbdGKz6oMh2Dz0sOyNGeNMJ08Mu53pY6re0PKphosK_5gPLTnhQpfuQ4QclZ6obzu0jFp628D0MUOv9-xfuDc9pgPhWESI" },
    { lot: "209", title: "Rosewood Lounge", price: "₹12,400", tag: "Pre-Bid", isPulse: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV1biE43GU97Oo7XBmgR0gtyC_4x5mXgUNO8uBKBuKZhRmzzmtksazInpUAFl46S9hM5g5sOCeKTw9ucc-o_rkHHXn18w6gAApIcy8qFhUDH1ymf70H6tcMlVqmIhQjqljz-WiVe308fx4brQlyAfPMBACL4zj0um-Y7nqig78oghzOKeDWZuAmhnqasmUL_s4YfDLDJqsKYRShen4tQ4KGGEUszy0HTzsgeiPTZdftKxhDTu2Kl6m6X_3dIkwa3oy3u2R6dz59aE" },
    { lot: "601", title: "Frozen Motion II", price: "₹89,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAngKxpZ8zJePlxjkYOFhEW5q4kBFy_venj7J9y4ZxQXlMpRLwFixRJyf4uO8TTDLCf6H3xfTguGk3DDYz1tubO1a9jlwe-zclRciSisiLdVHzQFTKYDgpAeZM0aaccKWDLLg9OSXY2PgbWhZRregTG4tnv9wUKVOmyht07CbvqzgLeUFCwKe0DMql6P0WnNatiXYzvaVFb1vdBxy2d25MYDTu-sXL0cWiNJg1Lzawg4ET56zC0EdaQXQc_lSvB9pOhNjonkZS9r64" },
    { lot: "003", title: "Attic Gold Stater", price: "₹1,25,000", tag: "Pre-Bid", isPulse: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhxKwJrys7J5RQ9behhXU2JGM8fJ6ctbJtyBRBWIs60frNRj_vCPTiCsEck2a2LAeQTwwIbqg1tmSLfvrNLVY7ZV2ORhoYVq3sfUf14x83uawLY8BkVui7qk4tunetu0xVR084TfmRzk_z7oQwnf7JyZw8JdTPNyG4wVoRwm-Htj9QG2LuZ50Fsp-yAXU1a1hFrO4AZYJaTA7BaTfxy-fF5KUxfD8P36uHNFq26nSPU0Mm73i5FUAZteeYMbGsDdrtF_UCA4ALcm8" },
    { lot: "772", title: "Stradivarius Variant", price: "₹3,40,00,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Azv98rB1WajWA1Z279cvVTxkH7Z8cQ2vfvy0vvEZ8Fk4yC_WKyu2Usc88_R9UGiUOLd6WHWEU6ZZlue9oLyRkLkb1KyGGwXV-t9ulxY0ytmj_3CyYTndixeZdqJDydS9H4OmzQZBwW7i2iXTdZBa9DkIMVmvhKtTBM7Hp8bfw22uXWqfD3OYPht0KahkNrUo9JoKtszXfDUBVDjsZB0vukxqnjZkHNVGOIFgfujqnmn8LzkXiHCN9XQ-4GNilFsBZ_4RU66b61o" },
    { lot: "104", title: "Birkin Himalayan", price: "₹2,80,000", tag: "Live", isPulse: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ylKSzqK80yNT0n_nTwEhJ0UUqORab1ccXrRj7jajTUMtbrgPB40szm_s9wdEctl3wq2AplqwdJRACIpMfWDtkKDYAxJ_VOs7emhjjzYPiWqw015l8bjxsbC3Kj0QZNzpz5obphv026LSsXsiQcP6Bl2vqKr9Xb33lAVuCE-y10WbwzkoDYOAsZq6OztAX1-FsmbXCpGxSgyUqGXTC9_C2jr7JPuoC05Uk6txoLajZZ7UyTisBLpcrEE55QAp4_YgPbrlNc5ZGz8" }
  ];

  return (
    <section className="py-32 px-12 bg-surface-container-lowest">
      <div className="flex justify-between items-end mb-20">
        <div>
          <p className="font-label text-primary text-sm uppercase tracking-[0.3em] mb-4">ACTIVE LOTS</p>
          <h2 className="text-5xl md:text-6xl">Current Catalog</h2>
        </div>
        <div className="hidden md:block">
          <button className="font-label text-xs uppercase tracking-widest border-b border-primary/40 pb-2 hover:text-primary transition-colors">View All Archive</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {products.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate("/auction")}
            className="group bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.img} />
              {item.isPulse ? (
                <div className="absolute top-4 right-4 bg-error px-3 py-1 flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span className="font-label text-[10px] font-bold uppercase tracking-tighter text-on-error">Live</span>
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-stone-800 px-3 py-1 flex items-center gap-2">
                  <span className="font-label text-[10px] font-bold uppercase tracking-tighter text-stone-300 italic">Pre-Bid</span>
                </div>
              )}
            </div>
            <div className="p-8">
              <p className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2">LOT NO. {item.lot}</p>
              <h4 className="font-serif text-2xl mb-4">{item.title}</h4>
              <div className="flex justify-between items-center">
                <p className="font-label text-primary text-lg">{item.price}</p>
                <span className="material-symbols-outlined text-stone-600 hover:text-primary transition-colors">favorite</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}