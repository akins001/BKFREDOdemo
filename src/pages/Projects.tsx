import bathroomImg from "@/assets/project-bathroom.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import officeImg from "@/assets/project-office.jpg";
import doorsImg from "@/assets/doors-collection.jpg";
import tilesImg from "@/assets/tiles-collection.jpg";
import heroImg from "@/assets/hero-showroom.jpg";

const projects = [
  { img: bathroomImg, title: "Luxury Bathroom Renovation", category: "Residential", desc: "Full tile installation with premium natural stone for a modern spa-like bathroom." },
  { img: kitchenImg, title: "Modern Kitchen Interior", category: "Residential", desc: "Floor tiles and custom wooden door installation for a contemporary kitchen design." },
  { img: officeImg, title: "Corporate Office Lobby", category: "Commercial", desc: "Large-format porcelain tiles and glass entrance doors for a professional office building." },
  { img: doorsImg, title: "Door Showroom Setup", category: "Commercial", desc: "Complete showroom display featuring our premium door collection across styles and finishes." },
  { img: tilesImg, title: "Tile Gallery Display", category: "Commercial", desc: "Curated tile gallery showcasing marble, porcelain, and decorative mosaic collections." },
  { img: heroImg, title: "Complete Showroom Design", category: "Commercial", desc: "Full interior fit-out of our flagship showroom combining doors and tiles displays." },
];

const Projects = () => (
  <div>
    <section className="bg-section-dark section-padding text-center">
      <div className="container-custom">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Work</p>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">Featured Projects</h1>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="group rounded-lg overflow-hidden bg-card border border-border card-hover">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
              </div>
              <div className="p-6">
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">{p.category}</span>
                <h3 className="text-lg font-heading font-bold text-foreground mt-1 mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Projects;
