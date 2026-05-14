import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from "@/assets/logo.png";

const PHONE_DISPLAY = "+234 806 536 1172";
const PHONE_TEL = "+2348065361172";
const EMAIL = "contact@bkfredo.com";
const ADDRESS =
  "23, Cook Road, Between Forestry & Mission Road, Benin City, Edo State, Nigeria.";

const Footer = () => (
  <footer className="bg-section-dark text-section-dark-foreground">
    <div className="container-custom section-padding">
      <div className="grid md:grid-cols-4 gap-10">

        {/* BRAND SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="B.K FRED O Building Construction logo"
              className="w-12 h-12 object-contain"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-heading font-bold">
              B.K FRED O<span className="text-primary">.</span>
            </h3>
          </div>

          <p className="text-section-dark-foreground/70 text-sm leading-relaxed mb-4">
            Premium Turkish doors and quality tiles for residential and commercial
            projects. Building excellence with every project.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/bbuildingconstructioncompanylt/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-white transition"
            >
              <FaPinterest />
            </a>

            {/* Facebook */}
            <a
              href="https://web.facebook.com/p/BK-Fred-O-Building-Construction-Company-100095204186934/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/b.k.fred.o/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-white transition"
            >
              <FaInstagram />
            </a>

            {/* X */}
            <a
              href="https://x.com/bkfredo1?t=3o58AO1uwOGzd_wqFxQSvg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-white transition"
            >
              <FaXTwitter />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@B.KFredo?si=F8gDI4xoexJIGXUW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-section-dark-foreground/10 hover:bg-primary hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">
            Quick Links
          </h4>
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

        {/* PRODUCTS */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">
            Products
          </h4>
          <div className="flex flex-col gap-2 text-sm text-section-dark-foreground/70">
            <span>Turkish Luxury Doors</span>
            <span>Floor Tiles</span>
            <span>Wall Tiles</span>
            <span>Non-Slip Tiles</span>
            <span>Door Accessories</span>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-primary">
            Contact
          </h4>

          <div className="flex flex-col gap-3 text-sm text-section-dark-foreground/70">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              {PHONE_DISPLAY}
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 hover:text-primary transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-primary" />
              {EMAIL}
            </a>

            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              {ADDRESS}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-section-dark-foreground/10 mt-10 pt-6 text-center text-sm text-section-dark-foreground/50">
        © {new Date().getFullYear()} esevee. All rights reserved.
      </div>
    </div>
    <a href="/admin" className="hover:text-accent">Admin</a>
  </footer>
);

export default Footer;
