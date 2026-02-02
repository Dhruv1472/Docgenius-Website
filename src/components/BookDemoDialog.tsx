import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sendDemoRequest } from "@/utils/emailService";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
  "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark",
  "Egypt", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India",
  "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia",
  "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Other",
  "Pakistan", "Philippines", "Poland", "Portugal", "Romania", "Saudi Arabia",
  "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Taiwan", "Thailand", "Turkey", "United Arab Emirates",
  "United Kingdom", "United States", "Vietnam"
];

const companyStrengths = [
  "1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"
];

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [captchaNumbers] = useState({
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1,
  });

  // Ensure portal target exists (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Manage body overflow when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    company: "",
    companyStrength: "",
    country: "",
    phone: "",
    message: "",
  });

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
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
    if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.country) newErrors.country = "Country is required";
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    const correctAnswer = captchaNumbers.a + captchaNumbers.b;
    if (!captchaAnswer || parseInt(captchaAnswer) !== correctAnswer) {
      newErrors.captcha = "Captcha answer is incorrect";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email silently in background
      const success = await sendDemoRequest(formData);

      if (success) {
        toast({
          title: "Thank You!",
          description: "Your demo request has been received. We will contact you soon.",
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          jobTitle: "",
          company: "",
          companyStrength: "",
          country: "",
          phone: "",
          message: "",
        });
        setCaptchaAnswer("");
        setErrors({});
        
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to send demo request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending demo request:", error);
      toast({
        title: "Error",
        description: "Failed to send demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (full viewport) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-[2px]"
          />

          {/* Modal (true viewport bottom-right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 24, y: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: 24, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 z-[9999] max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="gradient-bg p-4 text-primary-foreground relatfive overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors group z-50 cursor-pointer"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <h2 className="text-2xl md:text-3xl font-display font-bold relative z-10">
                Book a Demo
              </h2>
              <p className="text-primary-foreground/80 mt-2 relative z-10">
                See DocGenius in action. Fill out the form and we'll be in touch.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 scrollbar-hide">
              <style>{`
                html, body {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }
                html::-webkit-scrollbar, body::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                body {
                  margin: 0;
                  padding: 0;
                }
              `}</style>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    className={`input-hover-effect ${errors.firstName ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    className={`input-hover-effect ${errors.lastName ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@company.com"
                    className={`input-hover-effect ${errors.email ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`input-hover-effect ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Acme Inc."
                    className={`input-hover-effect ${errors.company ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleInputChange("country", value)}
                  >
                    <SelectTrigger className={`input-hover-effect ${errors.country ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999] max-h-[200px]">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Requirement Details / Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your document generation needs..."
                    className="min-h-[100px] input-hover-effect"
                  />
                </div>

                {/* Captcha */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="captcha" className="text-sm font-medium">
                    Verify you're human: What is {captchaNumbers.a} + {captchaNumbers.b}?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="captcha"
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Enter the answer"
                    className={`input-hover-effect max-w-[200px] ${errors.captcha ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.captcha && <p className="text-xs text-red-500">{errors.captcha}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="hover-lift"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  disabled={isSubmitting}
                  className="min-w-[140px] hover-lift"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!isMounted) return null;
  return createPortal(modal, document.body);
};
