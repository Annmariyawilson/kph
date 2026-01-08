import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1F2933] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">K</span>
              </div>
              <span className="font-heading text-xl font-bold">KPH</span>
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              Tomychen’s Kalangara Paint House — Your premier destination for genuine branded paints and expert guidance in Edathua.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Products", "Color Catalog", "Find a Dealer"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-accent">Products</h4>
            <ul className="space-y-3">
              {["Interior Paints", "Exterior Paints", "Waterproofing", "Wood Finishes"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                <span className="font-body text-sm text-gray-400">
                  St. George Shopping Complex,<br />Edathua, Kerala
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0 text-accent" />
                  <a href="tel:04772212444" className="font-body text-sm text-gray-400 hover:text-accent">0477 2212444</a>
                </div>
                <div className="ml-7 flex flex-wrap gap-x-4 gap-y-1">
                  <a href="tel:9446194178" className="font-body text-xs text-gray-400 hover:text-accent">9446194178</a>
                  <a href="tel:8156965090" className="font-body text-xs text-gray-400 hover:text-accent">8156965090</a>
                  <a href="tel:29622244" className="font-body text-xs text-gray-400 hover:text-accent">29622244</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-gray-500">
            © {new Date().getFullYear()} Kalangara Paint House. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
