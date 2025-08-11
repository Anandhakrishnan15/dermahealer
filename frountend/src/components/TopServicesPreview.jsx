export const TopServicesPreview = () => {
    const demoServices = [
        {
            title: "Facial Rejuvenation",
            description: "Revitalize your skin with our advanced facial treatments for a youthful glow.",
            image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        },
        {
            title: "Laser Hair Removal",
            description: "Smooth, hair-free skin with our painless and effective laser treatments.",
            image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        },
        {
            title: "Body Contouring",
            description: "Shape and sculpt your body with our cutting-edge contouring solutions.",
            image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        },
    ];

    return (
        <section className="py-16 bg-[var(--bg)]">
            <h2 className="text-center text-3xl font-bold mb-10 text-[var(--text)]">
                Our Signature Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {demoServices.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-[var(--sbg)] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
                    >
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                            {service.title}
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {service.description}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
