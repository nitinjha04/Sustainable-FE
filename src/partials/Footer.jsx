import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="about" className="bg-green-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to={"/"} className="hover:text-green-300 transition">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={"/products"}
                className="hover:text-green-300 transition"
              >
                Products
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={"/articles"}
                className="hover:text-green-300 transition"
              >
                Articles
              </Link>
            </li>
            <li className="mb-2">
              <Link to={"/tips"} className="hover:text-green-300 transition">
                Tips
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#about" className="hover:text-green-300 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">123 Green Road, Sustainability City</p>
          <p className="mb-2">Email: contact@sustainableweb.com</p>
          <p className="mb-2">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-green-300 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4">
            Subscribe to our newsletter for the latest tips, products, and
            articles.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-green-800 mt-8 pt-4 text-center text-sm">
        <p>&copy; 2024 Sustainable Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
