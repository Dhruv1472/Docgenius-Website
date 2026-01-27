import { motion } from "framer-motion";
import docgeniusLogo from "@/assets/docgenius-logo-icon.png";
import mvcloudsLogo from "@/assets/mvclouds-logo.svg";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Use Cases", href: "#usecase" },
  { label: "Features", href: "#features" },
  { label: "Why DocGenius", href: "#why-docgenius" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Logo & Tagline */}
          <div>
            <img 
              src={docgeniusLogo} 
              alt="DocGenius" 
              className="h-16 w-auto mb-4 "
            />
            <p className="text-background/70 text-sm leading-relaxed">
              From proposals and contracts to reports and letters, DocGenius makes the entire document journey fast, clean, and stress-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h4 className="font-bold font-display text-lg mb-4">Contact</h4>
            <p className="text-background/70 text-sm mb-6">
              Have questions? Reach out to our team for support and inquiries.
            </p>
            <div className="pt-4 border-t border-background/20">
              <p className="text-background/50 text-xs mb-2">Powered by</p>
              <img 
                src={mvcloudsLogo} 
                alt="MV Clouds" 
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} DocGenius. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
