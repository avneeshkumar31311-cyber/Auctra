export default function ProductCard({ item }) {
  return (
    <div className="group bg-zinc-900 hover:-translate-y-2 transition">
      <div className="aspect-[4/5] overflow-hidden relative">
        <img src={item.image} className="w-full h-full object-cover" />

        {item.live && (
          <div className="absolute top-4 right-4 bg-red-500 px-2 py-1 text-xs">
            LIVE
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs text-gray-400">{item.lot}</p>
        <h4 className="text-xl font-serif">{item.title}</h4>
        <p className="text-yellow-500">${item.price}</p>
      </div>
    </div>
  );
}