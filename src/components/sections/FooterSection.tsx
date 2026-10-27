import React from "react";
import { Github, Linkedin, Mail, MapPin, Globe, Phone } from "lucide-react";
import { ProfileData } from "../../services/api";
import ContactForm from "./ContactForm";

type FooterSectionProps = {
  profile?: ProfileData | null;
};

export default function FooterSection({ profile }: FooterSectionProps) {
  const email = profile?.email || "contact@rakibulhr.dev";
  const location = profile?.location || "Dhaka, Bangladesh";

  const contactList = [
    { label: "Email Address", info: email, href: `mailto:${email}`, icon: Mail },
    { label: "LinkedIn", info: "rakibul-hasan-roxy", href: profile?.linkedinUrl || "https://linkedin.com/in/rakibul-hasan-roxy", icon: Linkedin },
    { label: "GitHub Profile", info: "Rakibul-Hasan-Roxy", href: profile?.githubUrl || "https://github.com/Rakibul-Hasan-Roxy", icon: Github },
    { label: "Location", info: location, href: "#", icon: MapPin },
  ];

  return (
    <footer className="section-shell px-0 py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <span className="eyebrow">Direct Contact</span>
          <h2 className="display-title text-4xl md:text-6xl font-extrabold tracking-[-0.05em] text-white">
            Open for
            <br />
            <span className="text-cyan-300">focused product work.</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-base md:text-lg leading-7">
            {profile?.headline || "Mobile applications, frontend systems, and practical product engineering with a cleaner, more direct delivery style."}
          </p>
        </div>

        {/* Dynamic Contact Methods from PostgreSQL Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
          {contactList.map((method, i) => {
            const Icon = method.icon;
            return (
              <a
                key={i}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group section-divider flex flex-col py-5 transition-colors hover:text-cyan-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-cyan-300 transition-colors group-hover:text-cyan-200">
                    <Icon size={18} />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider">{method.label}</span>
                </div>
                <span className="text-slate-500 font-mono text-xs truncate">{method.info}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Interactive NestJS + PostgreSQL Contact Form */}
      <ContactForm />
    </footer>
  );
}
