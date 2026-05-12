import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import galleryDoor from "@/assets/gallery-door1.jpg";
import galleryFloor from "@/assets/gallery-floor1.jpg";
import galleryWall from "@/assets/gallery-wall1.jpg";
import galleryNonslip from "@/assets/gallery-nonslip1.jpg";
import doorsImg from "@/assets/doors-collection.jpg";
import tilesImg from "@/assets/tiles-collection.jpg";
import bathroomImg from "@/assets/project-bathroom.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import officeImg from "@/assets/project-office.jpg";
import heroImg from "@/assets/hero-showroom.jpg";
import ScrollReveal from "@/components/ScrollReveal";

type Category = "All" | "Turkish Doors" | "Floor Tiles" | "Wall Tiles" | "Non-Slip Tiles";

const categories: Category[] = ["All", "Turkish Doors", "Floor Tiles", "Wall Tiles", "Non-Slip Tiles"];

type GalleryItem = { img: string; title: string; category: Category; desc?: string };

const baseGalleryItems: GalleryItem[] = [
  { img: galleryDoor, title: "Cast Door", category: "Turkish Doors" },
  { img: galleryFloor, title: "Floor Tile", category: "Floor Tiles", desc: "60x60" },
  { img: galleryWall, title: "Wall Tile", category: "Wall Tiles", desc: "30x60 Wall tiles" },
  { img: galleryNonslip, title: "Non-Slip Tile", category: "Non-Slip Tiles" },
  { img: doorsImg, title: "Turkish Luxury Door", category: "Turkish Doors" },
  { img: tilesImg, title: "Floor Tile", category: "Floor Tiles", desc: "40x40" },
  { img: bathroomImg, title: "Wall Tile", category: "Wall Tiles", desc: "Outdoor wall tiles" },
  { img: kitchenImg, title: "Non-Slip Tile", category: "Non-Slip Tiles", desc: "Spanish wooden tiles" },
  { img: officeImg, title: "Marble Glass Door", category: "Turkish Doors" },
  { img: heroImg, title: "Floor Tile", category: "Floor Tiles", desc: "Vitrified 40x40" },
  { img: galleryDoor, title: "Pivot Door with Smart Lock", category: "Turkish Doors" },
  { img: galleryFloor, title: "Floor Tile", category: "Floor Tiles", desc: "60x120" },
];

const Projects = () => {
  const [active, setActive] = useState<Category>("All");
  const [uploaded, setUploaded] = useState<GalleryItem[]>([]);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("title, category, description, image_url")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setUploaded(
            data.map((d) => ({
              img: d.image_url,
              title: d.title,
              category: d.category as Category,
              desc: d.description ?? undefined,
            })),
          );
        }
      });
  }, []);

  const galleryItems = [...uploaded, ...baseGalleryItems];

  const filtered = active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);

  return (
    <div>
      <section className="bg-section-dark section-padding text-center">
        <div className="container-custom">
          <ScrollReveal>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Gallery</p>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">Our Gallery</h1>
            <p className="text-section-dark-foreground/70 mt-4 max-w-2xl mx-auto">
              Unlock inspiration with our diverse collection of doors, accessories, and tiles. Elevate your spaces with timeless elegance and versatile designs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2.5 rounded text-sm font-semibold transition-all ${
                    active === cat
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-lg overflow-hidden bg-card border border-border card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={800} />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-section-dark-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-primary text-xs font-semibold tracking-widest uppercase">{item.category}</span>
                    <h3 className="text-sm font-heading font-bold text-foreground mt-1">{item.title}</h3>
                    {item.desc && <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pinterest Link */}
          <ScrollReveal>
            <div className="text-center mt-12">
              <a
                href="https://www.pinterest.com/bbuildingconstructioncompanylt/"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-primary text-primary-foreground px-8 py-3.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                See More on Pinterest <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Projects;
