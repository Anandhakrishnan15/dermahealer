import PostClient from "./post-client";

export default async function PostPage({ params }) {
    // ✅ Unwrap params
    const { id } = await params;

    // Fetch post with embed for author + media
    const res = await fetch(
        `https://blog.dermahealerindia.com/wp-json/wp/v2/posts/${id}?_embed`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-red-600 text-center">
                Post not found
            </div>
        );
    }

    const data = await res.json();

    const featuredImage =
        data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const author = data._embedded?.author?.[0]?.name || "Unknown Author";
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const post = {
        title: data.title.rendered,
        content: data.content.rendered,
        image: featuredImage,
        author,
        date: formattedDate,
    };

    return <PostClient post={post} />;
}
