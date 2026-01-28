"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface WebsiteDevelopmentProps {
  onOpenBookCall: () => void;
}

export default function WebsiteDevelopment({
  onOpenBookCall,
}: WebsiteDevelopmentProps) {
  const capabilities = [
    {
      title: "Custom Responsive Web Design",
      items: [
        "Mobile-first layouts for all screen sizes",
        "Conversion-focused UI systems",
        "Accessible, modern design patterns",
      ],
    },
    {
      title: "E-Commerce Excellence",
      items: [
        "Shopify, WooCommerce & custom builds",
        "Cart optimization & checkout flow",
        "Scalable product and payment systems",
      ],
    },
    {
      title: "CMS & Headless Solutions",
      items: [
        "Webflow & WordPress CMS builds",
        "Headless architecture for speed & security",
        "Easy content updates for teams",
      ],
    },
    {
      title: "Web Apps & SaaS Development",
      items: [
        "UI/UX-driven web applications",
        "Functional prototypes & MVPs",
        "Problem-solving product interfaces",
      ],
    },
    {
      title: "Performance Optimization",
      items: [
        "Core Web Vitals optimization",
        "SEO-friendly structure & clean code",
        "Fast load times favored by Google",
      ],
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8 max-w-xl">
            <span className="uppercase tracking-widest text-sm font-bold text-primary/80">
              Website Development
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              High-Performance Digital Hubs for{" "}
              <span className="text-primary">Modern Brands</span>
            </h1>

            <p>
              Your website is your most important salesperson. It’s often the
              first—and last—touchpoint a customer has with your brand.
            </p>

            <p>
              At{" "}
              <strong className="text-neutral font-semibold">
                Zi Creates
              </strong>
              , we don’t just build websites. We develop fast, secure, and
              conversion-driven digital experiences engineered to turn traffic
              into revenue.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
              alt="Website development and coding workspace"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Capabilities Section --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">
              Our Web Development Capabilities
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/50 md:max-w-xs font-medium">
              Built to scale with your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((block, index) => (
              <div
                key={index}
                className="p-10 rounded-2xl border border-neutral/10 bg-neutral/5 hover:bg-neutral/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                  {index + 1}
                </div>
                
                <h3 className="text-2xl font-bold mb-6">
                  {block.title}
                </h3>

                <ul className="space-y-3 text-neutral/70 font-light">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Choose Us --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">
            Why Develop Your Website with Zi Creates?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "SEO-First Architecture",
                desc: "We bake SEO into the foundation — clean code, semantic HTML, and optimized structure from day one.",
              },
              {
                title: "Subscribe & Ship Speed",
                desc: "No development hell. Our workflow is built for velocity without sacrificing quality.",
              },
              {
                title: "Strategy-Led UI/UX",
                desc: "Buttons go where users are most likely to click, guided by psychology and visual hierarchy.",
              },
              {
                title: "Ongoing Support & Refinements",
                desc: "Your website evolves with your business. We stay on as your technical partner.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1.5 h-3 w-3 rounded-full bg-primary shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-neutral/70 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <div className="text-center max-w-3xl mx-auto py-12 border-t border-neutral/10">
          <p className="text-2xl font-light italic text-neutral/90 mb-12">
            “Your website should work harder than any salesperson.”
          </p>

          <CTAButton
            text="Build My Website"
            onClick={onOpenBookCall}
          />
        </div>
      </div>
    </section>
  );
}
