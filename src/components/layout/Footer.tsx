import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Linkedin, Building2, Ticket } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 border-t-2 border-primary relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top Section: Main Brand & CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                                KPH
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black tracking-tighter uppercase leading-none">The Paint House</span>
                                <span className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">Since 1995 • Edathua</span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter text-white uppercase leading-[0.9]">
                            Constructing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">Perfection</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-6">
                        <p className="text-slate-400 max-w-sm text-sm lg:text-right leading-relaxed font-medium border-l-2 lg:border-l-0 lg:border-r-2 border-primary/30 pl-6 lg:pl-0 lg:pr-6">
                            We are more than a paint shop. We are a legacy of color, quality, and community service in Kerala.
                        </p>
                        <a
                            href="tel:+914772212217"
                            className="group flex items-center gap-4 bg-white text-black px-8 py-5 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <span>Book Consultation</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-20" />

                {/* Middle Section: Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">

                    {/* Column 1: Contact */}
                    <div className="space-y-8">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <Phone className="w-3 h-3" /> Contact
                        </span>
                        <ul className="space-y-6">
                            {[
                                { label: "Main Office", val: "0477-2212444" },
                                { label: "Mobile", val: "+91 94461 94178" },
                                { label: "Support", val: "+91 81569 65090" },
                                { label: "Email", val: "kphpaints@gmail.com" },
                            ].map((item, i) => (
                                <li key={i} className="group">
                                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</span>
                                    {item.label === "Email" ? (
                                        <a href={`mailto:${item.val}`} className="text-lg font-heading font-bold text-white group-hover:text-primary transition-colors cursor-pointer">{item.val}</a>
                                    ) : (
                                        <a href={`tel:${item.val.replace(/[^0-9+]/g, '')}`} className="text-lg font-heading font-bold text-white group-hover:text-primary transition-colors cursor-pointer">{item.val}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="space-y-8">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <Ticket className="w-3 h-3" /> Explore
                        </span>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "#hero" },
                                { name: "About Brand", href: "#about" },
                                { name: "Our Services", href: "#services" },
                                { name: "Project Gallery", href: "#gallery" },
                                { name: "Contact Us", href: "#contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="text-sm font-bold text-slate-400 hover:text-white hover:text-base transition-all flex items-center gap-2 group cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-primary transition-colors" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Hours */}
                    <div className="space-y-8">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <Building2 className="w-3 h-3" /> Visit Us
                        </span>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                St. George Shopping Complex,<br />
                                Edathua, Kerala 689573
                            </p>
                            <div className="p-4 bg-white/5 border border-white/10 animate-pulse">
                                <span className="block text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Opening Hours</span>
                                <span className="text-white font-bold text-sm">Mon - Sat: 9:00 AM - 7:30 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Map/Social */}
                    <div className="space-y-8">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Location
                        </span>
                        <div className="w-full h-40 bg-slate-900 border border-white/10 relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15752.484967332568!2d76.4716773!3d9.3752535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b089c10bd083819%3A0xc3f7a177b94101e4!2sEdathua%2C%20Kerala!5e0!3m2!1sen!2sin!4v1710925234567!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute top-2 right-2 bg-white text-black p-1.5">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Kalangara Paint House
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">System Operational</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
