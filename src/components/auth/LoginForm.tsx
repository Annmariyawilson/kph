import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            if (data.user) {
                toast.success("Login successful!");
                navigate("/admin/dashboard");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to login");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D32F2F] to-[#8B1E1E] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-100">
                        <span className="text-white font-black text-2xl">K</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                        Admin Login
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        Enter your credentials to access the admin panel
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black uppercase text-slate-400 tracking-wider">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@kph.com"
                                required
                                className="h-14 pl-12 rounded-xl border-slate-200 focus:border-[#D32F2F] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-black uppercase text-slate-400 tracking-wider">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                className="h-14 pl-12 rounded-xl border-slate-200 focus:border-[#D32F2F] transition-colors"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-gradient-to-r from-[#D32F2F] to-[#8B1E1E] hover:from-black hover:to-slate-800 text-white font-black rounded-xl shadow-lg shadow-red-100 transition-all uppercase tracking-wider"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Logging in...
                            </>
                        ) : (
                            "Login to Dashboard"
                        )}
                    </Button>
                </form>

                {/* Footer Note */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-center text-xs text-slate-400 font-medium">
                        Authorized personnel only. All activities are logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
