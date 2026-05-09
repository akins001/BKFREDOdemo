import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, BookOpen } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "SERVICES", path: "/services" },
  { label: "PROJECTS", path: "/projects" },
  { label: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-section-dark/95 backdrop-blur-md border-b border-section-dark">
      <div className="container-custom flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
        <Link to="/" className="font-heading font-bold text-xl md:text-2xl text-section-dark-foreground tracking-wider">
          B.K FRED O<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-section-dark-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://bkfredo.com.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide text-section-dark-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            BLOG
          </a>
          <a
            href="tel:+2348065361172"
            className="gradient-primary text-primary-foreground px-5 py-2.5 rounded text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>

        {/* Mobile toggle - animated hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-section-dark-foreground rounded hover:bg-section-dark-foreground/5 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block w-6 h-5">
            <motion.span
              className="absolute left-0 right-0 h-[2px] bg-current rounded-full"
              style={{ top: 0 }}
              animate={open ? { top: "50%", rotate: 45, y: "-50%" } : { top: 0, rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="absolute left-0 right-0 top-1/2 h-[2px] bg-current rounded-full"
              style={{ y: "-50%" }}
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute left-0 right-0 h-[2px] bg-current rounded-full"
              style={{ bottom: 0 }}
              animate={open ? { bottom: "50%", rotate: -45, y: "50%" } : { bottom: 0, rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-section-dark border-t border-section-dark overflow-hidden"
          >
            <div className="pb-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block px-6 py-3 text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.path ? "text-primary" : "text-section-dark-foreground/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://bkfredo.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navItems.length * 0.04, duration: 0.25, ease: "easeOut" }}
                className="px-6 py-3 text-sm font-medium text-section-dark-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                BLOG
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
