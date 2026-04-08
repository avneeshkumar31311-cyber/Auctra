import { useState, useEffect } from "react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("bidder");
  
  // New Registration Fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  
  const [errors, setErrors] = useState({});

  // Reset form when opened or toggled
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setRole("bidder");
      setName("");
      setUsername("");
      setMobile("");
      setCountry("");
      setErrors({});
    }
  }, [isOpen, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Global validation
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    // Register-specific validation
    if (!isLogin) {
      if (!name.trim()) newErrors.name = "Name is required";
      if (!username.trim()) newErrors.username = "Username is required";
      if (!mobile.trim()) newErrors.mobile = "Mobile is required";
      if (!country.trim()) newErrors.country = "Country is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success
    setErrors({});
    const formData = {
      action: isLogin ? "Login" : "Register",
      email,
      password,
    };
    
    if (!isLogin) {
      formData.role = role;
      formData.name = name;
      formData.username = username;
      formData.mobile = mobile;
      formData.country = country;
    }

    console.log("🚀 ~ Auth Form Submitted:", formData);
    
    // Simulate successful Auth for mock frontend
    localStorage.setItem("auctra_user", JSON.stringify(formData));
    onClose();
    window.location.reload();
  };

  const inputClass = "w-full bg-surface border-0 border-b border-outline-variant/30 text-white focus:ring-0 focus:border-primary transition-colors py-3 px-0 font-body";

  return (
    <div className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} py-12`}>
      <div 
        className={`bg-surface-container-high p-8 md:p-12 w-full border border-outline-variant/20 relative mx-4 max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-500 ${isLogin ? 'max-w-lg' : 'max-w-2xl'}`}
      >
        
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-3xl md:text-4xl text-white font-serif">{isLogin ? "Access Gateway" : "Register Profile"}</h2>
          <span 
            className="material-symbols-outlined cursor-pointer text-stone-500 hover:text-primary transition-colors absolute top-8 right-8 text-3xl" 
            onClick={onClose}
          >
            close
          </span>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Registration Extra Fields */}
          {!isLogin && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Full Name</label>
                <input 
                  className={inputClass} 
                  type="text" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                  }}
                />
                {errors.name && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.name}</span>}
              </div>
              
              <div>
                <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Username</label>
                <input 
                  className={inputClass} 
                  type="text" 
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors((prev) => ({ ...prev, username: null }));
                  }}
                />
                {errors.username && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.username}</span>}
              </div>

              <div>
                <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Mobile No.</label>
                <input 
                  className={inputClass} 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: null }));
                  }}
                />
                {errors.mobile && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.mobile}</span>}
              </div>

              <div>
                <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Country</label>
                <input 
                  className={inputClass} 
                  type="text" 
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (errors.country) setErrors((prev) => ({ ...prev, country: null }));
                  }}
                />
                {errors.country && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.country}</span>}
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={!isLogin ? "md:col-span-1" : "md:col-span-2"}>
              <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Identity ID (Email)</label>
              <input 
                className={inputClass} 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
              />
              {errors.email && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.email}</span>}
            </div>

            <div className={!isLogin ? "md:col-span-1" : "md:col-span-2"}>
              <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Passkey</label>
              <input 
                className={inputClass} 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                }}
              />
              {errors.password && <span className="text-red-400 text-xs font-label uppercase tracking-widest mt-2 block animate-in fade-in">{errors.password}</span>}
            </div>
          </div>

          {/* Role Selection (Register Only) */}
          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 pt-4 border-t border-outline-variant/10">
              <label className="font-label text-[10px] text-stone-500 uppercase tracking-widest mb-4 block text-center md:text-left">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setRole("bidder")}
                  className={`py-3 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${role === "bidder" ? "border-primary text-primary bg-primary/5" : "border-outline-variant/30 text-stone-500 hover:border-stone-400 hover:text-stone-300"}`}
                >
                  Bidder
                </button>
                <button 
                  type="button"
                  onClick={() => setRole("seller")}
                  className={`py-3 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${role === "seller" ? "border-primary text-primary bg-primary/5" : "border-outline-variant/30 text-stone-500 hover:border-stone-400 hover:text-stone-300"}`}
                >
                  Seller
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-primary text-on-primary py-5 font-bold uppercase tracking-widest hover:bg-primary-fixed-dim transition-colors mt-8">
            {isLogin ? "Authenticate" : "Create Profile"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-outline-variant/20 pt-8">
          <p className="text-xs text-stone-500 font-sans">
            {isLogin ? "Don't have an archive profile?" : "Already part of the archive?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary uppercase font-bold tracking-widest hover:underline decoration-1 underline-offset-4 transition-all"
            >
              {isLogin ? "Register Here" : "Login Here"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}