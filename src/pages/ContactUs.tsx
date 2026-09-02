import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  FileText,
  Sparkles,
  Users,
  MessageSquare,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendDemoRequest } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";
import { CTA_LINKS } from "@/lib/utils";

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: object) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

const countries = [
  { name: "Argentina", code: "AR" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Bangladesh", code: "BD" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Greece", code: "GR" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Kenya", code: "KE" },
  { name: "Malaysia", code: "MY" },
  { name: "Mexico", code: "MX" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nigeria", code: "NG" },
  { name: "Norway", code: "NO" },
  { name: "Pakistan", code: "PK" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Singapore", code: "SG" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Taiwan", code: "TW" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Vietnam", code: "VN" },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  message: "",
};

const SALESFORCE_ORG_ID = "00D5g000007qhe9";
const SALESFORCE_RECAPTCHA_SITE_KEY = "6LfTFIksAAAAAPiO8BeHTgZSDMNCaIxnW5ZmbA0L";

const getCaptchaSettingsValue = () =>
  JSON.stringify({
    keyname: "EstateXpert_New",
    fallback: "true",
    orgId: SALESFORCE_ORG_ID,
    ts: String(Date.now()),
  });

const demoSteps = [
  {
    step: "01",
    title: "Discovery & Workflow Review",
    description:
      "We learn about your specific document challenges, current Salesforce setup, and target templates (quotes, proposals, invoices, contracts).",
    duration: "5–10 mins",
  },
  {
    step: "02",
    title: "Live Custom Walkthrough",
    description:
      "See DocGenius in action generating documents with dynamic merge fields, child record tables, conditional formatting, and 1-click delivery.",
    duration: "15–20 mins",
  },
  {
    step: "03",
    title: "Sandbox Setup & 7-Day Trial",
    description:
      "Get free access installed in your Salesforce Sandbox or Production org, complete with template starter packs and dedicated technical guidance.",
    duration: "Immediate",
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "100% Salesforce-Native",
    desc: "Your data never leaves Salesforce. Zero external hosting or third-party storage risks.",
  },
  {
    icon: Zap,
    title: "10x Faster Document Prep",
    desc: "Generate complex multi-page contracts and proposals in seconds with a single click.",
  },
  {
    icon: FileText,
    title: "Multi-Format Export",
    desc: "Seamlessly export to PDF, Word (DOCX), CSV spreadsheets, Google Docs, and formatted emails.",
  },
  {
    icon: Users,
    title: "Unlimited Custom Objects",
    desc: "Pull data effortlessly across standard objects, custom objects, and multi-level child relationships.",
  },
];


export const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaSettings, setCaptchaSettings] = useState(getCaptchaSettingsValue());
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize reCAPTCHA
  useEffect(() => {
    if (submitted) return;

    const timestampInterval = setInterval(() => {
      const response = document.getElementById("g-recaptcha-response") as HTMLTextAreaElement | null;
      if (!response || response.value.trim() === "") {
        setCaptchaSettings(getCaptchaSettingsValue());
      }
    }, 500);

    const tryRender = () => {
      if (recaptchaRef.current && window.grecaptcha?.render && recaptchaWidgetId.current === null) {
        recaptchaRef.current.innerHTML = "";
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: SALESFORCE_RECAPTCHA_SITE_KEY,
            callback: (token: string) => {
              setRecaptchaToken(token);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.captcha;
                return next;
              });
            },
            "expired-callback": () => setRecaptchaToken(""),
          });
        } catch (e) {
          console.warn("reCAPTCHA render error:", e);
        }
      }
    };

    const delay = setTimeout(() => {
      if (window.grecaptcha?.render) {
        tryRender();
      } else {
        const interval = setInterval(() => {
          if (window.grecaptcha?.render) {
            tryRender();
            clearInterval(interval);
          }
        }, 200);
        return () => clearInterval(interval);
      }
    }, 150);

    return () => {
      clearTimeout(delay);
      clearInterval(timestampInterval);
    };
  }, [submitted]);

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    if (field === "phone") {
      // Only allow digits, plus sign, spaces, hyphens, and parentheses
      sanitizedValue = value.replace(/[^\d+\-\s()]/g, "");
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Work email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.country) newErrors.country = "Please select your country";
    if (formData.phone) {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (!/^[\d+\-\s()]+$/.test(formData.phone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.phone = "Please enter a valid phone number (7 to 15 digits)";
      }
    }
    if (!recaptchaToken) {
      newErrors.captcha = "Please verify that you are human by completing the reCAPTCHA";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Salesforce Submission via hidden iframe
      const iframeId = "salesforce_submit_iframe_contact";
      let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      const formSub = document.createElement("form");
      formSub.method = "POST";
      formSub.action = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${SALESFORCE_ORG_ID}`;
      formSub.target = iframeId;

      const countryCode = countries.find((c) => c.name === formData.country)?.code || formData.country;

      const data: Record<string, string> = {
        captcha_settings: captchaSettings,
        oid: SALESFORCE_ORG_ID,
        retURL: "http://login.salesforce.com",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        country_code: countryCode,
        phone: formData.phone,
        description: formData.message,
        lead_source: "DocGenius Contact Us Page",
        "g-recaptcha-response": recaptchaToken,
      };

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        formSub.appendChild(input);
      });

      document.body.appendChild(formSub);
      formSub.submit();
      setTimeout(() => {
        if (formSub.parentNode) document.body.removeChild(formSub);
      }, 1000);

      // Internal Email Notification
      await sendDemoRequest(formData);

      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Demo Request Submitted!",
        description: "Thank you for reaching out. Our team will contact you within 1-2 business days.",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      toast({
        title: "Submission Error",
        description: "Failed to submit your request. Please try again or reach out to support-dg@mvclouds.com directly.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(initialForm);
    setErrors({});
    setRecaptchaToken("");
    if (recaptchaWidgetId.current !== null) {
      try {
        window.grecaptcha?.reset(recaptchaWidgetId.current);
      } catch (e) {
        console.warn("reCAPTCHA reset error:", e);
      }
      recaptchaWidgetId.current = null;
    }
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.company.trim() !== "" &&
    formData.country !== "" &&
    recaptchaToken !== "";

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/10 selection:text-primary">
      <Seo
        title="Contact Us & Book a Demo | DocGenius"
        description="Schedule a personalized demo of DocGenius or connect with our Salesforce document automation specialists. Get answers on pricing, template building, and custom workflows."
        path="/contact-us"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://docgenius.ai/" },
              { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://docgenius.ai/contact-us" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact DocGenius & Book a Demo",
            description: "Get in touch with the DocGenius team to automate document generation across Salesforce.",
            url: "https://docgenius.ai/contact-us",
            mainEntity: {
              "@type": "Organization",
              name: "DocGenius (MV Clouds Private Limited)",
              email: "support-dg@mvclouds.com",
              telephone: "+91-9558019600",
              url: "https://docgenius.ai",
            },
          },
        ]}
      />

      <Header />

      <main className="flex-1 pt-24 md:pt-28 pb-16">
        {/* Background glow accents */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>Personalized 1-on-1 Walkthrough &amp; Free Trial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-foreground mb-6">
              Let&apos;s Build Better Documents <br className="hidden sm:inline" />
              with <span className="gradient-text">DocGenius</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Schedule a live demo to see how your team can generate proposals, contracts, invoices, and reports
              directly from Salesforce in seconds.
            </p>
          </motion.div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-20">
            {/* Left Column: Book Demo / Contact Form (Expanded Width) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 xl:col-span-7"
            >
              <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative">
                {/* Gradient Header Accent */}
                <div className="gradient-bg p-6 sm:p-8 md:p-9 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold mb-2">
                      <Clock size={12} />
                      Fast 24-Hour Scheduling
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Schedule Your Custom Demo
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base mt-1.5 max-w-xl">
                      Fill out the form below and an expert DocGenius solution architect will arrange a tailored session.
                    </p>
                  </div>
                </div>

                {/* Form Content or Success View */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-5"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 size={40} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold font-display text-foreground mb-2">
                        Demo Request Received!
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                        Thank you for your interest in DocGenius. Our solution team has received your information and will
                        reach out within <span className="font-semibold text-foreground">1-2 business days</span> with available
                        meeting times and trial setup links.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border/80 w-full max-w-md text-left text-xs text-muted-foreground space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <MessageSquare size={14} className="text-primary" />
                        Need immediate assistance?
                      </div>
                      <p>
                        You can also message us directly on WhatsApp at{" "}
                        <a
                          href="https://wa.me/919558019600"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline font-medium"
                        >
                          +91 9558019600
                        </a>{" "}
                        or email{" "}
                        <a
                          href="mailto:support-dg@mvclouds.com"
                          className="text-primary underline font-medium"
                        >
                          support-dg@mvclouds.com
                        </a>
                        .
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                      <Button variant="outline" onClick={handleReset}>
                        Submit Another Request
                      </Button>
                      <Button variant="hero" asChild>
                        <a href={CTA_LINKS.freeTrial} target="_blank" rel="noreferrer">
                          Try Free on AppExchange
                          <ExternalLink size={14} className="ml-1.5" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-7.5 space-y-5 sm:space-y-6">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-firstName" className="text-xs font-semibold text-foreground">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Jane"
                          className={`bg-background h-10 ${errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-lastName" className="text-xs font-semibold text-foreground">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          className={`bg-background h-10 ${errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
                          Work Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="jane@company.com"
                          className={`bg-background h-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-phone" className="text-xs font-semibold text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 555 000 0000"
                          className={`bg-background h-10 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Company & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-company" className="text-xs font-semibold text-foreground">
                          Company Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Acme Corporation"
                          className={`bg-background h-10 ${errors.company ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-country" className="text-xs font-semibold text-foreground">
                          Country / Region <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(v) => handleInputChange("country", v)}
                        >
                          <SelectTrigger
                            id="contact-country"
                            className={`bg-background h-10 ${errors.country ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="z-[9999] max-h-[220px]">
                            {countries.map((c) => (
                              <SelectItem key={c.code} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                      </div>
                    </div>

                    {/* Requirements Message */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
                          Document Requirements / Message
                        </Label>
                        <span className="text-[11px] text-muted-foreground">Optional</span>
                      </div>
                      <Textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about the documents you want to automate (quotes, NDAs, invoices, custom Salesforce objects, etc.)..."
                        rows={3}
                        className="bg-background resize-none"
                      />
                    </div>

                    {/* reCAPTCHA widget */}
                    <div className="pt-1">
                      <div ref={recaptchaRef} className="min-h-[78px]" />
                      {errors.captcha && (
                        <p className="text-xs text-destructive mt-1.5">{errors.captcha}</p>
                      )}
                    </div>

                    {/* Submit Button & Assurance */}
                    <div className="pt-2 space-y-3">
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        disabled={isSubmitting || !isFormValid}
                        className="w-full text-base font-semibold py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin mr-2" />
                            Submitting Your Request...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Request Live Demo
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <ShieldCheck size={14} className="text-secondary" />
                        <span>We respect your privacy. No spam. 100% confidential.</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Column: Product Information, Benefits & Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 xl:col-span-5 space-y-6 sm:space-y-8"
            >
              {/* What You Get in a Demo */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-3 flex items-center gap-2.5">
                  <Sparkles className="text-primary h-6 w-6 shrink-0" />
                  What to Expect in Your Demo
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  No generic slide decks. We tailor every session directly to your documents and Salesforce data models.
                </p>

                <ul className="space-y-3.5 text-sm text-foreground/90">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <strong className="block text-foreground font-semibold">Tailored Salesforce Schema Walkthrough</strong>
                      <span className="text-muted-foreground text-xs leading-relaxed">
                        See how DocGenius extracts data from your Standard and Custom Objects seamlessly.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <strong className="block text-foreground font-semibold">Dynamic Tables &amp; Merge Fields</strong>
                      <span className="text-muted-foreground text-xs leading-relaxed">
                        Watch how repeating line items, multi-tier tables, and conditional rules format instantly.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <strong className="block text-foreground font-semibold">1-Click Automation &amp; Batching</strong>
                      <span className="text-muted-foreground text-xs leading-relaxed">
                        Discover automated delivery via Salesforce Flows, and mass-generation.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Direct Contact Channels */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
                <h3 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                  <Building2 className="text-secondary h-5 w-5" />
                  Direct Contact &amp; Support
                </h3>

                <div className="space-y-3.5">
                  {/* Email */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support-dg@mvclouds.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/40 hover:bg-muted/70 transition-all border border-border/60 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground font-medium">Email our specialists</div>
                      <div className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        support-dg@mvclouds.com
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">Average response: &lt; 2 hours</div>
                    </div>
                  </a>

                  {/* Phone / WhatsApp */}
                  <a
                    href="https://wa.me/919558019600?text=Hello%2C%20I%E2%80%99m%20interested%20in%20Docgenius.%20Can%20we%20discuss%20further%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/40 hover:bg-muted/70 transition-all border border-border/60 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground font-medium">Call or WhatsApp us</div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        +91 9558019600
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">Mon–Fri • 9:00 AM – 7:00 PM IST</div>
                    </div>
                  </a>

                  {/* Office Locations */}
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <MapPin size={14} className="text-primary" />
                      Global Locations
                    </div>
                    <div className="text-xs text-foreground/80 space-y-2 leading-relaxed">
                      <div>
                        <strong className="text-foreground">India HQ:</strong> D-404, The First Synthesis, B/H Keshavbaug Party Plot, Ahmedabad, Gujarat - 380015
                      </div>
                      <div className="pt-1.5 border-t border-border/40">
                        <strong className="text-foreground">U.A.E.:</strong> Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3-Step Process / Journey */}
          <section className="mb-20 pt-8 border-t border-border/70">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
                How Our Demo Process Works
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Three simple steps from discovery to automating your entire document pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-card border border-border/80 rounded-2xl p-6 relative hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-display text-primary/40">
                      {step.step}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Highlights / Trust Grid */}
          <section className="bg-muted/30 border border-border/70 rounded-3xl p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
                Why Salesforce Teams Choose <span className="gradient-text">DocGenius</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Engineered for speed, compliance, and effortless template design.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-all space-y-3"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-bold font-display text-base text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
