import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Plus,
    Trash2,
    Edit,
    Loader2,
    User,
    Phone as PhoneIcon,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Worker {
    id: string;
    name: string;
    role: string;
    phone: string;
    status: string;
    created_at: string;
}

const WorkerTracking = () => {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        status: "Active"
    });

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('workers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setWorkers(data || []);
        } catch (error: any) {
            toast.error("Failed to fetch workers");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);

            if (editingWorker) {
                // Update existing worker
                const { error } = await supabase
                    .from('workers')
                    .update({
                        name: formData.name,
                        role: formData.role,
                        phone: formData.phone,
                        status: formData.status,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', editingWorker.id);

                if (error) throw error;
                toast.success("Worker updated successfully!");
            } else {
                // Create new worker
                const { error } = await supabase
                    .from('workers')
                    .insert([{
                        name: formData.name,
                        role: formData.role,
                        phone: formData.phone,
                        status: formData.status
                    }]);

                if (error) throw error;
                toast.success("Worker added successfully!");
            }

            // Reset form and close dialog
            resetForm();
            setDialogOpen(false);
            fetchWorkers();
        } catch (error: any) {
            toast.error(error.message || "Failed to save worker");
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (worker: Worker) => {
        if (!confirm(`Are you sure you want to delete ${worker.name}?`)) return;

        try {
            const { error } = await supabase
                .from('workers')
                .delete()
                .eq('id', worker.id);

            if (error) throw error;

            toast.success("Worker deleted successfully!");
            fetchWorkers();
        } catch (error: any) {
            toast.error("Failed to delete worker");
            console.error(error);
        }
    };

    const handleEdit = (worker: Worker) => {
        setEditingWorker(worker);
        setFormData({
            name: worker.name,
            role: worker.role,
            phone: worker.phone,
            status: worker.status
        });
        setDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: "", role: "", phone: "", status: "Active" });
        setEditingWorker(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-50 text-emerald-600";
            case "Inactive": return "bg-slate-100 text-slate-400";
            default: return "bg-slate-100 text-slate-500";
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">Worker Management</h1>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Manage your painting staff details.</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#D32F2F] hover:bg-black text-white font-bold rounded-xl px-6 sm:px-8 py-5 sm:py-6 shadow-md shadow-red-100 transition-all flex items-center gap-2 text-xs sm:text-sm">
                            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span className="hidden sm:inline">ADD NEW WORKER</span>
                            <span className="sm:hidden">ADD WORKER</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black">
                                {editingWorker ? "Edit Worker" : "Add New Worker"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-black uppercase text-slate-400">Full Name</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Rajesh Kumar"
                                        required
                                        className="h-12 rounded-xl pl-10"
                                    />
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-xs font-black uppercase text-slate-400">Role</Label>
                                <div className="relative">
                                    <Input
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="Lead Painter"
                                        required
                                        className="h-12 rounded-xl pl-10"
                                    />
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-xs font-black uppercase text-slate-400">Phone Number</Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="9876543210"
                                        className="h-12 rounded-xl pl-10"
                                    />
                                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-black uppercase text-slate-400">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="submit"
                                disabled={saving}
                                className="w-full h-12 bg-[#D32F2F] hover:bg-black text-white font-bold rounded-xl"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        {editingWorker ? "Updating..." : "Adding..."}
                                    </>
                                ) : (
                                    editingWorker ? "Update Worker" : "Add Worker"
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D32F2F]" />
                </div>
            ) : (
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Name & Role</th>
                                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Phone</th>
                                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Status</th>
                                    <th className="text-right px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {workers.map((worker) => (
                                    <tr key={worker.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-600">
                                                    {worker.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900">{worker.name}</span>
                                                    <span className="text-xs text-slate-400 font-medium">{worker.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-slate-600 font-medium">{worker.phone || "—"}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusColor(worker.status)}`}>
                                                {worker.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleEdit(worker)}
                                                    className="hover:bg-blue-50 text-blue-600 rounded-xl"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(worker)}
                                                    className="hover:bg-red-50 text-red-600 rounded-xl"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {workers.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                    <User className="w-8 h-8 text-slate-300" />
                                </div>
                                <p className="text-slate-400 font-bold">No workers added yet</p>
                                <p className="text-slate-300 text-sm">Click "Add New Worker" to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default WorkerTracking;
