import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuction } from "../context/AuctionContext";

export default function SellerDashboard({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    yearsUsed: "",
    marketValue: "",
    demandLevel: "",
    startDate: "",
    minParticipants: "2",
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();
  const { createAuction } = useAuction();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field if the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (errors.image) {
          setErrors((prev) => ({ ...prev, image: null }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.yearsUsed || isNaN(formData.yearsUsed)) newErrors.yearsUsed = "Valid years used is required";
    if (!formData.marketValue || isNaN(formData.marketValue)) newErrors.marketValue = "Estimated Market Value is required";
    if (!formData.demandLevel) newErrors.demandLevel = "Demand level is required";
    if (!formData.startDate) newErrors.startDate = "Auction start time is required";
    if (!formData.minParticipants || formData.minParticipants < 2) newErrors.minParticipants = "Minimum of 2 participants required";
    if (!imagePreview) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePrice = async () => {
    let hasErr = false;
    const newErrs = { ...errors };

    // Strict Validation before estimating
    if (!formData.marketValue || isNaN(formData.marketValue)) {
      newErrs.marketValue = "Provide valid market value first";
      hasErr = true;
    }
    if (!formData.demandLevel) {
      newErrs.demandLevel = "Select a demand level";
      hasErr = true;
    }
    if (!formData.condition) {
      newErrs.condition = "Select a condition";
      hasErr = true;
    }
    if (!formData.yearsUsed || isNaN(formData.yearsUsed)) {
      newErrs.yearsUsed = "Set years used";
      hasErr = true;
    }

    if (hasErr) {
      setErrors(newErrs);
      return;
    }

    setIsGenerating(true);
    setSuggestedPrice(null);

    // Mock API delay for AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const marketVal = parseFloat(formData.marketValue);
    let basePrice = marketVal * 0.60;
    
    let adjustmentMultiplier = 1.0;
    const explanationParts = [];

    // Demand Logic
    if (formData.demandLevel === "High") {
      adjustmentMultiplier += 0.20;
      explanationParts.push("high demand");
    } else if (formData.demandLevel === "Medium") {
      adjustmentMultiplier += 0.10;
      explanationParts.push("medium demand");
    } else if (formData.demandLevel === "Low") {
      adjustmentMultiplier -= 0.10;
      explanationParts.push("lower demand");
    }

    // Condition Logic
    if (formData.condition === "New") {
      adjustmentMultiplier += 0.15;
      explanationParts.push("pristine condition");
    } else if (formData.condition === "Antique") {
      adjustmentMultiplier += 0.25;
      explanationParts.push("antique rarity");
    }

    // Years Used Logic
    const years = parseFloat(formData.yearsUsed);
    if (years > 10) {
      adjustmentMultiplier += 0.10;
      explanationParts.push("historic vintage (>10yrs)");
    } else if (years < 2) {
      adjustmentMultiplier -= 0.05;
      explanationParts.push("short usage (<2yrs)");
    }

    // Final price application based on base adjustments
    const finalPrice = Math.round(basePrice * adjustmentMultiplier);
    
    let explanationStr = "Standard pricing applied.";
    if (explanationParts.length > 0) {
      const formatted = explanationParts.join(" + ");
      explanationStr = `${formatted.charAt(0).toUpperCase() + formatted.slice(1)} significantly adjusted the base formulation.`;
    }

    setSuggestedPrice({
      amount: finalPrice,
      explanation: explanationStr
    });
    setIsGenerating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        ...formData,
        suggestedBasePrice: suggestedPrice,
        imagePresent: !!imagePreview,
        imagePreview: imagePreview // Pass it to context so it visually carries over
      };
      
      // Hook into global Context
      createAuction(submissionData);
      
      onClose();
      // Use client side routing to seamlessly slide into Lobby
      navigate(`/auction/demo_1/lobby`);
    }
  };

  const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 py-4 px-5 font-sans placeholder:text-zinc-500 shadow-inner";
  const selectClass = "w-full bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 py-4 px-5 font-sans appearance-none shadow-inner";
  const errorClass = "text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in";

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl overflow-y-auto w-full selection:bg-yellow-500 selection:text-black">
      <div className="min-h-screen py-16 px-6 relative flex flex-col items-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors z-50 p-2 bg-black/40 rounded-full hover:bg-black/60 backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        <main className="flex-1 max-w-4xl w-full mx-auto animate-in fade-in duration-700 slide-in-from-bottom-10 mt-8">
          <div className="mb-12 text-center md:text-left">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 mb-4">Curator Access</p>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">List an Asset</h1>
            <p className="text-zinc-400 font-sans max-w-2xl text-lg">
              Securely onboard your luxury asset to our global digital archive.
              Our proprietary AI will assist in formulating an optimized base auction price.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            {/* Subtle glow behind form area */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
              
              {/* Floating Input Component wrapper classes */}
              {/* Helper classes for floating label */}
              
              {/* Title */}
              <div className="md:col-span-2 relative mt-4">
                <input name="title" id="title" value={formData.title} onChange={handleInputChange} className={`${inputClass} peer`} type="text" placeholder=" " />
                <label htmlFor="title" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none">Product Title</label>
                {errors.title && <span className={errorClass}>{errors.title}</span>}
              </div>

              {/* Description */}
              <div className="md:col-span-2 relative mt-4">
                <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} className={`${inputClass} peer resize-none h-32 pt-6`} placeholder=" "></textarea>
                <label htmlFor="description" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none">Provenance & Description</label>
                {errors.description && <span className={errorClass}>{errors.description}</span>}
              </div>

              {/* Category */}
              <div className="relative mt-4">
                <select name="category" id="category" value={formData.category} onChange={handleInputChange} className={`${inputClass} peer appearance-none`}>
                  <option value="" disabled className="text-zinc-500 bg-zinc-900 hidden"></option>
                  <option value="Watch" className="bg-zinc-900">Watch</option>
                  <option value="Car" className="bg-zinc-900">Car</option>
                  <option value="Art" className="bg-zinc-900">Art</option>
                  <option value="Jewelry" className="bg-zinc-900">Jewelry</option>
                  <option value="Other" className="bg-zinc-900">Other</option>
                </select>
                <label htmlFor="category" className={`absolute text-[11px] font-bold uppercase tracking-widest px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none bg-zinc-900 ${!formData.category ? 'text-zinc-500 scale-100 -translate-y-1/2 top-1/2' : 'text-zinc-400'}`}>Category</label>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-zinc-500">expand_more</span>
                </div>
                {errors.category && <span className={errorClass}>{errors.category}</span>}
              </div>

              {/* Condition */}
              <div className="relative mt-4">
                <select name="condition" id="condition" value={formData.condition} onChange={handleInputChange} className={`${inputClass} peer appearance-none`}>
                  <option value="" disabled className="text-zinc-500 bg-zinc-900 hidden"></option>
                  <option value="New" className="bg-zinc-900">New</option>
                  <option value="Used" className="bg-zinc-900">Used</option>
                  <option value="Antique" className="bg-zinc-900">Antique</option>
                </select>
                <label htmlFor="condition" className={`absolute text-[11px] font-bold uppercase tracking-widest px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none bg-zinc-900 ${!formData.condition ? 'text-zinc-500 scale-100 -translate-y-1/2 top-1/2' : 'text-zinc-400'}`}>Condition</label>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-zinc-500">expand_more</span>
                </div>
                {errors.condition && <span className={errorClass}>{errors.condition}</span>}
              </div>

              {/* Years Used */}
              <div className="relative mt-4">
                <input name="yearsUsed" id="yearsUsed" value={formData.yearsUsed} onChange={handleInputChange} className={`${inputClass} peer`} type="number" min="0" placeholder=" " />
                 <label htmlFor="yearsUsed" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none">Years Used</label>
                {errors.yearsUsed && <span className={errorClass}>{errors.yearsUsed}</span>}
              </div>

              {/* Demand Level */}
              <div className="relative mt-4">
                <select name="demandLevel" id="demandLevel" value={formData.demandLevel} onChange={handleInputChange} className={`${inputClass} peer appearance-none`}>
                  <option value="" disabled className="text-zinc-500 bg-zinc-900 hidden"></option>
                  <option value="Low" className="bg-zinc-900">Low</option>
                  <option value="Medium" className="bg-zinc-900">Medium</option>
                  <option value="High" className="bg-zinc-900">High</option>
                </select>
                <label htmlFor="demandLevel" className={`absolute text-[11px] font-bold uppercase tracking-widest px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none bg-zinc-900 ${!formData.demandLevel ? 'text-zinc-500 scale-100 -translate-y-1/2 top-1/2' : 'text-zinc-400'}`}>Demand Level</label>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-zinc-500">expand_more</span>
                </div>
                {errors.demandLevel && <span className={errorClass}>{errors.demandLevel}</span>}
              </div>

              {/* Auction Setup Row: Date/Time */}
              <div className="relative mt-4">
                <input name="startDate" id="startDate" value={formData.startDate} onChange={handleInputChange} className={`${inputClass} peer block`} type="datetime-local" placeholder=" " />
                <label htmlFor="startDate" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none">Auction Start Time</label>
                {errors.startDate && <span className={errorClass}>{errors.startDate}</span>}
              </div>

              {/* Auction Setup Row: Min Participants */}
              <div className="relative mt-4">
                <input name="minParticipants" id="minParticipants" value={formData.minParticipants} onChange={handleInputChange} className={`${inputClass} peer`} type="number" min="2" placeholder=" " />
                <label htmlFor="minParticipants" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none">Minimum Participants</label>
                {errors.minParticipants && <span className={errorClass}>{errors.minParticipants}</span>}
              </div>

              {/* Market Value */}
              <div className="md:col-span-2 relative mt-4">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-20 font-bold">₹</span>
                 <input name="marketValue" id="marketValue" value={formData.marketValue} onChange={handleInputChange} className={`${inputClass} peer pl-8`} type="number" min="0" placeholder=" " />
                 <label htmlFor="marketValue" className="absolute text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-7 pointer-events-none">Estimated Market Value (INR)</label>
                 {errors.marketValue && <span className={errorClass}>{errors.marketValue}</span>}
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 mt-4">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3 block">Asset Imagery</label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="w-full sm:w-64 aspect-video border-2 border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 hover:border-yellow-500/50 rounded-2xl cursor-pointer flex flex-col items-center justify-center transition-all duration-300 group relative overflow-hidden"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white text-xs font-bold uppercase tracking-widest">Change Photo</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-4xl text-zinc-600 group-hover:text-yellow-500 transition-colors mb-2">cloud_upload</span>
                        <span className="text-xs text-zinc-500 font-sans group-hover:text-zinc-300 transition-colors">Drag & drop or list to upload</span>
                      </>
                    )}
                  </div>
                  <div className="flex-1 text-sm text-zinc-400 font-sans">
                    <p className="mb-2">Upload high-resolution photography. Transparent or dark backgrounds preferred to maintain catalog aesthetics.</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">JPEG, PNG up to 10MB.</p>
                    {errors.image && <span className={errorClass}>{errors.image}</span>}
                  </div>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
              </div>

              {/* Gold Separator */}
              <div className="md:col-span-2 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent my-6"></div>

              {/* AI Generator Section */}
              <div className="md:col-span-2">
                {!suggestedPrice && !isGenerating && (
                  <button 
                    type="button" 
                    onClick={generatePrice} 
                    className="w-full sm:w-auto border border-yellow-500/50 text-yellow-500 px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Suggest Base Price
                  </button>
                )}

                {isGenerating && (
                  <div className="w-full sm:w-auto border border-zinc-700/50 text-zinc-400 px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 bg-zinc-900/50">
                    <span className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></span> 
                    Processing Valuation...
                  </div>
                )}
                
                {suggestedPrice !== null && !isGenerating && (
                  <div className="bg-zinc-900/70 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-8 relative overflow-hidden group animate-in zoom-in duration-500">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]"></div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                      <div className="text-center sm:text-left">
                        <h4 className="font-serif text-xl mb-1 text-white flex items-center justify-center sm:justify-start gap-2">
                          <span className="material-symbols-outlined text-yellow-500">check_circle</span>
                          AI Estimated Starting Price
                        </h4>
                        <p className="text-xs text-zinc-400 font-sans pt-2 max-w-sm leading-relaxed">{suggestedPrice.explanation}</p>
                      </div>
                      
                      <div className="text-center sm:text-right shrink-0">
                        <p className="text-4xl font-sans text-yellow-500 font-light tracking-tighter">₹{suggestedPrice.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Action Buttons */}
              <div className="md:col-span-2 pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="sm:w-1/3 order-2 sm:order-1 bg-transparent border border-zinc-700 text-white rounded-xl py-5 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className="sm:w-2/3 order-1 sm:order-2 bg-yellow-600 text-black rounded-xl py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  Host Auction
                  <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                </button>
              </div>

            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
