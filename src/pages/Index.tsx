import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Award, Star, Quote, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroImg from "@/assets/hero-showroom.jpg";
import doorsImg from "@/assets/doors-collection.jpg";
import tilesImg from "@/assets/tiles-collection.jpg";
import galleryDoor from "@/assets/gallery-door1.jpg";
import galleryFloor from "@/assets/gallery-floor1.jpg";
import galleryWall from "@/assets/gallery-wall1.jpg";
import galleryNonslip from "@/assets/gallery-nonslip1.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "1000+", label: "Happy Clients" },
  { value: "50+", label: "Premium Brands" },
];

const collection = [
  { img: galleryDoor, title: "Turkish Doors", desc: "Discover the perfect fusion of elegance and security with our Turkish luxury doors. Combining exquisite craftsmanship with robust design, these doors provide both style and peace of mind for your space." },
  { img: galleryFloor, title: "Floor Tiles", desc: "Explore a world of tile aesthetics, from Spanish charm to Nigerian allure. Our collection embraces diverse styles, transforming spaces with quality and cultural elegance." },
  { img: galleryWall, title: "Wall Tiles", desc: "Elevate your walls with our captivating wall tiles. Choose from a stunning array of designs, textures, and colors to create a backdrop that resonates with your style." },
  { img: galleryNonslip, title: "Non-Slip Floor Tiles", desc: "Step confidently into safety and style with our non-slip tiles. Crafted for durability and aesthetics, these tiles ensure secure footing while enhancing your space's allure." },
];

const features = [
  { icon: Shield, title: "Premium Quality", desc: "Every product meets rigorous quality standards with top-grade materials." },
  { icon: Award, title: "Reliability & Trust", desc: "We deliver on our promises with consistent quality and service." },
  { icon: Star, title: "Enduring Value", desc: "Products built to last, ensuring long-term beauty and durability." },
  { icon: Truck, title: "Fast Delivery", desc: "Prompt delivery and professional support for every order." },
];

const testimonials = [
  { name: "Ahmed", text: "My friend sent me to these door and tiles experts, and I'm glad he did! The doors I got are really nice, just like he said. Big thanks to him and the shop for helping me out!" },
  { name: "Uju", text: "I'm beyond thrilled with the doors and tiles I got from here. They've transformed my place and the service was top-notch. I'll definitely be sending my friends your way for their projects!" },
  { name: "Efosa", text: "Choosing their Turkish doors was the best decision I made for my home renovation. The quality is unmatched and I was equally impressed by their exceptional customer service." },
  { name: "Adesuwa", text: "I got these awesome tiles for my new house, and they made everything look super classy. The staffs at the shop were amazing, making it all easy. Totally recommend them!" },
  { name: "Emma", text: "These doors are amazing! My house looks great. The folks at the shop are really helpful, they made sure I chose the right ones that match. I'm really happy with the doors and their service!" },
];

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.img
          src={heroImg}
          alt="B.K FRED O premium doors and tiles"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          width={1920}
          height={1080}
          style={{ y: heroY }}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <motion.div className="relative container-custom text-center" style={{ opacity: heroOpacity }}>
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-section-dark-foreground leading-tight mb-6">
              Welcome to <span className="text-gradient">B.K FRED O</span> Building Construction
            </h1>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <p className="text-section-dark-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              We offer premium home solutions, including Turkish doors and beautiful tiles, to bring your architectural and design vision to life. Our skilled construction management team ensures stylish and durable spaces for your dream home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services" className="gradient-primary text-primary-foreground px-8 py-3.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="border border-primary text-primary px-8 py-3.5 rounded font-semibold text-sm hover:bg-primary/10 transition-colors">
                Contact Us
              </Link>
            </div>
            {/* Mobile-only Visit Blog button */}
            <div className="md:hidden mt-4 flex justify-center">
              <a
                href="https://bkfredo.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-section-dark-foreground/10 backdrop-blur-sm border border-primary/40 text-section-dark-foreground px-8 py-3 rounded font-semibold text-sm hover:bg-primary/20 hover:border-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Visit Our Blog
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-heading font-extrabold text-primary-foreground">{s.value}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Collection */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">What We Offer</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Our Collection</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our collection spans a diverse range, featuring exquisite Turkish luxury doors, non-slip floor and wall tiles, and an array of premium-quality materials.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="group bg-card border border-border rounded-lg overflow-hidden card-hover h-full">
                  <div className="overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={800} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: doorsImg, title: "Turkish Luxury Doors", desc: "Experience elegance and security with our exquisite Turkish luxury doors, blending traditional craftsmanship and modern design.", link: "/services" },
              { img: tilesImg, title: "Premium Tiles Collection", desc: "From Spanish charm to Nigerian allure, our diverse tile collection transforms spaces with quality and cultural elegance.", link: "/services" },
            ].map((p, i) => (
              <ScrollReveal key={p.title} direction={i === 0 ? "right" : "left"} delay={i * 0.1}>
                <Link to={p.link} className="group relative overflow-hidden rounded-lg card-hover block">
                  <img src={p.img} alt={p.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                  <div className="absolute inset-0 bg-foreground/50 group-hover:bg-foreground/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-heading font-bold text-section-dark-foreground mb-2">{p.title}</h3>
                    <p className="text-section-dark-foreground/80 text-sm">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">We Offer You</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-lg card-hover text-center border border-border h-full">
                  <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-section-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-section-dark-foreground">
                Feedback from Our Valued Customers
              </h2>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-section-dark-foreground/80 text-lg leading-relaxed mb-8 italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <p className="text-primary font-heading font-bold text-xl">{testimonials[activeTestimonial].name}</p>
                <p className="text-section-dark-foreground/50 text-sm">Client</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${i === activeTestimonial ? "bg-primary" : "bg-section-dark-foreground/30"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let us bring your vision to life. Contact us today for premium Turkish doors, quality tiles, and expert construction services.
            </p>
            <Link to="/contact" className="gradient-primary text-primary-foreground px-10 py-4 rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
