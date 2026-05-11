import { CheckCircle } from "lucide-react";
import teamImg from "@/assets/about-team.jpg";
import ceoImg from "@/assets/ceo-portrait.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  "Premium quality Turkish luxury doors and tiles",
  "Expert construction management and skilled teams",
  "Personalized support at every stage of your project",
  "Competitive pricing with transparent quotes",
  "Reliable delivery and professional installation",
  "Enduring value with durable, stylish materials",
];

const About = () => (
  <div>
    {/* Page Header */}
    <section className="bg-section-dark section-padding text-center">
      <div className="container-custom">
        <ScrollReveal>
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Who We Are</p>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">About B.K FRED O</h1>
        </ScrollReveal>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding bg-background">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="right">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Story</p>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Building Excellence</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            B.K FRED O Building Construction was founded with a simple mission: to provide homeowners and contractors with the finest Turkish doors and quality tiles. We have grown into a trusted name, turning architectural designs into reality with an acute focus on detail.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We offer premium home solutions, including Turkish doors and beautiful tiles, to bring your architectural and design vision to life. Our skilled construction management team ensures stylish and durable spaces for your dream home.
          </p>
        </ScrollReveal>
        <ScrollReveal direction="left" delay={0.15}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src={teamImg} alt="B.K FRED O team" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Meet Our CEO */}
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Leadership</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">Meet Our CEO</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <ScrollReveal direction="right">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={ceoImg} alt="Wilfred Osagie Osaro - CEO" className="w-full h-full object-cover" loading="lazy" width={768} height={1024} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.15}>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Wilfred Osagie Osaro</h3>
            <p className="text-primary font-semibold text-sm mb-6">CEO & Founder</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wilfred Osagie Osaro is the visionary leader behind B.K FRED O Building Construction. With an unwavering commitment to excellence, he has guided our team in turning architectural designs into reality with an acute focus on detail.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Under his guidance, we monitor every construction phase for a seamless and efficient process. No project is too big or small for us. Under his leadership, we have expanded our offerings with a diverse range of products, including premium Turkish luxury doors, door accessories, and tiles.
            </p>
            <div className="space-y-3">
              {["Premium Quality", "Reliability and Trust", "Enduring Value"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-background">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Promise</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">Why Clients Trust Us</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {values.map((v, i) => (
            <ScrollReveal key={v} delay={i * 0.08}>
              <div className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground text-sm">{v}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
