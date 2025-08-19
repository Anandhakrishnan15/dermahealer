"use client";
import React from "react";
import { HeroParallax } from "./HeroParallax";
import products from "../../data/serviciess"

export default function Demo() {
    return <HeroParallax products={products} />;
}
