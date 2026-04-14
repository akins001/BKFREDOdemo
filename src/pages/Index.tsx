import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Award, Star } from "lucide-react";
import heroImg from "@/assets/hero-showroom.jpg";
import doorsImg from "@/assets/doors-collection.jpg";
import tilesImg from "@/assets/tiles-collection.jpg";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "18+", label: "Years Experience" },
  { value: "1000+", label: "Happy Clients" },
  { value: "50+", label: "Premium Brands" },
];

const features = [
  { icon: Shield, title: "Quality Guaranteed", desc: "Every product meets rigorous quality standards." },
  { icon: Truck, title: "Fast Delivery", desc: "Prompt delivery and professional installation." },
  { icon: Award, title: "Expert Advice", desc: "Our team helps you choose the perfect fit." },
  { icon: Star, title: "Premium Brands", desc: "Authorized dealers of top global brands." },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <img src={heroImg} alt="Premium doors and tiles showroom" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="relative container-custom">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Premium Doors & Tiles</p>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-section-dark-foreground leading-tight mb-6">
            Transform Your <span className="text-gradient">Space</span> With Quality
          </h1>
          <p className="text-section-dark-foreground/80 text-lg mb-8 max-w-lg">
            Discover our curated collection of premium doors and tiles that bring elegance, durability, and style to every project.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="gradient-primary text-primary-foreground px-8 py-3.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              Our Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="border border-section-dark-foreground/30 text-section-dark-foreground px-8 py-3.5 rounded font-semibold text-sm hover:bg-section-dark-foreground/10 transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-primary">
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-heading font-extrabold text-primary-foreground">{s.value}</p>
              <p className="text-primary-foreground/70 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Products Overview */}
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Our Core Products</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { img: doorsImg, title: "Premium Doors", desc: "Interior, exterior, security, and decorative doors in wood, steel, fiberglass, and glass options.", link: "/services" },
            { img: tilesImg, title: "Quality Tiles", desc: "Ceramic, porcelain, marble, mosaic, and large-format tiles for floors, walls, and outdoor spaces.", link: "/services" },
          ].map((p) => (
            <Link to={p.link} key={p.title} className="group relative overflow-hidden rounded-lg card-hover">
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
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Why BuildCraft</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Built on Trust & Quality</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card p-6 rounded-lg card-hover text-center">
              <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-section-dark">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-section-dark-foreground mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-section-dark-foreground/70 mb-8 max-w-lg mx-auto">
          Visit our showroom or contact us today for expert advice and competitive pricing.
        </p>
        <Link to="/contact" className="gradient-primary text-primary-foreground px-10 py-4 rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          Contact Us <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
