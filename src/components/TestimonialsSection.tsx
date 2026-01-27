import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "DocGenius has transformed how we handle contracts. What used to take hours now takes seconds. The one-click generation is a game-changer!",
    author: "Sarah Johnson",
    role: "Sales Director",
    company: "TechCorp Solutions",
    rating: 5,
  },
  {
    quote: "The bulk document generation feature saved our HR team countless hours during onboarding season. Highly recommended for any Salesforce user.",
    author: "Michael Chen",
    role: "HR Manager",
    company: "Global Enterprises",
    rating: 5,
  },
  {
    quote: "Finally, a document generation tool that actually works seamlessly with Salesforce. The live preview feature ensures we never send out documents with errors.",
    author: "Emily Rodriguez",
    role: "Operations Lead",
    company: "FastTrack Logistics",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="reviews" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied Salesforce users
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div>
                <p className="font-semibold font-display">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
