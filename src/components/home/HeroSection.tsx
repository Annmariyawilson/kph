import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/asianpaints.png",
      title: "Asian Paints Royale",
      brand: "Asian Paints"
    },
    {
      image: "/images/berger-paint.png",
      title: "Berger Premium",
      brand: "Berger Paints"
    },
    {
      image: "/images/indigo-paints.png",
      title: "Indigo Gloss",
      brand: "Indigo Paints"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col lg:flex-row items-center overflow-hidden bg-white pt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">

        {/* Left Column: Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {slides[currentSlide].brand}
          </div>

          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.9] tracking-tighter mb-8 uppercase">
            Transform <br />
            <span className="text-primary">Your World</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-foreground/70 max-w-lg mb-10 leading-tight">
            Authorized dealers for Asian Paints, Berger & JSW. Premium solutions for Edathua's finest homes.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="xl"
              className="bg-primary hover:bg-black text-white font-bold px-10 rounded-none shadow-none transition-all duration-300 transform hover:skew-x-2"
            >
              EXPLORE BRANDS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="mt-12 text-xs font-medium text-foreground/40 max-w-sm">
            Providing lasting finishes and protection for generations. Trusted by over 5000+ homeowners in Edathua since 1995.
          </div>
        </div>

        {/* Right Column: Carousel Visual */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">

          {/* Carousel Images */}
          <div className="relative z-20 w-[70%] lg:w-[85%] h-[500px] flex items-center justify-center pointer-events-none">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-[5s] ease-in-out transform ${index === currentSlide
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-90 translate-x-10"
                  } drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500 overflow-hidden rounded-[20%]`}
                style={{
                  transform: index === currentSlide
                    ? `perspective(1000px) rotateY(${mousePos.x * 0.2}deg) rotateX(${mousePos.y * -0.2}deg)`
                    : 'none',
                  transition: 'transform 1s ease-out, opacity 3s ease-in-out'
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto max-h-[450px] object-contain relative z-10"
                />
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-[10%] right-[5%] z-30 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-all border-2 ${i === currentSlide
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-foreground/10 text-foreground/50 hover:border-primary hover:text-primary"
                  }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
