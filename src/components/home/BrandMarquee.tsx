import React from "react";

const BrandMarquee = () => {
    const brands = [
        { name: "Asian Paints", logo: "/icons/asian-paints.png" },
        { name: "Berger Paints", logo: "/icons/berger-paints-seeklogo.png" },
        { name: "Birla Opus", logo: "/icons/birla-opus-paints-seeklogo.png" },
        { name: "JSW Paints", logo: "/icons/jsw-paints-seeklogo.png" },
        { name: "Esdee Paints", logo: "/icons/esdee-paints-seeklogo.png" },
        { name: "Indigo Paints", logo: "/icons/indigo-paints-seeklogo.png" },
        { name: "Birla White", logo: "/icons/birla-white-seeklogo.png" },
        { name: "Grass Hopper", logo: "/icons/grass-hopper-paints.png" },
        { name: "Sheenlac Paints", logo: "/icons/sheenlac-whiteLogo.png" },
        { name: "MRF Vapocure", logo: "/icons/mrf-paints.png" },
        { name: "Maxel Paints", logo: "/icons/maxel-paints.png" },
    ];

    // Duplicate brands to create seamless loop
    const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className="py-8 bg-white overflow-hidden relative w-full">
            <div className="relative group/marquee w-full">
                <div className="flex whitespace-nowrap animate-marquee items-center relative py-2">
                    {marqueeBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex items-center justify-center px-10 md:px-16 transition-all duration-500 hover:scale-105"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                loading="lazy"
                                className="h-6 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            />
                            <span className="ml-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden md:inline-block">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandMarquee;
