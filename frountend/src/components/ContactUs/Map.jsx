export default function Map() {
    return (
        <div className="rounded-3xl overflow-hidden shadow-md max-w-5xl mx-auto my-12">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.4004106644066!2d84.35932447714788!3d26.228171211501024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992fc1cb19b4cc3%3A0xb8fe7ccdf85b1005!2sDERMA%20HEALER%20-%20Laser%20%26%20Skin%20Care%20Clinic!5e1!3m2!1sen!2sin!4v1755449194608!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
