import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import locationData from "@/data/india-states-districts.json";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        state: "",
        city: "",
        reason: "",
    });

    const [openState, setOpenState] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    const states = useMemo(() => locationData.states.map(s => s.state), []);
    const districts = useMemo(() => {
        const stateObj = locationData.states.find(s => s.state === formData.state);
        return stateObj ? stateObj.districts : [];
    }, [formData.state]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.state || !formData.city || !formData.reason) {
            toast.error("Please fill all location and enquiry fields");
            return;
        }

        const phoneNumber = "918301921926";
        const message = `*New Lead from Website*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Mobile:* ${formData.mobile}\n` +
            `*Email:* ${formData.email}\n` +
            `*Location:* ${formData.city}, ${formData.state}\n` +
            `*Interested in:* ${formData.reason}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        toast.success("Redirecting to WhatsApp...");
        window.open(whatsappUrl, "_blank");
    };

    const inputClasses = "w-full bg-white border border-black/20 p-3 rounded-none outline-none transition-all focus:border-primary font-medium text-sm h-11";
    const labelClasses = "text-[11px] font-bold text-black uppercase mb-1.5 block tracking-tight";

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-lg border border-black/5">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-black text-black leading-tight uppercase mb-3">
                    Get In <span className="text-primary">Touch</span>
                </h2>
                <div className="w-16 h-0.5 bg-primary mx-auto mb-3" />
                <p className="text-black/60 text-[13px]">Please fill the form below to connect with us on WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Full Name"
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Mobile Number</label>
                        <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            className={inputClasses}
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            className={inputClasses}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Interested in</label>
                        <div className="relative">
                            <select
                                required
                                className={cn(inputClasses, "appearance-none pr-10 cursor-pointer")}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            >
                                <option value="" disabled>Select Inquiry Type</option>
                                <option value="Product Inquiry">Product Inquiry</option>
                                <option value="Quotation">Request Quotation</option>
                                <option value="Dealer Search">Find a Dealer</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                <ChevronsUpDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className={labelClasses}>State</label>
                        <Popover open={openState} onOpenChange={setOpenState}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openState}
                                    className={cn(inputClasses, "justify-between text-left font-medium font-normal bg-white hover:bg-white hover:border-black/30")}
                                >
                                    <span className={cn(!formData.state && "text-black/40")}>
                                        {formData.state ? formData.state : "Search State..."}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-black/10  rounded-none" align="start">
                                <Command className="rounded-none">
                                    <CommandInput placeholder="Search State..." className="h-10 text-sm border-none focus:ring-0" />
                                    <CommandList className="max-h-[300px]">
                                        <CommandEmpty>No state found.</CommandEmpty>
                                        <CommandGroup>
                                            {states.map((state) => (
                                                <CommandItem
                                                    key={state}
                                                    value={state}
                                                    onSelect={(currentValue) => {
                                                        const normalizedValue = states.find(s => s.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                        setFormData(prev => ({ ...prev, state: normalizedValue, city: "" }));
                                                        setOpenState(false);
                                                    }}
                                                    className="text-sm cursor-pointer hover:bg-primary/5 rounded-none"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            formData.state === state ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {state}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClasses}>District / City</label>
                        <Popover open={openCity} onOpenChange={setOpenCity}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCity}
                                    disabled={!formData.state}
                                    className={cn(inputClasses, "justify-between text-left font-medium font-normal bg-white hover:bg-white hover:border-black/30 disabled:opacity-50 disabled:bg-slate-50")}
                                >
                                    <span className={cn(!formData.city && "text-black/40")}>
                                        {formData.city ? formData.city : formData.state ? "Search District..." : "Select State First"}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-black/10 shadow-xl rounded-none" align="start">
                                <Command className="rounded-none">
                                    <CommandInput placeholder="Search District..." className="h-10 text-sm border-none focus:ring-0" />
                                    <CommandList className="max-h-[300px]">
                                        <CommandEmpty>No district found.</CommandEmpty>
                                        <CommandGroup>
                                            {districts.map((city) => (
                                                <CommandItem
                                                    key={city}
                                                    value={city}
                                                    onSelect={(currentValue) => {
                                                        const normalizedValue = districts.find(d => d.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                        setFormData(prev => ({ ...prev, city: normalizedValue }));
                                                        setOpenCity(false);
                                                    }}
                                                    className="text-sm cursor-pointer hover:bg-primary/5 rounded-none"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            formData.city === city ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {city}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-black text-white font-black text-lg py-6 rounded-none transition-all shadow-md uppercase flex items-center justify-center gap-2.5 h-14"
                    >
                        SEND ENQUIRY
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
