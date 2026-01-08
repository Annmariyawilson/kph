import AdminLayout from "@/components/admin/AdminLayout";
import {
    Settings as SettingsIcon,
    Palette,
    Percent,
    Info,
    Quote,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
    const brands = [
        "Asian Paints", "Berger Paints", "Birla Opus", "JSW Paints",
        "Esdee Paints", "Indigo Paints", "Birla White", "Grass Hopper", "Sheenlac"
    ];

    return (
        <AdminLayout>
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                        Site <span className="text-primary italic">Settings</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Customize your brand identity and website content.</p>
                </div>

                <Button className="bg-primary hover:bg-black text-white font-bold rounded-xl px-10 py-6 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    SAVE CHANGES
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Brand & Pricing */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Brand Management */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-elegant">
                        <h2 className="text-xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                            <Palette className="w-6 h-6 text-primary" />
                            Brand Management
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {brands.map((brand) => (
                                <div key={brand} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                                    <span className="font-bold text-slate-700 text-sm">{brand}</span>
                                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & Discounts */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-elegant">
                        <h2 className="text-xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                            <Percent className="w-6 h-6 text-primary" />
                            Pricing & Discounts
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Current Discount (%)</label>
                                <div className="relative">
                                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <Input type="number" defaultValue="20" className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50 font-black text-lg focus:ring-primary" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Offer Label</label>
                                <Input defaultValue="Limited Time Offer" className="h-14 rounded-2xl border-slate-100 bg-slate-50 font-bold focus:ring-primary px-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: About & Testimonials */}
                <div className="flex flex-col gap-8">

                    {/* About KPH */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-elegant">
                        <h2 className="text-xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                            <Info className="w-6 h-6 text-primary" />
                            About Content
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2 mb-2 block">Tagline</label>
                                <Input defaultValue="Quality That Speaks" className="h-12 rounded-xl border-slate-100 bg-slate-50 font-bold" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2 mb-2 block">Main Description</label>
                                <Textarea
                                    className="min-h-[150px] rounded-2xl border-slate-100 bg-slate-50 font-medium text-sm leading-relaxed"
                                    defaultValue="Located in the heart of Edathua, we are your one-stop destination for all branded paint solutions..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Testimonial Placeholder */}
                    <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] group-hover:bg-primary/40 transition-all duration-500" />
                        <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3 relative z-10">
                            <Quote className="w-6 h-6 text-primary" />
                            Testimonials
                        </h2>
                        <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6">You have 12 published testimonials. Manage visibility and reviews here.</p>
                        <Button className="w-full bg-white text-slate-900 font-bold py-6 rounded-xl hover:bg-primary hover:text-white transition-all uppercase text-[10px] tracking-widest">
                            Manage Reviews
                        </Button>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
