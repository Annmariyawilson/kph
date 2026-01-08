import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Users,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Works Gallery", href: "/admin/works", icon: ImageIcon },
        { name: "Workers", href: "/admin/workers", icon: Users },
    ];

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error: any) {
            toast.error("Failed to logout");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-40 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <span className="font-bold text-lg">KPH Admin</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } w-64`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#D32F2F] rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">K</span>
                            </div>
                            <div>
                                <h1 className="font-black text-lg text-slate-900">KPH</h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${isActive
                                        ? "bg-[#D32F2F] text-white shadow-md shadow-red-100"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-slate-200">
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="w-full justify-start gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50 font-bold"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 pt-20 lg:pt-0 min-h-screen">
                <div className="p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
