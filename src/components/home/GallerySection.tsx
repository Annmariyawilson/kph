import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface WorkImage {
    id: string;
    name: string;
    type: string;
    location: string;
    image_url: string;
}

const GallerySection = () => {
    const [images, setImages] = useState<WorkImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            // Fetch only published work images from database
            const { data, error } = await supabase
                .from('work_images')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching images:", error);
                return;
            }

            if (data) {
                setImages(data);
            }
        } catch (error) {
            console.error("Error in fetchImages:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (images.length === 0) {
        return null; // Don't show section if no images
    }

    return (
        <section id="gallery" className="section-padding bg-white">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase mb-2 block">
                        Our Work
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Recent Projects
                    </h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto">
                        Browse through our collection of recently completed painting projects across Edathua.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg cursor-pointer"
                        >
                            <img
                                src={image.image_url}
                                alt={image.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
                                <span className="text-white font-bold text-lg mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.name}
                                </span>
                                <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    <span className="text-white/80 text-sm font-medium">
                                        {image.location}
                                    </span>
                                    <span className="text-white/60 text-xs">•</span>
                                    <span className="text-white/80 text-sm font-medium">
                                        {image.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
