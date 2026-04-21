import { motion } from "framer-motion";

const PageLoader = () => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-section-dark"
    role="status"
    aria-label="Loading"
  >
    <div className="flex flex-col items-center gap-6">
      {/* Animated logo mark */}
      <div className="relative w-20 h-20">
        {/* Spinning ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        {/* Pulsing brand initials */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-heading font-extrabold text-xl tracking-tight text-section-dark-foreground">
            BK<span className="text-primary">.</span>
          </span>
        </motion.div>
      </div>

      {/* Wordmark */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-section-dark-foreground/60 text-xs tracking-[0.3em] uppercase"
      >
        B.K Fred O
      </motion.p>

      {/* Bouncing dots */}
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default PageLoader;
