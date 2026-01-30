import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LINKS } from "@/lib/utils";
import docgeniusLogo from "@/assets/docGeniusLogoSvg.svg";
import { BookDemoModal } from "@/components/BookDemoDialog";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Use Cases", href: "#usecase" },
  { label: "Features", href: "#features" },
  { label: "Why DocGenius", href: "#why-docgenius" },
  { label: "Industries", href: "#industries" },
  // { label: "Pricing", href: "#pricing" },
  // { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="px-4">
        <div className="container-narrow mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img 
              src={docgeniusLogo} 
              alt="DocGenius" 
              className="h-12 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-nowrap px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="hero" size="default" onClick={() => setBookDemoOpen(true)}>
              Book Demo
            </Button>
            <Button variant="hero-outline" size="default" asChild>
              <a href={CTA_LINKS.freeTrial} target="_blank" rel="noreferrer">
                Free Trial
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="px-4 py-4">
              <div className="max-w-7xl mx-auto flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="hero" size="lg" className="w-full" onClick={() => setBookDemoOpen(true)}>
                    Book Demo
                  </Button>
                  <Button variant="hero-outline" size="lg" className="w-full" asChild>
                    <a href={CTA_LINKS.freeTrial} target="_blank" rel="noreferrer">
                      Free Trial
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <BookDemoModal isOpen={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
    </header>
  );
};
