import { useRouter } from "next/navigation";

export const PromoOffer = () => {
    const router = useRouter();

    return (
        <section className="py-12 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-center">
            <h2 className="text-3xl font-bold">✨ Special Offer</h2>
            <p className="mt-2 text-lg">New clients get 20% off their first treatment!</p>
            <button className="mt-4 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100"
                onClick={() => router.push("/book-appointment")}>
                Book Now
            </button>
        </section>
    );
};
