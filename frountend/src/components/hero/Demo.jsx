"use client";
import React from "react";
import { HeroParallax } from "./HeroParallax";
// import { HeroParallax } from "./HeroParallax";

const products = [
    {
        title: "Laser Hair Removal",
        link: "#",
        thumbnail: "https://t3.ftcdn.net/jpg/03/25/76/36/360_F_325763670_7HDQhp4ZLh530EzsAM0iUfPJpIW2by1Z.jpg",
        description: "We use the latest pain-free technology. Book now a free patch test."
    },
    {
        title: "HydraFacial",
        link: "#",
        thumbnail: "https://dermavue.com/wp-content/uploads/2023/12/Procedures-DermaVue-skin-clinic-best-dermatologist-in-kerala-expert-care-lasers-cosmetology-hair-transplant-_35-scaled.webp",
        description: "Get the results you would expect from a medical facial treatment, but without the pain and downtime."
    },
    {
        title: "Cosmelan - Hyperpigmentation Treatment",
        link: "#",
        thumbnail: "https://www.northtexasplasticsurgery.com/wp-content/uploads/2022/04/cosmelan-chemical-peel-treatment.jpg",
        description: "Remove stubborn pigmentation such as melasma and age spots without surgery."
    },
    {
        title: "Hair Loss Treatment",
        link: "#",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBjjQ72tsTMTI04NY4HOAhPl7-_8HShwPVg&s",
        description: "Enhance hair growth with this clinically proven treatment."
    },
    {
        title: "Body Contouring",
        link: "#",
        thumbnail: "https://perfectskincenter.com/wp-content/uploads/2023/06/638e1ccf5d.jpg",
        description: "With Lipofirm Pro, you can start noticing visible results after just a few sessions."
    },
    {
        title: "Skin Tag Removal",
        link: "#",
        thumbnail: "https://www.dermatologydiaries.com/wp-content/uploads/2024/05/skin-tags-skin-tag-removal-mumbai-best-dermatologist-in-Mumbai-Dr-Niketa-Sonavane.jpeg",
        description: "Advanced electrolysis techniques that safely and effectively remove tags."
    },
];


export default function Demo() {
    return <HeroParallax products={products} />;
}
