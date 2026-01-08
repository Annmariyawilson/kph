import AdminLayout from "@/components/admin/AdminLayout";
import {
    Phone,
    MapPin,
    Search,
    MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const EnquiryManagement = () => {
    const enquiries = [
        { id: "E201", name: "John Abraham", phone: "9876543210", requirement: "Interior Royale Painting", status: "New", date: "10 Jan 2026" },
        { id: "E202", name: "Mary Philip", phone: "9446194178", requirement: "Waterproofing Surface", status: "Contacted", date: "09 Jan 2026" },
        { id: "E203", name: "Suresh G.", phone: "8156965090", requirement: "Exterior Weathercoat", status: "Closed", date: "08 Jan 2026" },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "bg-red-50 text-[#D32F2F]";
            case "Contacted": return "bg-blue-50 text-blue-600";
            case "Closed": return "bg-slate-50 text-slate-400";
            default: return "bg-slate-50 text-slate-500";
        }
    };

    return (
        <AdminLayout>
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Enquiries</h1>
                    <p className="text-slate-400 text-sm font-medium">Customer leads from your website forms.</p>
                </div>
            </div>

            <div className="bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm min-h-[500px]">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search enquiries..."
                            className="pl-12 bg-slate-50 border-none rounded-xl h-12 font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50">
                                <th className="px-6 py-5">Customer</th>
                                <th className="px-6 py-5">Requirement</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {enquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 text-sm">{enquiry.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                <Phone className="w-3 h-3 text-[#D32F2F]" /> {enquiry.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700">{enquiry.requirement}</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{enquiry.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyle(enquiry.status)}`}>
                                            {enquiry.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <Button variant="ghost" size="icon" className="hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100">
                                            <MoreVertical className="w-5 h-5 text-slate-300" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EnquiryManagement;
