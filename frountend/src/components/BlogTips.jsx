import blogPosts from "../data/blogPosts";
import Link from "next/link";

export const BlogTips = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-center text-3xl font-bold mb-10 text-gray-900 dark:text-white">
                Beauty & Wellness Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {blogPosts.slice(0, 3).map((post, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                                {post.excerpt}
                            </p>
                            <div className="mt-4">
                                <Link href={`blog/${post.id}`}>
                                    <button className="px-5 py-2 bg-teal-600 text-white rounded-full text-sm 
                                        hover:bg-teal-500 transition-all group-hover:scale-105">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
