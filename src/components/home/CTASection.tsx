import ContactForm from "./ContactForm";

const CTASection = () => {
  return (
    <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ContactForm />


        </div>
      </div>
    </section>
  );
};

export default CTASection;
