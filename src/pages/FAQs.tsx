import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { allFaqs, categoryFaqs } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CATEGORIES = [
  { value: "general",             label: "General" },
  { value: "file-upload",         label: "File Upload" },
  { value: "integration",         label: "Integration" },
  { value: "simple-template",     label: "Simple Template" },
  { value: "csv-template",        label: "CSV Template" },
  { value: "google-doc-template", label: "Google Doc Template" },
  { value: "key-mapping",         label: "Key Mapping" },
  { value: "generate-button",     label: "Generate Button" },
];

const FAQs = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [paused,    setPaused]    = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  /* ── scroll restoration ── */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  /* ── when tab changes, scroll it into view and pause ticker briefly ── */
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPaused(true);
    setTimeout(() => setPaused(false), 2000);
    const btn = document.querySelector<HTMLElement>(`[data-tab-value="${value}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="DocGenius FAQs | Answers to Common Questions"
        description="Find answers about DocGenius pricing, Salesforce integration, template setup, and how to automate document workflows."
        path="/faqs"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://docgenius.ai/" },
              { "@type": "ListItem", position: 2, name: "FAQs", item: "https://docgenius.ai/faqs" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container-narrow mx-auto px-4">

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about DocGenius
            </p>
          </motion.div>

          {/* ── Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">

              {/* ────── Scrollable ticker tab bar ────── */}
              <div className="relative mb-8 overflow-hidden rounded-2xl border border-border/60 bg-muted/40 dark:bg-muted/10 p-1.5">

                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-muted/60 to-transparent rounded-l-2xl" />
                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-muted/60 to-transparent rounded-r-2xl" />

                {/* Ticker strip — uses a CSS animation so it truly loops like a news headline */}
                <div
                  className="overflow-hidden"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onTouchStart={() => setPaused(true)}
                  onTouchEnd={() => setTimeout(() => setPaused(false), 1500)}
                >
                  {/* We render TABS (not a clone trick) inside a native scrollable list.
                      The "ticker" is driven by a CSS animation on the inner strip.
                      We duplicate the list once so the loop is seamless.               */}
                  <div
                    ref={stripRef}
                    className="flex gap-2 whitespace-nowrap"
                    style={{
                      animation: "faq-ticker 22s linear infinite",
                      animationPlayState: paused ? "paused" : "running",
                      width: "max-content",
                    }}
                  >
                    {/* Original set */}
                    {CATEGORIES.map(({ value, label }) => (
                      <button
                        key={value}
                        data-tab-value={value}
                        onClick={() => handleTabChange(value)}
                        className={[
                          "inline-flex items-center rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none shrink-0",
                          activeTab === value
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md px-8 py-2.5 scale-[1.04]"
                            : "px-5 py-2.5 text-muted-foreground hover:bg-muted/65 hover:text-foreground",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {CATEGORIES.map(({ value, label }) => (
                      <button
                        key={`dup-${value}`}
                        aria-hidden="true"
                        onClick={() => handleTabChange(value)}
                        className={[
                          "inline-flex items-center rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none shrink-0",
                          activeTab === value
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md px-8 py-2.5 scale-[1.04]"
                            : "px-5 py-2.5 text-muted-foreground hover:bg-muted/65 hover:text-foreground",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Hidden real TabsList needed by Radix for keyboard / a11y ── */}
              <TabsList className="sr-only">
                {CATEGORIES.map(({ value, label }) => (
                  <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
                ))}
              </TabsList>

              {/* ── Tab content panels ── */}
              {CATEGORIES.map(({ value }) => (
                <TabsContent key={value} value={value} className="mt-0 outline-none max-w-3xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {(categoryFaqs[value] ?? []).map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-all"
                      >
                        <AccordionTrigger className="text-left font-semibold font-display py-5 hover:no-underline text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;


