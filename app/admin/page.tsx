"use client";
import { useState } from "react";

export default function AdminPortal() {
  const [form, setForm] = useState({ 
    email: "", 
    name: "", 
    projectName: "",
    subscriptionType: "Premium",
    paymentLink: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Syncing with Zi Creates Database...");

    const res = await fetch("/api/admin/onboard", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const result = await res.json();
    if (result.success) {
      setStatus("✅ Success! Client profile, project, and billing created.");
      setForm({ email: "", name: "", projectName: "", subscriptionType: "Premium", paymentLink: "" });
    } else {
      setStatus(`❌ Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-8 pb-20">
      <div className="max-w-2xl mx-auto bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold mb-8 tracking-tighter uppercase">Onboard New Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <label className="text-[10px] uppercase text-gray-500 ml-2">Client Full Name</label>
               <input 
                placeholder="John Doe" 
                className="w-full bg-black p-4 border border-white/10 rounded-xl focus:border-white/30 outline-none"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
             </div>
             <div className="space-y-1">
               <label className="text-[10px] uppercase text-gray-500 ml-2">Email Address</label>
               <input 
                type="email"
                placeholder="client@email.com" 
                className="w-full bg-black p-4 border border-white/10 rounded-xl focus:border-white/30 outline-none"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-500 ml-2">Main Project Title</label>
            <input 
              placeholder="enter project name" 
              className="w-full bg-black p-4 border border-white/10 rounded-xl focus:border-white/30 outline-none"
              value={form.projectName}
              onChange={e => setForm({...form, projectName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-gray-500 ml-2">Subscription Tier</label>
              <select 
                className="w-full bg-black p-4 border border-white/10 rounded-xl appearance-none focus:border-white/30 outline-none text-gray-400"
                value={form.subscriptionType}
                onChange={e => setForm({...form, subscriptionType: e.target.value})}
              >
                <option value="Essentials">Essentials</option>
                <option value="Growth">Growth</option>
                <option value="Premium">Premium</option>
                <option value="Custom">Custom</option>

              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-gray-500 ml-2">Payment Link</label>
              <input 
                placeholder="enter payment link" 
                className="w-full bg-black p-4 border border-white/10 rounded-xl focus:border-white/30 outline-none"
                value={form.paymentLink}
                onChange={e => setForm({...form, paymentLink: e.target.value})}
              />
            </div>
          </div>

          <button className="w-full bg-white text-black font-black py-5 rounded-xl uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors">
            Authorize & Sync
          </button>
        </form>

        {status && <div className="mt-8 p-4 bg-white/5 rounded-xl text-center text-sm border border-white/5 text-gray-400 font-light italic">{status}</div>}
      </div>
    </div>
  );
}