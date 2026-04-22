import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

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
            href="tel:+234XXXXXXXX"
            className="gradient-primary text-primary-foreground px-5 py-2.5 rounded text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-section-dark-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-section-dark border-t border-section-dark pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-section-dark-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
