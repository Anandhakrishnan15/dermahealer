"use client";
import AboutHero from "@/components/AboutUs/AboutHero";
import AboutSection from "@/components/AboutUs/Aboutus";
import Doctors from "@/components/AboutUs/Doctors";
import FAQs from "@/components/AboutUs/FAQs";
import FinalCTA from "@/components/AboutUs/FinalCTA";
import MissionVision from "@/components/AboutUs/MissionVision";
import Treatments from "@/components/AboutUs/Treatments";
import WhyChooseUs from "@/components/AboutUs/WhyChooseUs";
import React from "react";


export default function AboutUs() {
    return (
       <>
            <AboutHero />
            <AboutSection/>
            <MissionVision />
            <WhyChooseUs />
            {/* <Doctors /> */}
            <Treatments />
            <FAQs />
            <FinalCTA />
       </>
    );
}