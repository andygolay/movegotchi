"use client";

import React from "react";
import { PetParts } from ".";
import { PetImage } from "./Image";
import { ShuffleButton } from "@/components/ShuffleButton";
import {
  NEXT_PUBLIC_BACKGROUND_OPTIONS,
  NEXT_PUBLIC_BODY_OPTIONS,
  NEXT_PUBLIC_MOUTH_OPTIONS,
  NEXT_PUBLIC_TUSK_OPTIONS,
  NEXT_PUBLIC_EYE_OPTIONS,
  NEXT_PUBLIC_GLASSES_OPTIONS,
  NEXT_PUBLIC_HAIR_OPTIONS,
} from "@/utils/env";

export function ShufflePetImage({
  petParts,
  setPetParts,
}: {
  petParts: PetParts;
  setPetParts: React.Dispatch<React.SetStateAction<PetParts>>;
}) {
  const handleShuffle = () => {
    const randomPetParts = {
      background: Math.floor(Math.random() * Number(NEXT_PUBLIC_BACKGROUND_OPTIONS)),
      body: Math.floor(Math.random() * Number(NEXT_PUBLIC_BODY_OPTIONS)),
      mouth: Math.floor(Math.random() * Number(NEXT_PUBLIC_MOUTH_OPTIONS)),
      tusk: Math.floor(Math.random() * Number(NEXT_PUBLIC_TUSK_OPTIONS)),
      eye: Math.floor(Math.random() * Number(NEXT_PUBLIC_EYE_OPTIONS)),
      glasses: Math.floor(Math.random() * Number(NEXT_PUBLIC_GLASSES_OPTIONS)),  
      hair: Math.floor(Math.random() * Number(NEXT_PUBLIC_HAIR_OPTIONS)),  
    };
    setPetParts(randomPetParts);
  };

  return (
    <div className="flex flex-col gap-6 self-center">
      <PetImage petParts={petParts} />
      <ShuffleButton handleShuffle={handleShuffle} />
    </div>
  );
}
