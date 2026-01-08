import { Store, Tag, Palette, CheckCircle, ShieldCheck } from "lucide-react";

const WhyUsSection = () => {
  const reasons = [
    {
      icon: Store,
      title: "Leading Brands",
      description:
        "All leading paint brands under one roof, providing you with the best choice for every surface.",
      color: "bg-paint-sky",
    },
    {
      icon: Tag,
      title: "Best Pricing",
      description:
        "Enjoy premium products at affordable rates with exclusive 10%–30% discounts on our range.",
      color: "bg-paint-sage",
    },
    {
      icon: Palette,
      title: "Expert Guidance",
      description:
        "Our specialized team provides professional advice for color and product selection tailored to your needs.",
      color: "bg-paint-blush",
    },
    {
      icon: CheckCircle,
      title: "Complete Solutions",
      description:
        "From waterproofing to wall care, we provide end-to-end solutions for all your painting requirements.",
      color: "bg-paint-slate",
    },
  ];

  return (
    <section id="why-us" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block font-body text-sm font-bold text-primary uppercase tracking-widest mb-4">
            Why Choose KPH
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted Dealer in Edathua
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Dedicated to providing authentic products and exceptional service to ensure your walls get the perfect finish that lasts.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${reason.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className="w-8 h-8 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>

              {/* Decorative number */}
              <div className="absolute top-4 right-4 font-heading text-6xl font-bold text-muted/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
