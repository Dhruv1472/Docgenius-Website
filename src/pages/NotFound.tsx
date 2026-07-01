import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import NotFoundAnimation from "@/components/NotFoundAnimation";
import docGeniusLogo from "@/assets/docGeniusLogoSvg.svg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Page not found | DocGenius"
        description="The page you are looking for doesn't exist."
        path={location.pathname}
        robots="noindex, nofollow"
      />

      <section className="relative min-h-screen overflow-hidden bg-white text-gray-900">
        {/* Radial glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[hsl(195_65%_60%)]/20 blur-[100px]" />
          <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[hsl(168_57%_55%)]/15 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(195_65%_60%)]/10 blur-[120px]" />
        </div>

        {/* Shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ x: ["-140%", "140%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute left-0 top-[-30%] h-[160%] w-[55%] -rotate-12 blur-2xl"
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.15) 60%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20">
          <div className="grid w-full gap-12 lg:grid-cols-[0.95fr_1.05fr]">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Logo + badge */}
              <div className="flex items-center gap-4">
                <img
                  src={docGeniusLogo}
                  alt="DocGenius"
                  className="h-12 rounded-xl object-contain"
                />
                <span className="rounded-full border border-gray-300 bg-gray-100 px-2 py-1 mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-gray-500">
                  Page not found
                </span>
              </div>

              {/* Numbers + heading + body */}
              <div className="space-y-3">
                <p className="text-[clamp(4.5rem,12vw,9rem)] font-black leading-none tracking-tight text-gray-900/80">
                  404
                </p>
                <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-tight text-gray-900">
                  The page you are looking&nbsp;for is missing.
                </h1>
                <p className="text-sm text-gray-500 md:text-base">
                  The link may be outdated or mistyped. Return to the homepage
                  to explore DocGenius and see how it helps teams to create
                   and generate documents effortlessly.
                </p>
              </div>

              {/* CTA */}
              <div>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-800"
                >
                  Return to home
                </a>
              </div>

              {/* Requested path */}
              <p className="text-xs text-gray-400">
                Requested path:{" "}
                <span className="font-semibold text-gray-600">
                  {location.pathname}
                </span>
              </p>
            </motion.div>

            {/* Right — animation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              <NotFoundAnimation />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
