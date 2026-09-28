import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";

const WHATSAPP_NUMBER = "2348065361172";

const contactInfo = [
  { icon: Phone, label: "Call Us", value: "+234 806 536 1172", href: "tel:+2348065361172" },
  { icon: Mail, label: "Email Us", value: "contact@bkfredo.com", href: "mailto:contact@bkfredo.com" },
  { icon: MapPin, label: "Our Address", value: "23, Cook Road, Between Forestry & Mission Road, Benin City, Edo State, Nigeria." },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8am–6pm" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello B.K FRED O, I'd like to make an enquiry.",
      "",
      `Name: ${form.name}`,
      form.email ? `Email: ${form.email}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      "",
      `Message: ${form.message}`,
    ].filter((l, i, a) => l !== "" || (i > 0 && a[i - 1] !== ""));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast({ title: "Opening WhatsApp…", description: "Press send in WhatsApp to deliver your message." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <section className="bg-section-dark section-padding text-center">
        <div className="container-custom">
          <ScrollReveal>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-section-dark-foreground">Contact Us</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom grid md:grid-cols-2 gap-12">
          <ScrollReveal direction="right">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Let's Discuss Your Project</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're renovating, building a new home, or looking for premium Turkish doors and quality tiles, our team is ready to help you bring your vision to life.
            </p>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-input rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your Name"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-input rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-input rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+234 806 536 1172"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-input rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button type="submit" className="w-full gradient-primary text-primary-foreground py-3.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity">
              Send via WhatsApp
            </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
