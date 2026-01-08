import { Droplets, Shield, Palette, Award } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Droplets,
      title: "Weather Resistant",
      description: "Engineered to withstand India's diverse climate conditions",
    },
    {
      icon: Shield,
      title: "Long-lasting",
      description: "Superior durability that keeps walls fresh for years",
    },
    {
      icon: Palette,
      title: "500+ Shades",
      description: "Curated palette designed for Indian aesthetics",
    },
    {
      icon: Award,
      title: "ISO Certified",
      description: "International quality standards you can trust",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-paint-sky blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-paint-sage blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block font-body text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Quality That Speaks
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Tomychen’s Kalangara Paint House
            </h2>
            <p className="font-body text-lg text-foreground/80 leading-relaxed mb-6">
              Located in the heart of Edathua, we are your one-stop destination for all branded paint solutions. We pride ourselves on being a trusted partner for homeowners and professionals alike.
            </p>
            <p className="font-body text-lg text-foreground/80 leading-relaxed mb-8 border-l-4 border-accent pl-6 py-2 bg-accent/5">
              "We don't just sell paint—we provide the protection and beauty your dream project deserves."
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-body font-bold text-primary hover:text-accent transition-colors group"
            >
              Get expert guidance today
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
