import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { User } from "lucide-react";

type StaffRow = {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
};

const CoreStaff = () => {
  const [staff, setStaff] = useState<StaffRow[]>([]);

  useEffect(() => {
    supabase
      .from("staff_members" as any)
      .select("id,name,position,image_url,sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setStaff(data as unknown as StaffRow[]);
      });
  }, []);

  if (staff.length === 0) return null;

  return (
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {staff.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.05}>
              <div className="bg-card rounded-lg border border-border overflow-hidden card-hover">
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {s.image_url ? (
                    <img
                      src={s.image_url}
                      alt={`${s.name} - ${s.position}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading font-bold text-foreground text-base">
                    {s.name}
                  </h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">
                    {s.position}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreStaff;
