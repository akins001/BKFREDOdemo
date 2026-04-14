import { CheckCircle } from "lucide-react";
import teamImg from "@/assets/about-team.jpg";

const values = [
  "Premium quality materials from trusted suppliers",
  "Expert craftsmanship and professional installation",
  "Personalized service tailored to your vision",
  "Competitive pricing with transparent quotes",
  "After-sales support and warranty coverage",
  "On-time delivery for every project",
];

const About = () => (
  <div>
    {/* Page Header */}
    <section className="bg-section-dark section-padding text-center">
      <div className="container-custom">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Who We Are</p>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">About BuildCraft</h1>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding bg-background">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Story</p>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Building Excellence Since 2005</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            BuildCraft was founded with a simple mission: to provide homeowners and contractors with the finest doors and tiles at competitive prices. Over nearly two decades, we've grown from a small local supplier into a trusted name across the region.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We partner with leading manufacturers worldwide to bring you a curated selection of products that combine aesthetic beauty with lasting durability. Our showroom features hundreds of options to inspire your next project.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src={teamImg} alt="BuildCraft team" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Promise</p>
          <h2 className="text-3xl font-heading font-bold text-foreground">Why Clients Trust Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {values.map((v) => (
            <div key={v} className="flex items-start gap-3 bg-card p-4 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
