import mongoose from "mongoose";
import Treatment from "../../../models/Treatment"; // adjust path if needed

const MONGODB_URI = process.env.MONGODB_URI; // Make sure this is set in .env

const treatments = [
    {
        images: [
            "https://ik.imagekit.io/iwky7g0ee/1.jpeg?updatedAt=1755864391644",
            "https://ik.imagekit.io/iwky7g0ee/18.jpeg?updatedAt=1755864437516",
            "https://ik.imagekit.io/iwky7g0ee/21.jpeg?updatedAt=1755864437701"
        ],
        heading: "Vitiligo Treatment",
        description:
            "Our Vitiligo treatment helps restore skin pigmentation gradually and safely. Using advanced therapies, we target affected areas to improve skin tone and minimize depigmented patches. Visible results are typically seen after a few sessions, promoting confidence and healthy skin."
    },
    {
        images: [
            "https://ik.imagekit.io/iwky7g0ee/12.jpeg?updatedAt=1755864431828",
            "https://ik.imagekit.io/iwky7g0ee/13.jpeg?updatedAt=1755864432542",
            "https://ik.imagekit.io/iwky7g0ee/24.jpeg?updatedAt=1755864437543"
        ],
        heading: "Acne Treatment",
        description:
            "This comprehensive acne treatment reduces breakouts, controls excess oil, and prevents future acne formation. Utilizing laser therapy, chemical peels, and topical care, it improves skin texture and reduces inflammation, leaving skin clearer and healthier after multiple sessions."
    },
    {
        images: [
            "https://ik.imagekit.io/iwky7g0ee/6.jpeg?updatedAt=1755864429514",
            "https://ik.imagekit.io/iwky7g0ee/14.jpeg?updatedAt=1755864437451",
            "https://ik.imagekit.io/iwky7g0ee/23.jpeg?updatedAt=1755864437801"
        ],
        heading: "Hair Loss Treatment",
        description:
            "Our hair loss treatment combines advanced therapies like PRP, microneedling, and specialized topical treatments to stimulate hair growth and strengthen existing hair. It addresses androgenetic alopecia and other hair thinning issues, promoting denser, healthier hair over time."
    },
    {
        images: [
            "https://ik.imagekit.io/iwky7g0ee/8.jpeg?updatedAt=1755864427516",
            "https://ik.imagekit.io/iwky7g0ee/17.jpeg?updatedAt=1755864435934",
            "https://ik.imagekit.io/iwky7g0ee/10.jpeg?updatedAt=1755864428809"
        ],
        heading: "Freckles Removal",
        description:
            "Freckles removal treatment helps lighten dark spots and uneven pigmentation caused by sun exposure or genetics. Using laser and light-based therapies, the skin tone becomes more uniform, reducing freckles while maintaining skin health and radiance."
    },
    {
        images: [
            "https://ik.imagekit.io/iwky7g0ee/3.jpeg?updatedAt=1755864429055",
            "https://ik.imagekit.io/iwky7g0ee/5.jpeg?updatedAt=1755864427904",
            "https://ik.imagekit.io/iwky7g0ee/19.jpeg?updatedAt=1755864436710"
        ],
        heading: "Acne Scar Treatment",
        description:
            "Acne scar treatment targets both old and new scars using laser resurfacing, microneedling, and chemical peels. This approach smoothens the skin, improves texture, and minimizes pitted or raised scars, restoring a clear and even complexion over time."
    }
];

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Optional: clear existing treatments to avoid duplicates
        await Treatment.deleteMany({});
        console.log("Existing treatments cleared");

        // Insert all treatments
        const inserted = await Treatment.insertMany(treatments);
        console.log(`Inserted ${inserted.length} treatments!`);

        mongoose.disconnect();
    } catch (err) {
        console.error("Migration failed:", err);
        mongoose.disconnect();
    }
}

migrate();
