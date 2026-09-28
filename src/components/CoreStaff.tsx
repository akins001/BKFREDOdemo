import { User, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

import managerImg from "@/assets/manager.jpg";
import teamGroupImg from "@/assets/team.jpg";
import factoryImg from "@/assets/factory.jpg";
import salesImg from "@/assets/sales.jpg";

const rosterStaff = [
  { name: "Jeremiah Osakpolor", role: "Sales Rep" },
  { name: "Kelechi Mgbekwe", role: "Sales Rep" },
  { name: "Happiness Belema", role: "Sales Rep" },
  { name: "Faith Friday", role: "Sales Rep" },
  { name: "Richard Ochoya", role: "Factory Supervisor" },
  { name: "Patrick", role: "Loader" },
  { name: "Wisdom Ejeh", role: "Loader" },
  { name: "John Onah", role: "Loader" },
  { name: "Davies Eriano", role: "Factory Boy" },
];

const CoreStaff = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">
            Our Team
          </p>
          <h2 className="text-3xl font-heading font-bold text-foreground">
            Core Staff
          </h2>
        </div>
      </ScrollReveal>

      {/* Manager spotlight */}
      <ScrollReveal>
        <div className="max-w-4xl mx-auto mb-16 bg-card rounded-xl border-2 border-section-dark shadow-xl overflow-hidden card-hover">
          <div className="grid sm:grid-cols-2 items-stretch">
            <div className="aspect-[4/5] sm:aspect-auto bg-muted flex items-center justify-center overflow-hidden min-h-[280px]">
              {managerImg ? (
                <img
                  src={managerImg}
                  alt="Christopher Ogbaide - Manager"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  width={600}
                  height={750}
                />
              ) : (
                <User className="w-20 h-20 text-muted-foreground/40" />
              )}
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="inline-block w-fit text-xs font-semibold uppercase tracking-widest bg-section-dark text-section-dark-foreground px-3 py-1 rounded-full mb-4">
                Manager
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                Christopher Ogbaide
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Leading our core staff with hands-on attention to every project.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Meet the Team - full-width group photo */}
      <ScrollReveal>
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            Meet the Team
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-border aspect-video bg-muted flex items-center justify-center">
            {teamGroupImg ? (
              <img
                src={teamGroupImg}
                alt="B.K FRED O staff team in branded work uniforms"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={1280}
                height={720}
              />
            ) : (
              <Users className="w-16 h-16 text-muted-foreground/40" />
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-4 max-w-2xl mx-auto">
            Our dedicated team of sales reps, factory supervisors, and loaders — the people behind every delivery.
          </p>
        </div>
      </ScrollReveal>

      {/* Staff roster grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
        {rosterStaff.map((s, i) => (
          <ScrollReveal key={s.name} delay={i * 0.05}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-5 text-center card-hover">
              <h4 className="font-heading font-bold text-foreground">{s.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{s.role}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Factory Team + Sales Team - secondary photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
        {[
          { label: "Factory Team", src: factoryImg, alt: "B.K FRED O factory team at work" },
          { label: "Sales Team", src: salesImg, alt: "B.K FRED O sales team" },
        ].map((p, i) => (
          <ScrollReveal key={p.label} delay={i * 0.1}>
            <div className="text-center">
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                {p.label}
              </p>
              <div className="rounded-lg overflow-hidden shadow-md border border-border aspect-[4/3] bg-muted">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={480}
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CoreStaff;
