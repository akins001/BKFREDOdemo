import { User, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// TODO: Replace these placeholders with the real photos.
// Once you have the files, drop them into src/assets/ and import them, e.g.:
//   import managerImg from "@/assets/christopher-ogbaide.jpg";
//   import teamGroupImg from "@/assets/team-group.jpg";
//   import teamBehindScenesImg from "@/assets/team-behind-scenes.jpg";
// Then swap the `null` below for the imported variable.
const managerImg: string | null = null;
const teamGroupImg: string | null = null;
const teamBehindScenesImg: string | null = null;

const rosterStaff = [
  { name: "Jeremiah Osakpolor", role: "Sales Rep" },
  { name: "Kelechi Mgbekwe", role: "Sales Rep" },
  { name: "Happiness Belema", role: "Sales Rep" },
  { name: "Faith Friday", role: "Sales Rep" },
  { name: "Richard Ochoya", role: "Factory Supervisor" },
  { name: "Patrick", role: "Loader" },
  { name: "Wisdom Ejeh", role: "Loader" },
  { name: "John Onah", role: "Loader" },
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
                  className="w-full h-full object-cover"
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
                className="w-full h-full object-cover"
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

      {/* Behind the Scenes - secondary photo */}
      <ScrollReveal>
        <div className="max-w-md mx-auto text-center">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Behind the Scenes
          </p>
          <div className="rounded-lg overflow-hidden shadow-md border border-border aspect-[4/3] bg-muted flex items-center justify-center">
            {teamBehindScenesImg ? (
              <img
                src={teamBehindScenesImg}
                alt="The team at work"
                className="w-full h-full object-cover"
                loading="lazy"
                width={640}
                height={480}
              />
            ) : (
              <Users className="w-12 h-12 text-muted-foreground/40" />
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CoreStaff;
