import Link from "next/link";
import Demo from "../components/hero/Demo.jsx";
// import Hero from "../components/Hero.jsx"

export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <Demo />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to DermaHealer</h1>

        <p className="text-lg text-gray-700">
          Your one-stop destination for all your dermatological needs. Explore our wide range of treatments and services designed to help you achieve healthy, glowing skin.
        </p>

        <p className="text-lg text-gray-700 mt-4">
          Whether you&apos;re looking for skincare advice, treatment options, or the latest in dermatological research, we have you covered. Our team of experts is dedicated to providing you with the best care and information to help you on your skincare journey.
        </p>

        <p className="text-lg text-gray-700 mt-4">
          Explore our{" "}
          <Link href="/treatments" className="text-blue-500 hover:underline">
            treatments
          </Link>{" "}
          section to find the right solution for your skin concerns, or visit our{" "}
          <Link href="/blog" className="text-blue-500 hover:underline">
            blog
          </Link>{" "}
          for the latest news and tips in dermatology.
        </p>

        <p className="text-lg text-gray-700 mt-4">
          For any inquiries, feel free to{" "}
          <Link href="/contact-us" className="text-blue-500 hover:underline">
            contact us
          </Link>
          . We&apos;re here to help you achieve your skincare goals!
        </p>

        <p className="text-lg text-gray-700 mt-4">
          Learn more about our mission and values on our{" "}
          <Link href="/about-us" className="text-blue-500 hover:underline">
            About Us
          </Link>{" "}
          page.
        </p>

        <p className="text-lg text-gray-700 mt-4">
          If you&apos;re an administrator, you can access the{" "}
          <Link href="/admin" className="text-blue-500 hover:underline">
            Admin Dashboard
          </Link>{" "}
          for managing content and settings.
        </p>

        <p className="text-lg text-gray-700 mt-4">
          Thank you for choosing DermaHealer. We look forward to helping you achieve your best skin ever!
        </p>
      </main>
    </div>
  );
}
