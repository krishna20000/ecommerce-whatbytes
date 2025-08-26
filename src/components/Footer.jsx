import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#16427C] to-[#0E376B] text-white mt-12 border-t border-white/20">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Filters column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="flex items-center gap-6 mb-6">
              <a href="#" className="text-white/90 hover:text-white transition-colors">All</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors">Electronics</a>
            </div>
            <p className="text-white/80 text-sm">© 2024 American</p>
          </div>

          {/* About column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-brand-blue-light/60 flex items-center justify-center hover:bg-brand-blue-light transition-colors">
                <Facebook className="text-white" size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="h-10 w-10 rounded-full bg-brand-blue-light/60 flex items-center justify-center hover:bg-brand-blue-light transition-colors">
                <Twitter className="text-white" size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full bg-brand-blue-light/60 flex items-center justify-center hover:bg-brand-blue-light transition-colors">
                <Instagram className="text-white" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}