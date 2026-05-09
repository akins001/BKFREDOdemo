import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const PHONE_DISPLAY = "+234 806 536 1172";
const PHONE_TEL = "+2348065361172";
const EMAIL = "contact@bkfredo.com";
const ADDRESS = "23, Cook Road, Between Forestry & Mission Road, Benin City, Edo State, Nigeria.";

const Footer = () => (
  <footer className="bg-section-dark text-section-dark-foreground">
    <div className="container-custom section-padding">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="B.K FRED O Building Construction logo" className="w-12 h-12 object-contain" width={48} height={48} />
            <h3 className="text-xl font-heading font-bold">
              B.K FRED O<span className="text-primary">.</span>
            </h3>
          </div>
          <p className="text-section-dark-foreground/70 text-sm leading-relaxed mb-4">
            Premium Turkish doors and quality tiles for residential and commercial projects. Building excellence with every project.
          </p>
          <a
            href="https://www.pinterest.com/bbuildingconstructioncompanylt/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="B.K FRED O on Pinterest"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.09 2.46 7.6 5.97 9.13-.08-.78-.16-1.97.03-2.82.18-.77 1.16-4.93 1.16-4.93s-.3-.6-.3-1.48c0-1.39.8-2.42 1.81-2.42.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.57 0-2.39-1.72-4.06-4.17-4.06-2.84 0-4.51 2.13-4.51 4.33 0 .86.33 1.78.74 2.28.08.1.09.18.07.28-.07.31-.24.99-.27 1.13-.04.18-.14.22-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.34-5.81 3.33 0 5.92 2.37 5.92 5.54 0 3.31-2.09 5.97-4.99 5.97-.97 0-1.89-.51-2.2-1.11l-.6 2.29c-.22.83-.8 1.86-1.19 2.49.9.28 1.85.43 2.84.43 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </a>
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
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary shrink-0" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary transition-colors break-all">
              <Mail className="w-4 h-4 text-primary shrink-0" /> {EMAIL}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {ADDRESS}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-section-dark-foreground/10 mt-10 pt-6 text-center text-sm text-section-dark-foreground/50">
        © {new Date().getFullYear()} esevee. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
