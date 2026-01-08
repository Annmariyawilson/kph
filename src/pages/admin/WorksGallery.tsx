import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Plus,
    Search,
    Trash2,
    Edit,
    Loader2,
    X,
    Upload
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

interface WorkImage {
    id: string;
    name: string;
    type: string;
    location: string;
    image_url: string;
    storage_path: string;
    is_published: boolean;
    created_at: string;
}

const WorksGallery = () => {
    const [works, setWorks] = useState<WorkImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<WorkImage | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        type: "Interior",
        location: "",
        imageFile: null as File | null
    });

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('work_images')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setWorks(data || []);
        } catch (error: any) {
            toast.error("Failed to fetch works");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.imageFile && !editingWork) {
            toast.error("Please select an image");
            return;
        }

        try {
            setUploading(true);
            let imageUrl = editingWork?.image_url || "";
            let storagePath = editingWork?.storage_path || "";

            // Upload new image if provided
            if (formData.imageFile) {
                const fileExt = formData.imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `works/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('uploads')
                    .upload(filePath, formData.imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('uploads')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
                storagePath = filePath;

                // Delete old image if editing
                if (editingWork?.storage_path) {
                    await supabase.storage
                        .from('uploads')
                        .remove([editingWork.storage_path]);
                }
            }

            const workData = {
                name: formData.name,
                type: formData.type,
                location: formData.location,
                image_url: imageUrl,
                storage_path: storagePath,
                is_published: true
            };

            if (editingWork) {
                // Update existing work
                const { error } = await supabase
                    .from('work_images')
                    .update(workData)
                    .eq('id', editingWork.id);

                if (error) throw error;
                toast.success("Work updated successfully!");
            } else {
                // Create new work
                const { error } = await supabase
                    .from('work_images')
                    .insert([workData]);

                if (error) throw error;
                toast.success("Work added successfully!");
            }

            // Reset form and close dialog
            setFormData({ name: "", type: "Interior", location: "", imageFile: null });
            setEditingWork(null);
            setDialogOpen(false);
            fetchWorks();
        } catch (error: any) {
            toast.error(error.message || "Failed to save work");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (work: WorkImage) => {
        if (!confirm("Are you sure you want to delete this work?")) return;

        try {
            // Delete from storage
            const { error: storageError } = await supabase.storage
                .from('uploads')
                .remove([work.storage_path]);

            if (storageError) throw storageError;

            // Delete from database
            const { error: dbError } = await supabase
                .from('work_images')
                .delete()
                .eq('id', work.id);

            if (dbError) throw dbError;

            toast.success("Work deleted successfully!");
            fetchWorks();
        } catch (error: any) {
            toast.error("Failed to delete work");
            console.error(error);
        }
    };

    const handleEdit = (work: WorkImage) => {
        setEditingWork(work);
        setFormData({
            name: work.name,
            type: work.type,
            location: work.location,
            imageFile: null
        });
        setDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: "", type: "Interior", location: "", imageFile: null });
        setEditingWork(null);
    };

    return (
        <AdminLayout>
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Works Gallery</h1>
                    <p className="text-slate-400 text-sm font-medium">Manage your completed painting projects.</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#D32F2F] hover:bg-black text-white font-bold rounded-xl px-8 py-6 shadow-md shadow-red-100 transition-all flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            ADD NEW WORK
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black">
                                {editingWork ? "Edit Work" : "Add New Work"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-black uppercase text-slate-400">Project Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Modern Villa Interior"
                                    required
                                    className="h-12 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-xs font-black uppercase text-slate-400">Work Type</Label>
                                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Interior">Interior</SelectItem>
                                        <SelectItem value="Exterior">Exterior</SelectItem>
                                        <SelectItem value="Waterproofing">Waterproofing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-xs font-black uppercase text-slate-400">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Edathua, Kerala"
                                    required
                                    className="h-12 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-xs font-black uppercase text-slate-400">
                                    {editingWork ? "Change Image (Optional)" : "Upload Image"}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                                        required={!editingWork}
                                        className="h-12 rounded-xl"
                                    />
                                    <Upload className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={uploading}
                                className="w-full h-12 bg-[#D32F2F] hover:bg-black text-white font-bold rounded-xl"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        {editingWork ? "Updating..." : "Uploading..."}
                                    </>
                                ) : (
                                    editingWork ? "Update Work" : "Add Work"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {works.map((work) => (
                        <div key={work.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={work.image_url}
                                    alt={work.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="icon"
                                        onClick={() => handleEdit(work)}
                                        className="bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        onClick={() => handleDelete(work)}
                                        className="bg-white/90 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 rounded-lg uppercase font-black text-[9px] px-3 py-1">
                                        {work.type}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-black text-slate-900 mb-1">{work.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{work.location}</p>
                            </div>
                        </div>
                    ))}

                    {works.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Upload className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-400 font-bold">No works uploaded yet</p>
                            <p className="text-slate-300 text-sm">Click "Add New Work" to get started</p>
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
};

export default WorksGallery;
