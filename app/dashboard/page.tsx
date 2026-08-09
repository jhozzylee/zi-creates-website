"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; 
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
  const router = useRouter(); 
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        router.push("/"); 
        return;
      }

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

      setLoading(false);
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
    <div className="min-h-screen bg-[#050505] text-white pt-24 md:pt-32 px-4 md:px-6 pb-24 selection:bg-[#30D5C8] selection:text-black font-sans overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* ================= HEADER SECTION WITH FINANCIALS ================= */}
        <motion.header 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={fluidTransition}
          className="mb-12 md:mb-20 border-b border-white/10 pb-8 md:pb-12 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="w-full md:w-auto">
              <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#30D5C8] mb-4 block">
                Executive Portal
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6 break-words">
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

            {/* Financials block: Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-row md:flex-row gap-8 md:gap-12 md:border-l md:border-white/15 md:pl-12 h-fit w-full md:w-auto justify-between md:justify-start pt-6 md:pt-0 border-t border-white/10 md:border-t-0">
              {data.payments.slice(0, 2).map((pay: any) => (
                <div key={pay.id}>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Investment //</p>
                  <p className="text-2xl md:text-3xl font-serif italic font-light">${pay.amount.toLocaleString()}</p>
                  <p className={`text-[9px] uppercase tracking-widest font-bold mt-1 ${pay.status === 'Paid' ? 'text-[#30D5C8]' : 'text-red-400'}`}>
                    {pay.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-8 space-y-12 md:space-y-20"
          >

            {/* ACTIVE SYSTEMS (PROJECTS) */}
            <section>
              <SectionHeader title="Active Systems" />
              {data.projects.map((project: any) => (
                <motion.div 
                  key={project.id} 
                  variants={fadeInUp} 
                  className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] mb-8 last:mb-0 relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{project.project_name}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Engineering Progress</p>
                        <span className="w-1 h-1 bg-white/20 rounded-full hidden sm:inline-block" />
                        <p className="text-[#30D5C8] text-[10px] uppercase tracking-[0.2em] font-black">
                           Phase: {project.current_phase || "Discovery"}
                        </p>
                      </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-light font-serif text-[#30D5C8] italic self-end sm:self-auto">{project.progress}%</p>
                  </div>

                  <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mb-8 md:mb-12">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="bg-[#30D5C8] h-full shadow-[0_0_15px_rgba(48,213,200,0.5)]"
                    />
                  </div>

                  {project.brief && (
                    <div className="pt-6 md:pt-8 border-t border-white/5">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-4">Project Brief //</h4>
                      <div className="border-l-2 border-[#30D5C8]/20 pl-4 md:pl-6 py-2">
                        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light italic">"{project.brief}"</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </section>

            {/* MILESTONES */}
            <section>
              <SectionHeader title="Project Milestones" />
              <div className="space-y-4">
                {data.milestones.map((ms: any) => (
                  <motion.div
                    key={ms.id}
                    variants={fadeInUp}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 border border-white/10 bg-white/[0.01] rounded-[1.25rem] md:rounded-[1.5rem] transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-4 md:gap-6">
                      <div className={`w-2 h-2 rounded-full mt-1.5 sm:mt-0 shrink-0 ${ms.status === 'Completed' ? 'bg-[#30D5C8] shadow-[0_0_10px_#30D5C8]' : 'bg-white/20'}`} />
                      <div>
                        <h4 className={`text-base md:text-lg font-bold tracking-tight ${ms.status === 'Completed' ? 'text-white/90' : 'text-white/40'}`}>
                          {ms.title}
                        </h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 mt-1">
                          Due: {ms.due_date}
                        </p>
                      </div>
                    </div>
                    <span className={`self-start sm:self-auto text-[10px] uppercase font-bold px-3 md:px-4 py-1.5 rounded-full border tracking-widest ${
                      ms.status === 'Completed' ? 'bg-[#30D5C8]/5 border-[#30D5C8]/20 text-[#30D5C8]' : 'bg-white/5 border-white/10 text-white/30'
                    }`}>
                      {ms.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

          </motion.div>

          {/* ================= RIGHT COLUMN (SIDEBAR) ================= */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...fluidTransition, delay: 0.3 }}
            className="lg:col-span-4 space-y-12 md:space-y-16"
          >
            {/* SHARED ASSETS */}
            <section>
              <SectionHeader title="Shared Assets" />
              <div className="grid gap-3">
                {data.deliverables.map((file: any) => (
                  <motion.a
                    key={file.id}
                    href={file.file_url}
                    target="_blank"
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="flex items-center gap-4 md:gap-5 p-4 md:p-5 bg-white/[0.02] border border-white/10 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#30D5C8]/5 text-[#30D5C8] rounded-xl flex items-center justify-center text-base md:text-lg border border-[#30D5C8]/10 shrink-0">📂</div>
                    <div className="overflow-hidden text-left">
                      <p className="text-sm font-bold truncate text-white/80 tracking-tight">{file.file_name}</p>
                      <p className="text-[9px] text-[#30D5C8] uppercase tracking-[0.2em] font-bold mt-1">Download Asset</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* NEXT BILLING */}
              <div className="bg-white/[0.03] p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-[#30D5C8]/20 mt-8 md:mt-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#30D5C8]/5 blur-3xl rounded-full" />
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-4 font-sans">Next Billing Cycle //</p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tighter mb-6 md:mb-8">{data.profile?.next_due_date || "N/A"}</h3>
                
                {data.profile?.payment_link && (
                  <div className="flex justify-center md:justify-start">
                    <CTAButton text="Renew Subscription" onClick={handleRenewClick} />
                  </div>
                )}
              </div>
            </section>

            {/* PERFORMANCE & GROWTH UPDATES */}
            <section>
              <SectionHeader title="Performance & Growth Updates" pulse />
              <div className="grid gap-4">
                {data.updates.length > 0 ? (
                   data.updates.map((update: any) => (
                    <motion.div 
                      key={update.id}
                      variants={fadeInUp}
                      className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[1.75rem] md:rounded-[2rem] flex flex-col justify-between items-start gap-4 transition-all"
                    >
                      <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed italic">"{update.content}"</p>
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                        {new Date(update.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <EmptyState message="Waiting for the next growth cycle updates..." />
                )}
              </div>
            </section>
          </motion.aside>

        </div>
      </div>
    </div>
  );
}

const SectionHeader = ({ title, pulse }: { title: string; pulse?: boolean }) => (
  <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6 md:mb-8 font-bold flex items-center gap-3">
    {pulse && <span className="w-2 h-2 bg-[#30D5C8] rounded-full animate-pulse shadow-[0_0_8px_#30D5C8]" />}
    {title}
  </h2>
);

const Badge = ({ text, color = "text-white/40" }: { text: string; color?: string }) => (
  <span className={`px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold ${color}`}>
    {text}
  </span>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="p-8 md:p-12 border border-dashed border-white/10 rounded-[2rem] text-center">
    <p className="text-white/20 italic text-sm font-light">{message}</p>
  </div>
);