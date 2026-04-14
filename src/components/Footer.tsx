import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-section-dark text-section-dark-foreground">
    <div className="container-custom section-padding">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-heading font-bold mb-4">
            B.K FRED O<span className="text-primary">.</span>
          </h3>
          <p className="text-section-dark-foreground/70 text-sm leading-relaxed">
            Premium Turkish doors and quality tiles for residential and commercial projects. Building excellence with every project.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm text-section-dark-foreground/70 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">Products</h4>
          <div className="flex flex-col gap-2 text-sm text-section-dark-foreground/70">
            <span>Turkish Luxury Doors</span>
            <span>Floor Tiles</span>
            <span>Wall Tiles</span>
            <span>Non-Slip Tiles</span>
            <span>Door Accessories</span>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-section-dark-foreground/70">
            <a href="tel:+234XXXXXXXX" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" /> +234 XXX XXX XXXX
            </a>
            <a href="mailto:info@bkfredo.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" /> info@bkfredo.com
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" /> Benin City, Edo State, Nigeria
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-section-dark-foreground/10 mt-10 pt-6 text-center text-sm text-section-dark-foreground/50">
        © {new Date().getFullYear()} B.K FRED O Building Construction. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
