import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: object) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaSettings, setCaptchaSettings] = useState(getCaptchaSettingsValue());
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timestampInterval = setInterval(() => {
      const response = document.getElementById("g-recaptcha-response") as HTMLTextAreaElement | null;
      if (!response || response.value.trim() === "") {
        setCaptchaSettings(getCaptchaSettingsValue());
      }
    }, 500);

    const tryRender = () => {
      if (recaptchaRef.current && window.grecaptcha?.render && recaptchaWidgetId.current === null) {
        recaptchaRef.current.innerHTML = "";
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: SALESFORCE_RECAPTCHA_SITE_KEY,
          callback: (token: string) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(""),
        });
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
  }, [isOpen]);

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
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (formData.phone) {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (!/^[\d+\-\s()]+$/.test(formData.phone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.phone = "Please enter a valid phone number (7 to 15 digits)";
      }
    }
    if (!recaptchaToken) {
      newErrors.captcha = "Please complete the reCAPTCHA verification.";
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
      const iframeId = "salesforce_submit_iframe";
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

      const countryCode = countries.find(c => c.name === formData.country)?.code || formData.country;

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
        lead_source: "DocGenius Website",
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
        title: "Success",
        description: "Your demo request has been sent successfully.",
      });
    } catch (err) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData(initialForm);
    setErrors({});
    setRecaptchaToken("");
    if (recaptchaWidgetId.current !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.current);
      recaptchaWidgetId.current = null;
    }
    onClose();
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
    <Dialog open={isOpen} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[672px] max-w-[calc(100vw-2rem)] max-h-[90vh] flex flex-col fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 border-0 p-0 rounded-2xl shadow-2xl duration-500 ease-in-out z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-bottom-full data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-bottom-full data-[state=closed]:slide-out-to-right-full [&>button]:text-white [&>button]:opacity-80 [&>button]:rounded-full [&>button]:w-8 [&>button]:h-8 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-white/10 [&>button]:backdrop-blur-sm [&>button]:transition-all [&>button]:duration-200 [&>button:hover]:opacity-100 [&>button:hover]:bg-white/25 [&>button:hover]:scale-110 [&>button:hover]:rotate-90"
      >
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-4 text-center"
          >
            <CheckCircle2 size={56} className="text-primary" />
            <DialogTitle className="text-2xl font-heading font-bold text-foreground">
              Request Received!
            </DialogTitle>
            <p className="text-muted-foreground max-w-sm">
              Thank you for your interest in DocGenius. Our team will reach
              out to you within 1-2 business days.
            </p>
            <Button className="mt-4 z-20" onClick={handleClose}>
              Close
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <DialogHeader className="shrink-0 mb-0 p-6 pb-4 gradient-bg rounded-t-[10px] relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <DialogTitle className="text-2xl md:text-3xl font-heading font-bold text-white relative z-10">
                Book a Demo
              </DialogTitle>
              <DialogDescription className="text-white/90 mt-2 relative z-10">
                See DocGenius in action. Fill out the form and we'll be in touch.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 p-6 scrollbar-hide">
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Jane"
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Smith"
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="jane@company.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 555 000 0000"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company <span className="text-destructive">*</span></Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Acme Inc."
                      className={errors.company ? "border-destructive" : ""}
                    />
                    {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>
                    <Select
                      value={formData.country}
                      onValueChange={(v) => handleInputChange("country", v)}
                    >
                      <SelectTrigger className={errors.country ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999] max-h-[200px]">
                        {countries.map((c) => (
                          <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your requirements..."
                    rows={3}
                  />
                </div>
                <div ref={recaptchaRef} className="mt-2" />
                {errors.captcha && <p className="text-xs text-destructive">{errors.captcha}</p>}
              </div>

              <div className="shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border bg-background rounded-b-2xl">
                <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={isSubmitting || !isFormValid} className="min-w-[140px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoModal;
