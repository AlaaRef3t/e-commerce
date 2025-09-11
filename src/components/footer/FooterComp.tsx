"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function FooterComp() {
  return (
    <footer className="border-t bg-white">
      {/* Top */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            <Link href="/" className="inline-block text-2xl font-extrabold tracking-wide italic underline decoration-2">
              Go<span className="text-yellow-600">Buy</span><span className="text-black">.</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">
              Your favorite destination for fashion & lifestyle. Fast delivery, secure payment, easy returns.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Alexandria, Egypt
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +201070608699
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@gobuy.com
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a href="https://www.facebook.com/3laa.ref3t" className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition" aria-label="Facebook">
                <Facebook size={18} className="text-gray-700" />
              </a>
              <a href="https://www.instagram.com/3laa_ref3t"  className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition" aria-label="Instagram">
                <Instagram size={18} className="text-gray-700" />
              </a>
              <a href="#" className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition" aria-label="Twitter">
                <Twitter size={18} className="text-gray-700" />
              </a>
              <a href="#" className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition" aria-label="YouTube">
                <Youtube size={18} className="text-gray-700" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-sm font-semibold text-gray-900 tracking-wide">Services</h6>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-yellow-600 transition">Branding</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Design</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Marketing</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Advertisement</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-sm font-semibold text-gray-900 tracking-wide">Company</h6>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-yellow-600 transition">About us</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Jobs</Link></li>
              <li><Link href="#" className="hover:text-yellow-600 transition">Press kit</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="text-sm font-semibold text-gray-900 tracking-wide">Newsletter</h6>
            <p className="mt-3 text-sm text-gray-600">Get updates on new arrivals & special offers.</p>

            <form
             
              className="mt-4 flex items-center gap-2"
            >
              
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 transition"
              >
                Subscribe
              </button>
            </form>

           
            
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} GoBuy. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <select
              aria-label="Language"
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-yellow-600"
            >
              <option>English</option>
              <option>العربية</option>
            </select>

            <select
              aria-label="Currency"
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-yellow-600"
            >
              <option>EGP</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
