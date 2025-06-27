import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-rose-100 text-gray-800 pt-0 pb-16 overflow-hidden">
     

      {/* Footer Content */}
      <div className="mt-6 text-rose-600 px-2 md:px-10 text-3xl px-6 font-bold">
        Stay<span className=" text-gray-800">Finder</span>
      </div>

      {/* Desktop Grid Links */}
      <div className="hidden md:grid relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm font-semibold mt-10 px-10 mb-16 text-gray-700">
        <div>
          <h4 className="font-semibold mb-3 text-rose-600">Explore</h4>
          <ul className="space-y-4">
            <li>Destinations</li>
            <li>Top Listings</li>
            <li>Experiences</li>
            <li>Last Minute Deals</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-rose-600">Support</h4>
          <ul className="space-y-4">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Cancellation Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-rose-600">Hosting</h4>
          <ul className="space-y-4">
            <li>Become a Host</li>
            <li>Host Resources</li>
            <li>Community</li>
            <li>Hosting Guidelines</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-rose-600">Company</h4>
          <ul className="space-y-4">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>

      {/* Mobile Accordion Footer */}
      <div className="md:hidden px-2 pt-8 text-gray-800 px-6">
        {["Explore", "Support", "Hosting", "Company"].map((item, idx) => (
          <div
            key={idx}
            className="border-b border-gray-300 py-4 flex justify-between items-center"
          >
            <span className="font-medium text-rose-600">{item}</span>
            <span className="text-xl text-rose-600">+</span>
          </div>
        ))}

        {/* Social Icons */}
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 font-semibold">
          <span className="flex items-center hover:text-rose-600 gap-2"><FaFacebook /> Facebook</span>
          <span className="flex items-center hover:text-rose-600 gap-2"><FaLinkedin /> LinkedIn</span>
          <span className="flex items-center hover:text-rose-600 gap-2"><FaInstagram /> Instagram</span>
          <span className="flex items-center hover:text-rose-600 gap-2"><FaTwitter /> Twitter</span>
          <span className="flex items-center hover:text-rose-600 gap-2"><FaGithub /> GitHub</span>
        </div>

        {/* Legal Links */}
        <div className="mt-6 text-sm text-gray-500 flex flex-wrap items-center gap-4 font-semibold">
          <span>2025 © StayFinder</span>
          <span className="hover:underline cursor-pointer hover:text-rose-600">Terms of Use</span>
          <span className="hover:underline cursor-pointer hover:text-rose-600">Privacy Policy</span>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="hidden md:flex relative z-10 mt-16 text-gray-600 font-semibold text-xs px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-300 pt-6 w-full">
          <div className="flex flex-wrap items-center gap-4">
            <span>2025 © StayFinder</span>
            <span className="cursor-pointer hover:underline hover:text-rose-600">Terms of Use</span>
            <span className="cursor-pointer hover:underline hover:text-rose-600">Privacy Policy</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2 hover:text-rose-600 cursor-pointer hover:underline"><FaFacebook /> Facebook</span>
            <span className="flex items-center gap-2 hover:text-rose-600 cursor-pointer hover:underline"><FaLinkedin /> LinkedIn</span>
            <span className="flex items-center gap-2 hover:text-rose-600 cursor-pointer hover:underline"><FaInstagram /> Instagram</span>
            <span className="flex items-center gap-2 hover:text-rose-600 cursor-pointer hover:underline"><FaTwitter /> Twitter</span>
            <span className="flex items-center gap-2 hover:text-rose-600 cursor-pointer hover:underline"><FaGithub /> GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
