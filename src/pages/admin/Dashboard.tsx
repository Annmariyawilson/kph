import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
    Users,
    MessageSquare,
    Image as ImageIcon,
    Plus,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        workers: 0,
        workImages: 0,
        enquiries: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);

            // Fetch workers count
            const { count: workersCount, error: workersError } = await supabase
                .from('workers')
                .select('*', { count: 'exact', head: true });

            if (workersError) throw workersError;

            // Fetch work images count
            const { count: imagesCount, error: imagesError } = await supabase
                .from('work_images')
                .select('*', { count: 'exact', head: true });

            if (imagesError) throw imagesError;

            // Fetch enquiries count
            const { count: enquiriesCount, error: enquiriesError } = await supabase
                .from('enquiries')
                .select('*', { count: 'exact', head: true });

            if (enquiriesError) throw enquiriesError;

            setStats({
                workers: workersCount || 0,
                workImages: imagesCount || 0,
                enquiries: enquiriesCount || 0
            });
        } catch (error: any) {
            toast.error("Failed to fetch dashboard stats");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const statsData = [
        { label: "Total Workers", value: stats.workers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Work Images", value: stats.workImages, icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Total Enquiries", value: stats.enquiries, icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 mb-1">
                    Dashboard
                </h1>
                <p className="text-slate-400 text-sm font-medium">Overview of your paint house management system.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D32F2F]" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        {statsData.map((stat) => (
                            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 leading-none mb-2">{stat.value}</span>
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Add Work Image Card */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-10 rounded-[40px] shadow-xl relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                    <ImageIcon className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black uppercase mb-3 tracking-tight">Manage Work Images</h2>
                                <p className="text-purple-100 text-sm font-medium leading-relaxed mb-8 max-w-[280px]">
                                    Upload and manage your completed painting project images.
                                </p>
                                <Button asChild className="bg-white hover:bg-purple-50 text-purple-700 font-black py-6 px-8 rounded-xl transition-all uppercase text-[10px] tracking-widest shadow-lg">
                                    <Link to="/admin/works" className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Work Image
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Add Worker Card */}
                        <div className="bg-gradient-to-br from-[#D32F2F] to-[#8B1E1E] p-10 rounded-[40px] shadow-xl relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                    <Users className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black uppercase mb-3 tracking-tight">Manage Workers</h2>
                                <p className="text-red-100 text-sm font-medium leading-relaxed mb-8 max-w-[280px]">
                                    Add, edit, and manage your painting staff details.
                                </p>
                                <Button asChild className="bg-white hover:bg-red-50 text-[#D32F2F] font-black py-6 px-8 rounded-xl transition-all uppercase text-[10px] tracking-widest shadow-lg">
                                    <Link to="/admin/workers" className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Worker
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default Dashboard;
