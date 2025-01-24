"use client";

import React, { useState } from "react";
import { useTypingEffect } from "@/utils/useTypingEffect";

import { ShufflePetImage } from "@/app/home/Pet/ShufflePetImage";
import { DEFAULT_PET, PetParts } from "@/app/home/Pet";

export function NotConnected() {
  const [petParts, setPetParts] = useState<PetParts>(DEFAULT_PET.parts);

  const text = useTypingEffect(
    `Welcome to Movegotchi, where you'll be able to mint your new on-chain narwhal. Once minted, you'll be able to feed, play with, and customize your new best friend!`
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <ShufflePetImage petParts={petParts} setPetParts={setPetParts} />
      <div className="nes-container is-dark with-title text-sm sm:text-base">
        <p className="title">Welcome</p>
        <p>{text}</p>
        <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSeKp6H03FAvY8x569EPqKCxR6m0kB8W-Ewvx35KM-cg1g7m9Q/viewform?usp=header">Get early access!</a></p>
      </div>
    </div>
  );
}
