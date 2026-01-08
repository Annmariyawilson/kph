import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Testimonials for KPH
const sampleTestimonials = [
  {
    id: 1,
    name: "Thomas Joseph",
    location: "Edathua",
    rating: 5,
    message:
      "Tomychen’s Kalangara Paint House provided excellent service. They helped me choose the perfect shade for my new home. The quality of Asian Paints they supplied is top-notch. Highly professional and efficient.",
  },
  {
    id: 2,
    name: "Sarah Kurian",
    location: "Alappuzha",
    rating: 5,
    message:
      "Best pricing in the area! I saved significantly on my Berger Paints purchase. The staff is very knowledgeable and helpful. They recommended the perfect painting crew for our project.",
  },
  {
    id: 3,
    name: "Mathew Varghese",
    location: "Changanassery",
    rating: 5,
    message:
      "Highly professional and reliable. They are the authorized dealers for all major brands, so you can trust the authenticity of the products. Worth every rupee for the peace of mind.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel (always active for "move automatically")
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sampleTestimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleTestimonials.length);
  };

  const currentTestimonial = sampleTestimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="section-padding bg-accent/10 relative overflow-hidden border-t border-accent/5"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 rotate-180">
        <Quote className="w-24 h-24 text-primary" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block font-body text-sm font-bold text-primary uppercase tracking-widest mb-4">
            Customer Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Happy Homeowners
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Don't just take our word for it—hear from the families who've transformed their spaces with us.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elegant p-8 sm:p-12 relative">
            {/* Quote mark */}
            <div className="absolute -top-6 left-8 sm:left-12 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-soft">
              <Quote className="w-6 h-6 text-accent-foreground" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6 pt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < currentTestimonial.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted"
                    }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="font-body text-lg sm:text-xl text-foreground leading-relaxed mb-8">
              "{currentTestimonial.message}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-xl font-semibold text-primary">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {sampleTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid View (Returning to old design) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-16">
          {sampleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card/80 rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-foreground line-clamp-4 mb-4">
                "{testimonial.message}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-sm font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
