import Doctors from "@/components/AboutUs/Doctors";
import ContactForm from "../../components/ContactUs/ContactForm";
import ContactInfo from "../../components/ContactUs/ContactInfo";
import Map from "../../components/ContactUs/Map";
import { StickyCTA } from "@/components/ContactUs/StickyCTA";
import { CTASection } from "@/components/CTASection";


export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[var(--bg)] py-5 ">
            <h1 className="text-4xl text-[var(--text)] font-bold text-center mb-12">Contact Our Clinic</h1>
            {/* <EmergencyContact/> */}
            <div className="max-w-7xl  mx-auto flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0">
                <div className="flex-1">
                    <ContactForm />
                </div>
                <div className="flex-1 ">
                    <ContactInfo />
                </div>
            </div>
            <Doctors/>

            <Map  />
            <CTASection/>
            <StickyCTA/>

        </main>
    );
}
