const blogPosts = [
    {
        id: 1,
        title: "5 Tips for Healthy Skin",
        excerpt:
            "Discover easy habits to keep your skin glowing and healthy every day.",
        author: "Dr. Smith",
        date: "Aug 10, 2025",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        tags: ["Skin Care", "Health"],
        content: `
      <p>Keeping your skin healthy is essential for your overall well-being. Here are five easy tips you can follow daily:</p>
      <ul>
        <li><strong>Stay Hydrated:</strong> Drink plenty of water to keep your skin moisturized.</li>
        <li><strong>Use Sunscreen:</strong> Protect your skin from harmful UV rays.</li>
        <li><strong>Healthy Diet:</strong> Eat fruits and vegetables rich in antioxidants.</li>
        <li><strong>Regular Cleansing:</strong> Cleanse your skin gently twice a day.</li>
        <li><strong>Moisturize:</strong> Use a moisturizer suitable for your skin type.</li>
      </ul>
      <p>Following these tips consistently can give you radiant and healthy skin.</p>
    `,
    },
    {
        id: 2,
        title: "Understanding Diabetes: What You Need to Know",
        excerpt:
            "A comprehensive guide to managing diabetes and improving your lifestyle.",
        author: "Dr. Johnson",
        date: "Jul 22, 2025",
        image:
            "https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2025/jun/sdc-skin-detox-header.jpg?cx=0.670000016689301&cy=0.490000009536743&cw=800&ch=490&blr=False&hash=E8AAE16F86537836C50191788344246C",
        tags: ["Diabetes", "Nutrition"],
        content: `
      <p>Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it involves:</p>
      <ul>
        <li><strong>Monitoring:</strong> Keep track of your blood sugar levels regularly.</li>
        <li><strong>Diet:</strong> Follow a balanced diet low in sugars and refined carbs.</li>
        <li><strong>Exercise:</strong> Engage in regular physical activity.</li>
        <li><strong>Medication:</strong> Take medications or insulin as prescribed.</li>
      </ul>
      <p>Early detection and proper management can prevent complications.</p>
    `,
    },
    {
        id: 3,
        title: "The Importance of Mental Health",
        excerpt: "Learn how to care for your mind and body effectively.",
        author: "Dr. Lee",
        date: "Jul 15, 2025",
        image:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        tags: ["Mental Health", "Wellness"],
        content: `
      <p>Mental health is just as important as physical health. Here are some ways to take care of your mind:</p>
      <ul>
        <li><strong>Stay Connected:</strong> Maintain strong relationships with family and friends.</li>
        <li><strong>Stay Active:</strong> Exercise regularly to boost your mood.</li>
        <li><strong>Mindfulness:</strong> Practice meditation or yoga to reduce stress.</li>
        <li><strong>Seek Help:</strong> Don’t hesitate to reach out to professionals when needed.</li>
      </ul>
    `,
    },
    // Add more posts here as needed
    {
        id: 4,
        title: "Understanding Diabetes: What You Need to Know",
        excerpt:
            "A comprehensive guide to managing diabetes and improving your lifestyle.",
        author: "Dr. Johnson",
        date: "Jul 22, 2025",
        image:
            "https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2025/jun/sdc-skin-detox-header.jpg?cx=0.670000016689301&cy=0.490000009536743&cw=800&ch=490&blr=False&hash=E8AAE16F86537836C50191788344246C",
        tags: ["Diabetes", "Nutrition"],
        content: `
      <p>Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it involves:</p>
      <ul>
        <li><strong>Monitoring:</strong> Keep track of your blood sugar levels regularly.</li>
        <li><strong>Diet:</strong> Follow a balanced diet low in sugars and refined carbs.</li>
        <li><strong>Exercise:</strong> Engage in regular physical activity.</li>
        <li><strong>Medication:</strong> Take medications or insulin as prescribed.</li>
      </ul>
      <p>Early detection and proper management can prevent complications.</p>
    `,
    },
    {
        id: 5,
        title: "Understanding Diabetes: What You Need to Know",
        excerpt:
            "A comprehensive guide to managing diabetes and improving your lifestyle.",
        author: "Dr. Johnson",
        date: "Jul 22, 2025",
        image:
            "https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2025/jun/sdc-skin-detox-header.jpg?cx=0.670000016689301&cy=0.490000009536743&cw=800&ch=490&blr=False&hash=E8AAE16F86537836C50191788344246C",
        tags: ["Diabetes", "Nutrition"],
        content: `
      <p>Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it involves:</p>
      <ul>
        <li><strong>Monitoring:</strong> Keep track of your blood sugar levels regularly.</li>
        <li><strong>Diet:</strong> Follow a balanced diet low in sugars and refined carbs.</li>
        <li><strong>Exercise:</strong> Engage in regular physical activity.</li>
        <li><strong>Medication:</strong> Take medications or insulin as prescribed.</li>
      </ul>
      <p>Early detection and proper management can prevent complications.</p>
    `,
    },
    {
        id: 7,
        title: "Understanding Diabetes: What You Need to Know",
        excerpt:
            "A comprehensive guide to managing diabetes and improving your lifestyle.",
        author: "Dr. Johnson",
        date: "Jul 22, 2025",
        image:
            "https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2025/jun/sdc-skin-detox-header.jpg?cx=0.670000016689301&cy=0.490000009536743&cw=800&ch=490&blr=False&hash=E8AAE16F86537836C50191788344246C",
        tags: ["Diabetes", "Nutrition"],
        content: `
      <p>Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it involves:</p>
      <ul>
        <li><strong>Monitoring:</strong> Keep track of your blood sugar levels regularly.</li>
        <li><strong>Diet:</strong> Follow a balanced diet low in sugars and refined carbs.</li>
        <li><strong>Exercise:</strong> Engage in regular physical activity.</li>
        <li><strong>Medication:</strong> Take medications or insulin as prescribed.</li>
      </ul>
      <p>Early detection and proper management can prevent complications.</p>
    `,
    },
    {
        id: 8,
        title: "Understanding Diabetes: What You Need to Know",
        excerpt:
            "A comprehensive guide to managing diabetes and improving your lifestyle.",
        author: "Dr. Johnson",
        date: "Jul 22, 2025",
        image:
            "https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2025/jun/sdc-skin-detox-header.jpg?cx=0.670000016689301&cy=0.490000009536743&cw=800&ch=490&blr=False&hash=E8AAE16F86537836C50191788344246C",
        tags: ["Diabetes", "Nutrition"],
        content: `
      <p>Diabetes is a chronic condition that affects how your body processes blood sugar. Managing it involves:</p>
      <ul>
        <li><strong>Monitoring:</strong> Keep track of your blood sugar levels regularly.</li>
        <li><strong>Diet:</strong> Follow a balanced diet low in sugars and refined carbs.</li>
        <li><strong>Exercise:</strong> Engage in regular physical activity.</li>
        <li><strong>Medication:</strong> Take medications or insulin as prescribed.</li>
      </ul>
      <p>Early detection and proper management can prevent complications.</p>
    `,
    },
];

export default blogPosts;
