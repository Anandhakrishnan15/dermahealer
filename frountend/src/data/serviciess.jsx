const products = [
    {
        title: "HIFU – Non-Surgical Facelift",
        subtitle: "High-Intensity Focused Ultrasound",
        category: "face",
        slug: "hifu",
        thumbnail:
            "https://media.post.rvohealth.io/wp-content/uploads/2018/12/Can-High-Intensity-Focused-Ultrasound-Treatment-Replace-Face-Lifts-_1200x628-facebook.jpg",
        description:
            "Achieve skin tightening and facial contouring without surgery. HIFU boosts collagen production, lifts sagging skin, and smoothens wrinkles with visible results in just one session.",
    },
    {
        title: "Laser Scar Removal",
        subtitle: "Erase Acne & Injury Marks",
        category: "face",
        slug: "acne-scar",
        thumbnail:
            "https://www.theclinicoregon.com/content/uploads/2023/05/bna1-scar-revision-1024x545.jpg",
        description:
            "Our advanced laser technology helps reduce acne scars, injury marks, and post-surgical scars by stimulating new skin regeneration with minimal downtime.",
    },
    {
        title: "Laser Hair Removal",
        subtitle: "Safe & Permanent Solution",
        category: "hair",
        slug: "laser-hair-removal",
        thumbnail:
            "https://www.kolorshealthcare.com/blog/wp-content/uploads/2023/07/Laser-Hair-Removal-Face.jpg",
        description:
            "Get freedom from waxing and shaving with USFDA-approved laser hair removal. Suitable for all skin types and both men and women.",
    },
    {
        title: "HydraFacial",
        subtitle: "Instant Glow & Deep Cleansing",
        category: "face",
        slug: "hydrafacial",
        thumbnail: "https://zazzlesalon.com/wp-content/uploads/2023/04/Hydra-Facial.jpg",
        description:
            "A globally loved facial that detoxifies, exfoliates, hydrates, and nourishes your skin—all in one session. Ideal for dull, dry, and sensitive skin types.",
    },
    {
        title: "Hyperpigmentation Treatment",
        subtitle: "Melasma, Sun Spots & Uneven Tone",
        category: "face",
        slug: "pigmentation",
        thumbnail:
            "https://drnerinawilkinson.co.za/wp-content/uploads/2024/03/Newsletter-images-5-scaled.jpg",
        description:
            "We treat melasma, sun spots, freckles and uneven skin tone with customized peels, lasers, and serums that target the pigmentation.",
    },
    {
        title: "Hair Loss Treatment",
        subtitle: "PRP, Mesotherapy & Growth Factors",
        category: "hair",
        slug: "hair-loss",
        thumbnail:
            "https://skin111.com/uploads/image/1723537137Hair_Loss_Treatment_for_Men.webp",
        description:
            "Get fuller, healthier hair with our PRP, mesotherapy, and growth factor treatments tailored to your scalp’s needs. Ideal for men and women with thinning hair.",
    },
    {
        title: "Fat Loss Treatment",
        subtitle: "Non-Surgical Body Shaping",
        category: "body",
        slug: "body-treatment",
        thumbnail:
            "https://perfectskincenter.com/wp-content/uploads/2023/06/638e1ccf5d.jpg",
        description:
            "Target stubborn fat in belly, thighs, arms, or love handles with our non-invasive fat reduction treatments with HDPEM technology.",
    },
    {
        title: "Urinary Incontinence",
        subtitle: "Kegel Chair Therapy",
        category: "wellness-health",
        slug: "urinary-incontinence",
        thumbnail:
            "https://hyperfitmd.com/wp-content/uploads/2022/11/btl-emsella-before-and-after-graphic-pelvic-floor-urinary-incontinence-treatment.jpg?x46771",
        description:
            "A revolutionary non-invasive treatment for post-pregnancy and age-related urinary leakage using the latest electromagnetic chair technology.",
    },
    {
        title: "Vitiligo Surgery",
        subtitle: "Punch Grafting & Blister Grafting",
        category: "skin",
        slug: "vitiligo",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFJQAeYvEPNzpvDGugXIeSrHhsv-eN_1ylA&s",
        description:
            "We offer effective surgical options for stable vitiligo patches using advanced techniques to restore pigmentation safely and successfully.",
    },
    {
        title: "Laser Tattoo Removal",
        subtitle: "Safe & Effective",
        category: "tattoo-removal",
        slug: "",
        thumbnail:
            "https://www.kaya.in/media/mageplaza/blog/post/l/a/laser-tattoo-removal.jpg",
        description:
            "Our Q-switched laser gently breaks down tattoo pigments without damaging your skin, removing unwanted tattoos with precision and minimal scarring.",
    },
    {
        title: "Xanthelasma Removal",
        subtitle: "Restore Natural Skin",
        category: "face",
        slug: "xanthelasma-removal",
        thumbnail:
            "https://img.saudigerman.com/wp-content/uploads/2023/07/18124549/How-To-Diagnose-Xanthelasma.webp",
        description:
            "Specialized treatments for safe and effective removal of Xanthelasma (cholesterol deposits around eyelids). Our dermatologists use advanced laser and minimally invasive techniques to restore smooth, natural-looking skin with minimal downtime.",
    },
    {
        title: "PRP Therapy",
        subtitle: "Natural Skin & Hair Rejuvenation",
        category: "hair",
        slug: "prp-therapy",
        thumbnail: "https://www.drmalaymehta.com/wp-content/uploads/2021/09/prp-treatment-for-hair-and-face.jpg",
        description:
            "Platelet-Rich Plasma (PRP) therapy uses your body’s own growth factors to stimulate natural healing, improve hair density, and rejuvenate skin for a youthful glow.",
    },
    {
        title: "Carbon Laser Toning",
        subtitle: "Deep Cleansing & Brightening",
        category: "face",
        slug: "carbon-laser-toning",
        thumbnail: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/Laser_Carbon_Peel_732x549-thumbnail-732x549.jpg",
        description:
            "A popular skin treatment that deeply exfoliates, reduces oil, clears acne, and brightens dull skin using advanced Q-switched carbon laser technology.",
    },
    {
        title: "Vampire Facial",
        subtitle: "Collagen Boost with PRP & Microneedling",
        category: "face",
        slug: "vampire-facial",
        thumbnail: "https://soumyaskinclinic.com/wp-content/uploads/2022/10/vampire-facials.jpg",
        description:
            "A celebrity-favorite skin rejuvenation procedure that combines PRP with microneedling to boost collagen, reduce fine lines, and restore youthful radiance.",
    },
    {
        title: "Wart Removal",
        subtitle: "Safe, Painless & Effective Treatment",
        category: "skin",
        slug: "wart-removal",
        thumbnail: "https://skinandcancerinstitute.com/wp-content/uploads/2022/06/wart.jpg",
        description:
            "Our dermatologists provide painless and effective wart removal using advanced cryotherapy, electrosurgery, and laser treatments for smooth, clear skin.",
    },
    {
        title: "Melasma",
        subtitle: "Brighten & Even Your Skin Tone",
        category: "skin",
        slug: "melasma",
        thumbnail: "https://www.epilium-paris.com/wp-content/uploads/2024/06/melasma.jpg",
        description: "Treatment for brownish facial patches using creams, chemical peels, and laser therapy for even skin tone."
    }


];

export default products;
