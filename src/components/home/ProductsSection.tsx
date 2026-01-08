import { useState } from "react";
import { Button } from "@/components/ui/button";

// Sample paint products (will be replaced with Supabase data)
const sampleProducts = [
  {
    id: 1,
    title: "Royal Silk Finish",
    description: "Luxurious smooth finish for elegant interiors",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
    category: "Interior",
  },
  {
    id: 2,
    title: "Exterior Shield Pro",
    description: "Maximum protection against harsh weather",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Exterior",
  },
  {
    id: 3,
    title: "Eco Fresh",
    description: "Zero VOC, eco-friendly wall coating",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    category: "Interior",
  },
  {
    id: 4,
    title: "Wood Master",
    description: "Premium wood finish with UV protection",
    image: "https://images.unsplash.com/photo-1558171013-50da5d5b5a25?w=600&q=80",
    category: "Wood",
  },
  {
    id: 5,
    title: "Waterproof Expert",
    description: "Advanced waterproofing technology",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a4?w=600&q=80",
    category: "Specialty",
  },
  {
    id: 6,
    title: "Texture Art",
    description: "Designer textured finish for accent walls",
    image: "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=600&q=80",
    category: "Specialty",
  },
];

const categories = ["All", "Interior", "Exterior", "Wood", "Specialty"];

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? sampleProducts
    : sampleProducts.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block font-body text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Brands & Products
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Quality Paints from Trusted Brands
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            We bring you the best-in-class products for your dream project.
          </p>

          {/* Brand List */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 p-6 bg-card rounded-2xl shadow-soft border border-border">
            {["Asian Paints", "Berger Paints", "Birla Opus", "JSW Paints", "Esdee Paints", "Indigo Paints", "Birla White", "Grass Hopper"].map((brand) => (
              <span key={brand} className="font-heading font-medium text-primary border-r last:border-none border-border pr-6 last:pr-0">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.title} - ${product.description}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm font-body text-xs font-medium text-foreground">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group/btn">
                  View Details
                  <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
