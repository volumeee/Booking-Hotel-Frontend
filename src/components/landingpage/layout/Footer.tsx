"use client";

import React from "react";
import { Link, Image } from "@nextui-org/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 mt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="mb-8 md:mb-0">
                        <Image
                            src="/images/sleep.svg"
                            alt="shh.. Logo"
                            width={120}
                            height={40}
                            className="mb-4 ml-[-20px]"
                        />
                        <p className="text-gray-600 max-w-xs text-sm">
                            Discover unique stays and experiences around the world.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" color="foreground" className="text-sm">Our Story</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Careers</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Press</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" color="foreground" className="text-sm">Help Center</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Safety Information</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Cancellation Options</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" color="foreground" className="text-sm">Terms of Service</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Privacy Policy</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Cookie Policy</Link></li>
                                <li><Link href="#" color="foreground" className="text-sm">Intellectual Property</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 mb-4 md:mb-0 text-sm">&copy; 2024 shh.. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <Link href="#" color="foreground"><FaFacebook size={18} /></Link>
                        <Link href="#" color="foreground"><FaTwitter size={18} /></Link>
                        <Link href="#" color="foreground"><FaInstagram size={18} /></Link>
                        <Link href="#" color="foreground"><FaLinkedin size={18} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
