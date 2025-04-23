
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-green-700">EcoShop</h3>
            <p className="text-gray-600 text-sm">
              Sustainable and eco-friendly products for a better tomorrow. We believe in quality, sustainability, and customer satisfaction.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-green-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-brand-green-600 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-600 hover:text-brand-green-600 transition-colors">Account</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-brand-green-600 transition-colors">Cart</Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/track-order/latest" className="text-gray-600 hover:text-brand-green-600 transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-green-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-brand-green-600 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Contact Us</h3>
            <address className="not-italic text-sm text-gray-600">
              <p>123 Eco Street</p>
              <p>Sustainable City, SC 12345</p>
              <p className="mt-2">Email: support@ecoshop.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} EcoShop. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Payment methods:</span>
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-gray-800 rounded"></div>
              <div className="w-10 h-6 bg-blue-600 rounded"></div>
              <div className="w-10 h-6 bg-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
