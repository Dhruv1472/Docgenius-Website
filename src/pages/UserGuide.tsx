import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const UserGuide = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container-narrow mx-auto px-4">
          {/* Hero heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Docgenius User Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know to get started and make the most of DocGenius.
            </p>
          </motion.div>

          {/* PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full rounded-2xl overflow-hidden border border-border shadow-lg"
            style={{'display':'flex', 'justifyContent': 'center','maxWidth':'53rem','margin':'0 auto'}}
          >
            <iframe
              src="/Docgenius_User_Guide.pdf#toolbar=0&navpanes=0&scrollbar=0"
              title="DocGenius User Guide"
              className="w-full"
              style={{ height: "85vh", minHeight: "600px" }}
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserGuide;
