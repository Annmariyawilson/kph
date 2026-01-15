import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

import Autoplay from "embla-carousel-autoplay"

import { Project, ProjectCard } from "@/components/ui/ProjectCard"

interface GalleryCarouselProps {
    projects: Project[]
}

export const GalleryCarousel = ({ projects }: GalleryCarouselProps) => {
    // Duplicate projects if there are few, to ensure seamless looping
    const displayProjects = projects.length > 0 && projects.length < 6
        ? [...projects, ...projects, ...projects]
        : projects;

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                    stopOnInteraction: false,
                }),
            ]}
            className="w-full"
        >
            <CarouselContent className="-ml-4 md:-ml-6">
                {displayProjects.map((project, index) => (
                    <CarouselItem key={`${project.id}-${index}`} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                        <ProjectCard project={project} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center lg:justify-end gap-2 mt-12 px-4">
                <CarouselPrevious className="static translate-y-0 w-14 h-14 rounded-none border border-slate-200 bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300" />
                <CarouselNext className="static translate-y-0 w-14 h-14 rounded-none border border-slate-200 bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300" />
            </div>
        </Carousel>
    )
}
