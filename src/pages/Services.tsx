import { DoorOpen, Grid3X3, HeartHandshake, SlidersHorizontal, Lock, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  { icon: DoorOpen, title: "Expertise in Construction", desc: "We bring our clients' visions to life with skilled teams and high-quality materials to create beautiful and functional spaces that exceed expectations." },
  { icon: Grid3X3, title: "Quality Tiles Collection", desc: "Discover a versatile range of tiles, from non-slip options ensuring safety, to exquisite wall tiles adding artistic flair, all designed for enduring style and durability." },
  { icon: SlidersHorizontal, title: "Different Kinds of Doors", desc: "Discover a diverse selection of doors and accessories, from elegant Turkish luxury doors to secure smart locks and stylish handles." },
  { icon: HeartHandshake, title: "Personalized Support", desc: "Experience exceptional service with our customer-centric approach. Our dedicated team is committed to guiding and assisting you at every stage, ensuring your complete satisfaction." },
];

const doorTypes = [
  { icon: DoorOpen, title: "Turkish Doors", desc: "Experience elegance and security with our exquisite Turkish luxury doors, blending traditional craftsmanship and modern design." },
  { icon: SlidersHorizontal, title: "Sliding Doors", desc: "Maximize space and aesthetics with sleek sliding doors, perfect for seamless room transitions." },
  { icon: Lock, title: "Door Locks & Security", desc: "Ensure safety with our range of door locks and security solutions, offering peace of mind for your space." },
  { icon: CircleDot, title: "Door Handles & Knobs", desc: "Enhance your doors with a variety of stylish handles and knobs, adding both functionality and aesthetics." },
];

const Services = () => (
  <div>
    <section className="bg-section-dark section-padding text-center">
      <div className="container-custom">
        <ScrollReveal>
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">Our Services</h1>
          <p className="text-section-dark-foreground/70 mt-4 max-w-2xl mx-auto">
            We construct buildings of all sizes and types using top-quality Turkish luxury doors and tiles. Let's bring your dream project to life!
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-8 card-hover h-full">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center mb-5">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Door Types */}
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Door Collection</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Different Kinds of Doors & Accessories</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorTypes.map((d, i) => (
            <ScrollReveal key={d.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6 card-hover text-center h-full">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <d.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-section-dark text-center">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="text-3xl font-heading font-bold text-section-dark-foreground mb-4">
            Let Us Bring Your Vision to Life
          </h2>
          <p className="text-section-dark-foreground/70 mb-8 max-w-lg mx-auto">
            Thank you for choosing us as your partner. Contact us today to discuss your project!
          </p>
          <Link to="/contact" className="gradient-primary text-primary-foreground px-10 py-4 rounded font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Services;
