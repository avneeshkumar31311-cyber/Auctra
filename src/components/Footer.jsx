export default function Footer() {
  return (
    <footer className="bg-stone-950 p-12 w-full border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-8 mt-auto">
      <div className="font-serif text-xl text-yellow-600">Auctra</div>
      <div className="flex flex-wrap justify-center gap-8">
        <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Provenance Policy</a>
        <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Terms of Sale</a>
        <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Privacy Ledger</a>
        <a className="font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-white transition-colors" href="#">Contact House</a>
      </div>
      <div className="font-sans text-xs uppercase tracking-widest text-stone-500">
        © 2024 Auctra Digital Archive. All Rights Reserved.
      </div>
    </footer>
  );
}