import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 text-center">
        {/* About Section */}
        <div>
          <h3 className="font-bold mb-2">About</h3>
          <ul>
            <li><a href="#" className="hover:underline">How our site works</a></li>
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="font-bold mb-2">Community</h3>
          <ul>
            <li><a href="#" className="hover:underline">Diversity & Belonging</a></li>
            <li><a href="#" className="hover:underline">Accessibility</a></li>
            <li><a href="#" className="hover:underline">Frontline Stays</a></li>
          </ul>
        </div>

        {/* Host Section */}
        <div>
          <h3 className="font-bold mb-2">Host</h3>
          <ul>
            <li><a href="#" className="hover:underline">Host your home</a></li>
            <li><a href="#" className="hover:underline">Host an Experience</a></li>
            <li><a href="#" className="hover:underline">Responsible hosting</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <ul>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
            <li><a href="#" className="hover:underline">Trust & Safety</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs">
        <p>© 2024 Site-booking-platform, Inc. · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Sitemap</a></p>
      </div>
    </footer>
  );
}

export default Footer;
