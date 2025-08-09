export const BlogTips = () => {
    const demoPosts = [
        {
            title: "5 Skincare Mistakes You Might Be Making",
            excerpt: "Discover the common skincare habits that might be harming your skin and how to fix them.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeNQE44j7rSvL6n-TZjrgUJzuWwoXDP3y0hQ&s",
            link: "#"
        },
        {
            title: "Top 3 Natural Ingredients for Glowing Skin",
            excerpt: "Learn about nature's secret ingredients that can give you radiant and healthy skin.",
            image: "https://vernonskinclinic.com/wp-content/uploads/2023/06/1686555227953.jpg",
            link: "#"
        },
        {
            title: "Before & After: Real Client Transformations",
            excerpt: "See how our treatments have helped clients achieve their beauty and wellness goals.",
            image: "https://dreamderma.in/wp-content/uploads/2020/01/photo-facial.jpg",
            link: "#"
        }
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-center text-3xl font-bold mb-10 text-gray-900 dark:text-white">
                Beauty & Wellness Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {demoPosts.map((post, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                        <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                            <a href={post.link} className="mt-4 block text-indigo-600 font-semibold hover:underline">
                                Read More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
