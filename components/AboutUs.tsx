"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  const capabilities = [
    {
      number: "01",
      title: "Brands with clarity.",
      desc: "We create identities that give businesses a clear point of view — from how they look and sound to how they are experienced across every touchpoint.",
      tags: "Strategy · Identity · Visual Systems",
    },
    {
      number: "02",
      title: "Experiences with purpose.",
      desc: "We design and build digital experiences that make complex ideas easier to understand, businesses easier to engage with, and brands easier to remember.",
      tags: "Websites · UI/UX · Digital Experiences",
    },
    {
      number: "03",
      title: "Systems with intelligence.",
      desc: "We connect tools, automate repetitive processes, and build intelligent systems that reduce friction and give businesses more room to focus on what matters.",
      tags: "AI Automation · Workflows · Integrations",
    },
    {
      number: "04",
      title: "Growth with direction.",
      desc: "We develop content, campaigns, and digital marketing systems that help brands stay visible, communicate clearly, and build meaningful relationships.",
      tags: "Content · Campaigns · Digital Marketing",
    },
  ];

  const beliefs = [
    {
      title: "Curiosity over convention.",
      desc: "We question assumptions before accepting them. The fact that something has always been done one way doesn't mean it is the right way.",
    },
    {
      title: "Clarity over complexity.",
      desc: "Complex problems don't always need complicated solutions. We look for the clearest path between where you are and where you want to go.",
    },
    {
      title: "Systems over scattered solutions.",
      desc: "A great logo, website, campaign, or automation means more when everything works together. We build connections, not isolated deliverables.",
    },
    {
      title: "Purpose over decoration.",
      desc: "Design should have a reason. Technology should solve a problem. Every decision should move the bigger picture forward.",
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* =====================================================
            HERO
        ===================================================== */}
        <div className="max-w-4xl mb-32">
          <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
            Our Purpose
          </span>

          <h1 className="text-[36px] sm:text-[44px] lg:text-[64px] font-bold leading-[1.1] mb-8">
            We engineer intelligent brand systems that{" "}
            <span className="text-primary">
              drive high velocity growth.
            </span>
          </h1>

          <p className="text-xl lg:text-2xl font-light leading-relaxed text-neutral/70">
            We believe modern enterprises should not have to choose between
            elite aesthetics and technical efficiency. Zi Creates transforms
            your vision into a scalable business asset through precise
            creative engineering.
          </p>
        </div>

        {/* =====================================================
            OUR STORY
        ===================================================== */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-40">

          <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="https://media.istockphoto.com/id/1488871811/photo/business-people-laptop-and-meeting-in-planning-above-for-web-design-strategy-or-brainstorming.jpg?s=612x612&w=0&k=20&c=tAiRqxqlilEy0QZX535lRvfcNEX1xXN3otVACm5uCIM="
              alt="Zi Creates team working together"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-8">

            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary/80">
              Our Story
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold">
              Great ideas deserve better execution.
            </h2>

            <div className="space-y-4 text-neutral/70 font-light leading-relaxed">
              <p>
                Zi Creates was founded by{" "}
                <strong className="text-neutral font-semibold">
                  John Zidah
                </strong>{" "}
                to bridge the gap between creative vision and technical
                execution.
              </p>

              <p>
                What started with branding and digital experiences evolved
                into a broader approach, uniting strategy, creativity,
                technology, and automation together.
              </p>

              <p className="pt-4 border-t border-neutral/10">
                We don't just create the next deliverable.
                <strong className="block text-neutral font-semibold mt-1">
                  We build what comes next.
                </strong>
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            PHILOSOPHY
        ===================================================== */}
        <div className="mb-40 max-w-5xl">

          <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
            Our Philosophy
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-10">
            Everything works better when{" "}
            <span className="text-primary">
              it works together.
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-lg lg:text-xl font-light leading-relaxed text-neutral/70">

            <p>
              A brand should connect to its experience. An experience should
              connect to its systems. And the systems behind a business should
              make growth easier, not more complicated.
            </p>

            <p>
              We bring these disciplines together to create one connected
              ecosystem, where strategy informs creativity, creativity informs
              technology, and technology makes the entire business work better.
            </p>

          </div>
        </div>

        {/* =====================================================
            WHAT WE BUILD
        ===================================================== */}
        <div className="mb-40">

          <div className="max-w-3xl mb-16">
            <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
              What We Build
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              More than deliverables.
            </h2>

            <p className="text-lg lg:text-xl text-neutral/60 font-light leading-relaxed">
              We build connected brand ecosystems designed around how modern
              businesses actually operate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {capabilities.map((item) => (
              <div
                key={item.number}
                className="group p-8 lg:p-10 rounded-[2rem] bg-neutral/5 border border-neutral/10 hover:border-primary transition-colors duration-500"
              >

                <div className="flex items-start justify-between mb-8">
                  <span className="text-primary font-bold tracking-tighter text-4xl opacity-30 group-hover:opacity-100 transition-opacity">
                    {item.number}
                  </span>

                  <span className="text-xs uppercase tracking-[0.15em] text-neutral/40">
                    Zi Creates
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-neutral/60 font-light leading-relaxed mb-6">
                  {item.desc}
                </p>

                <p className="text-sm text-primary/80 font-medium">
                  {item.tags}
                </p>

              </div>
            ))}

          </div>
        </div>

        {/* =====================================================
            FRAMEWORK
        ===================================================== */}
        <div className="mb-40">

          <div className="text-center mb-20">

            <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-5 block">
              How We Work
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              From idea to intelligent execution.
            </h2>

            <p className="text-neutral/60 font-light italic">
              Strategy, creativity, technology, and execution — connected.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                step: "01",
                title: "Audit & Architect",
                desc: "We analyze your brand, goals, audience, and operational bottlenecks to uncover opportunities and architect a strategy built around what your business actually needs.",
              },
              {
                step: "02",
                title: "Engineer & Automate",
                desc: "We turn strategy into reality by combining creative direction, design, development, technology, and automation to build the assets and systems that move your business forward.",
              },
              {
                step: "03",
                title: "Deploy & Scale",
                desc: "We launch your ecosystem, evaluate how it performs, and continuously refine it so your brand can evolve as your business grows.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-10 rounded-[2rem] bg-neutral/5 border border-neutral/10 hover:border-primary transition-colors duration-500 group"
              >

                <span className="text-primary font-bold tracking-tighter text-5xl opacity-20 group-hover:opacity-100 transition-opacity">
                  {item.step}
                </span>

                <h3 className="text-2xl font-bold mt-6 mb-4">
                  {item.title}
                </h3>

                <p className="text-neutral/60 font-light leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </div>

        {/* =====================================================
            BELIEFS
        ===================================================== */}
        <div className="mb-40">

          <div className="max-w-3xl mb-16">
            <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
              What We Believe
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold">
              The way we think shapes the way we create.
            </h2>
          </div>

          <div className="border-t border-neutral/10">

            {beliefs.map((belief, index) => (
              <div
                key={belief.title}
                className="grid lg:grid-cols-12 gap-8 py-10 border-b border-neutral/10 group"
              >

                <div className="lg:col-span-4">
                  <span className="text-primary text-sm font-bold">
                    0{index + 1}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-bold mt-3 group-hover:text-primary transition-colors duration-300">
                    {belief.title}
                  </h3>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="text-lg text-neutral/60 font-light leading-relaxed">
                    {belief.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* =====================================================
            VISION + CTA
        ===================================================== */}
        <div className="relative bg-neutral/5 rounded-[3rem] p-12 lg:p-24 overflow-hidden border border-neutral/10">

          <div className="absolute -bottom-10 -right-10 text-[120px] lg:text-[180px] font-bold text-neutral/5 select-none pointer-events-none">
            CREATE
          </div>

          <div className="max-w-4xl relative z-10">

            <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
              Our Vision
            </span>

            <h2 className="text-4xl lg:text-6xl font-bold leading-[1.05] mb-10">
              The future belongs to{" "}
              <span className="text-primary">
                connected brands.
              </span>
            </h2>

            <div className="space-y-6 text-lg lg:text-xl font-light text-neutral/70 leading-relaxed">

              <p>
                We believe businesses should not have to choose between
                creativity and technology, beautiful experiences and
                efficient systems, ambitious ideas and practical execution.
              </p>

              <p>
                Our goal is to bring those worlds together — helping
                businesses build brands that are not only designed to stand
                out, but designed to work, evolve, and grow.
              </p>

            </div>

            <div className="mt-12 flex items-center gap-4 text-lg font-semibold text-neutral">
              <span className="w-12 h-[2px] bg-primary"></span>

              <p>
                Build what your business becomes next.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;