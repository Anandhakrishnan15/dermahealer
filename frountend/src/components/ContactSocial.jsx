export const ContactSocial = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold text-white">Contact Us</h3>
                    <p className="mt-2">North of Gandhi Maidan, Siwan – 841226, Bihar, India</p>
                    <p>Phone: +91-XXXXXXXXXX</p>
                    <p>Email: hello@clinic.com</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-bold text-white">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">YouTube</a>
                    </div>
                </div>

                {/* Opening Hours */}
                <div>
                    <h3 className="text-lg font-bold text-white">Opening Hours</h3>
                    <p className="mt-2">Mon – Sat: 9:00 AM – 5:00 PM</p>
                    <p>Sun: Closed</p>
                </div>

            </div>
        </footer>
    );
};
