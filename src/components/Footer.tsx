import { motion } from "framer-motion";
import docgeniusLogo from "@/assets/docGeniusLogoSvg.svg";
import mvcloudsLogo from "@/assets/mvclouds-logo.svg";
import { CTA_LINKS } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Use Cases", href: "#usecase" },
  { label: "Features", href: "#features" },
  { label: "Why DocGenius", href: "#why-docgenius" },
  { label: "Industries", href: "#industries" },
  // { label: "Pricing", href: "#pricing" },
  // { label: "Reviews", href: "#reviews" },
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
              className="h-16 w-auto mb-4 brightness-0 !invert mb-1"
            />
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              From proposals and contracts to reports and letters, DocGenius makes the entire document journey fast, clean, and stress-free.
            </p>
            <div className="pt-4 border-t border-background/20">
              <p className="text-background/50 text-xs mb-2">Powered by</p>
              <a href="https://mvclouds.com/" target="_blank" rel="noopener noreferrer" aria-label="MV Clouds" className="block mb-4">
                <img 
                  src={mvcloudsLogo} 
                  alt="MV Clouds" 
                  className="h-8 w-auto brightness-0 !invert"
                />
              </a>

               <div className="flex items-center gap-3">
                  <a href="https://wa.me/919558019600?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20IT%20services.%20Can%20we%20discuss%20further%3F" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-background/70 hover:text-background">
                    {/* WhatsApp SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/company/mv-clouds-private-limited/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-background/70 hover:text-background">
                    {/* LinkedIn SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </a>

                  <a href="https://www.instagram.com/mvcloudsync/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-background/70 hover:text-background">
                    {/* Instagram SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A4.5 4.5 0 1111.5 17 4.5 4.5 0 0112 7.5zm0 2A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zM17.5 6a1 1 0 110 2 1 1 0 010-2z"/>
                    </svg>
                  </a>

                  <a href="https://www.facebook.com/people/MV-Clouds-Private-Limited/100063698268170/#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-background/70 hover:text-background">
                    {/* Facebook SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                  </a>
                  <a href="https://x.com/mvclouds_tech" target="_blank" rel="noopener noreferrer" aria-label="X" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-background/70 hover:text-background">
                    {/* X (Twitter) SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.966 6.807H2.882l7.432-8.499L1.077 2.25h6.82l4.71 6.231 5.615-6.231zM17.15 18.75h1.832L6.083 3.702H4.075l13.075 15.048z"/>
                    </svg>
                  </a>
                </div>
            </div>
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
            <p className="text-background/70 text-sm mb-4">
              Have questions? Reach out to our team for support and inquiries at{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support-dg@mvclouds.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background underline block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill inline mr-2" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg>support-dg@mvclouds.com
              </a>
            </p>

            <p className="text-background/70 text-sm mb-4">
              <a href="tel:+919558019600" className="text-background/70 hover:text-background underline ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill inline mr-2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>+91 9558019600
              </a>
            </p>
            
            <p className="text-background/70 text-sm mb-6">
              <div className="text-background/70 hover:text-background flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo-alt-fill inline mr-2" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <div className="inline-block">
                  <div className="mb-4"><strong>Headquarter (India)</strong> :  D-404, The First Synthesis, B/H Keshavbaug Party Plot, Ahmedabad, Gujarat - 380015</div>
                  <div><strong>U.A.E.</strong> :  Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.</div>
                </div>
              </div>
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} DocGenius. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={CTA_LINKS.privacyPolicy} target="_blank" className="text-background/50 hover:text-background text-sm transition-colors">
              Privacy Policy
            </a>
            <a href={CTA_LINKS.termsOfUse} target="_blank" className="text-background/50 hover:text-background text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
