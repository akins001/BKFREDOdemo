import { DoorOpen, Grid3X3, Paintbrush, Wrench, Ruler, Truck } from "lucide-react";

const services = [
  { icon: DoorOpen, title: "Door Sales", desc: "Wide range of interior, exterior, security, and decorative doors in wood, steel, fiberglass, and glass. We carry top brands for residential and commercial use." },
  { icon: Grid3X3, title: "Tile Sales", desc: "Ceramic, porcelain, marble, mosaic, and large-format tiles for every application. From kitchen backsplashes to grand foyer floors." },
  { icon: Wrench, title: "Installation Services", desc: "Professional door hanging and tile fitting by experienced craftsmen. We ensure a flawless finish every time." },
  { icon: Paintbrush, title: "Design Consultation", desc: "Our experts help you select the right materials, colors, and patterns to match your interior vision and architectural style." },
  { icon: Ruler, title: "Custom Orders", desc: "Need a specific size, finish, or design? We work with manufacturers to fulfill custom door and tile orders to your exact specifications." },
  { icon: Truck, title: "Delivery & Logistics", desc: "Reliable delivery to your project site with careful handling. We coordinate timing to match your construction schedule." },
];

const Services = () => (
  <div>
    <section className="bg-section-dark section-padding text-center">
      <div className="container-custom">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">What We Do</p>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">Our Services</h1>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-lg p-8 card-hover">
              <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center mb-5">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
