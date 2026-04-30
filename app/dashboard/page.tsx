"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; // Added for redirection
import CTAButton from "@/components/CTAButton"; 

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: fluidTransition
};

export default function ClientDashboard() {
  const router = useRouter(); // Initialize router
  const [data, setData] = useState<any>({
    profile: null,
    projects: [],
    milestones: [],
    payments: [],
    deliverables: [],
    updates: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      // 1. Check for active session
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.log("No active session found, redirecting...");
        router.push("/"); // Send them home if they aren't logged in
        return;
      }

      // 2. Fetch all data in parallel using the user.id
      try {
        const [profile, projects, milestones, payments, deliverables, updates] = await Promise.all([
          supabase.from("client").select("*").eq("user_id", user.id).single(),
          supabase.from("projects").select("*").eq("user_id", user.id),
          supabase.from("milestones").select("*").eq("user_id", user.id),
          supabase.from("payments").select("*").eq("user_id", user.id),
          supabase.from("deliverables").select("*").eq("user_id", user.id),
          supabase.from("updates")
            .select("*")
            .eq("user_id", user.id)
            .order('created_at', { ascending: false })
        ]);

        setData({
          profile: profile.data,
          projects: projects.data || [],
          milestones: milestones.data || [],
          payments: payments.data || [],
          deliverables: deliverables.data || [],
          updates: updates.data || [],
        });
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [router]);

  const handleRenewClick = () => {
    if (data.profile?.payment_link) {
      window.open(data.profile.payment_link, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs uppercase tracking-[0.4em] font-bold text-[#30D5C8]"
        >
          Initializing Portal //
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 pb-24 selection:bg-[#30D5C8] selection:text-black font-sans">
      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER SECTION */}
        <motion.header 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={fluidTransition}
          className="mb-20 border-b border-white/10 pb-12 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#30D5C8] mb-4 block">
                Executive Portal
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                {data.profile?.name || "Client"}<span className="text-[#30D5C8] italic font-serif font-light">.</span>
              </h1>
              
              <div className="flex flex-wrap gap-3">
                <Badge text={`${data.profile?.subscription_type || "Standard"} Plan`} />
                <Badge 
                  text={`Status: ${data.profile?.status || "N/A"}`} 
                  color={data.profile?.status === 'Active' ? 'text-[#30D5C8]' : 'text-white/40'} 
                />
              </div>
            </div>

            <div className="flex gap-12 border-l border-white/10 pl-12 h-fit hidden md:flex">
              {data.payments.slice(0, 2).map((pay: any) => (
                <div key={pay.id}>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Investment //</p>
                  <p className="text-3xl font-serif italic font-light">${pay.amount.toLocaleString()}</p>
                  <p className={`text-[9px] uppercase tracking-widest font-bold mt-1 ${pay.status === 'Paid' ? 'text-[#30D5C8]' : 'text-green-400'}`}>
                    {pay.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-8 space-y-20"
          >
            {/* PROJECTS */}
            <section>
              <SectionHeader title="Active Systems" />
              {data.projects.map((project: any) => (
                <motion.div 
                  key={project.id} 
                  variants={fadeInUp} 
                  className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] mb-8 last:mb-0 relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">{project.project_name}</h3>
                      <div className="flex items-center gap-3">
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Engineering Progress</p>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <p className="text-[#30D5C8] text-[10px] uppercase tracking-[0.2em] font-black">
                           Phase: {project.current_phase || "Discovery"}
                        </p>
                      </div>
                    </div>
                    <p className="text-4xl font-light font-serif text-[#30D5C8] italic">{project.progress}%</p>
                  </div>

                  <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mb-12">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="bg-[#30D5C8] h-full shadow-[0_0_15px_rgba(48,213,200,0.5)]"
                    />
                  </div>
                </motion.div>
              ))}
            </section>
          </motion.div>

          {/* SIDEBAR */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...fluidTransition, delay: 0.3 }}
            className="lg:col-span-4 space-y-16"
          >
            <div className="bg-white/[0.03] p-10 rounded-[2.5rem] border border-[#30D5C8]/20 mt-10 relative overflow-hidden">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-4">Next Billing Cycle //</p>
                <h3 className="text-3xl font-bold tracking-tighter mb-8">{data.profile?.next_due_date || "N/A"}</h3>
                {data.profile?.payment_link && (
                    <CTAButton text="Renew Subscription" onClick={handleRenewClick} />
                )}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

// Sub-components as you had them...
const SectionHeader = ({ title, pulse }: { title: string; pulse?: boolean }) => (
  <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 font-bold flex items-center gap-3">
    {pulse && <span className="w-2 h-2 bg-[#30D5C8] rounded-full animate-pulse shadow-[0_0_8px_#30D5C8]" />}
    {title}
  </h2>
);

const Badge = ({ text, color = "text-white/40" }: { text: string; color?: string }) => (
  <span className={`px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold ${color}`}>
    {text}
  </span>
);