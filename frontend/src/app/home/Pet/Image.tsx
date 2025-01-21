/* eslint-disable @next/next/no-img-element */
"use client";

import { PetParts } from "@/app/home/Pet";
import { PetAction } from "@/app/home/Pet/Actions";

export interface PetImageProps {
  selectedAction?: PetAction;
  petParts: PetParts | undefined;
  avatarStyle?: boolean;
}

export function PetImage(props: PetImageProps) {
  const { avatarStyle, petParts, selectedAction } = props;

  if (!petParts) return <div className="h-80 w-80 bg-gray-200"></div>;
  const background = BASE_PATH + background_options[petParts.background];
  const body = BASE_PATH + body_options[petParts.body];
  const mouth = BASE_PATH + mouth_options[petParts.mouth];
  const tusk = BASE_PATH + tusk_options[petParts.tusk];
  const eye = BASE_PATH + eye_options[petParts.eye];
  const glasses = BASE_PATH + glasses_options[petParts.glasses];
  const hair = BASE_PATH + hair_options[petParts.hair];    

  const imgClass = "absolute top-0 left-0 w-full h-full object-contain";

  const animation =
    selectedAction === "play" ? "animate-wiggle" : "animate-hop";

  return (
    <div
      className={`border-double border-8 border-black p-2 relative ${
        avatarStyle ? "h-44 w-44" : "h-80 w-80"
      }`}
      style={{
        paddingTop: "1rem",
        backgroundImage: `url(${background})`,  
        backgroundSize: "cover",               
        backgroundPosition: "center",           
      }}
    >
      <div className={`relative h-full w-full ${animation}`}>
        {/* Removed background from here */}
        <img src={body} className={imgClass} alt="narhwal body" />
        <img src={mouth} className={imgClass} alt="narhwal mouth" />
        <img src={eye} className={imgClass} alt="narhwal eye" />
        <img src={hair} className={imgClass} alt="narhwal hair" />
        <img src={glasses} className={imgClass} alt="narhwal glasses" />
        <img src={tusk} className={imgClass} alt="narhwal tusk" />
      </div>
    </div>
  );
}

export const BASE_PATH = "/pet-parts/";

export const background_options = [
  "bg1.png",
  "bg2.png",
  "bg3.png",
  "bg4.png",
  "bg5.png",
  "bg6.png",
  "bg7.png",
  "bg8.png",
  "bg9.png",
  "bg10.png",
  "bg11.png",
  "bg12.png",
  "bg13.png",
  "bg14.png",
  "bg15.png",
  "bg16.png",
];

export const body_options = [
  "narwhalbody1.png",
  "narwhalbody2.png",
  "narwhalbody3.png",
  "narwhalbody4.png",
  "narwhalbody5.png",
  "narwhalbody6.png",
  "narwhalbody7.png",
  "narwhalbody8.png",
  "narwhalbody9.png",
  "narwhalbody10.png",
  "narwhalbody11.png",
  "narwhalbody12.png",
  "narwhalbody13.png",
  "narwhalbody14.png",
  "narwhalbody15.png",
  "narwhalbody16.png",
  "narwhalbody17.png",
  "narwhalbody18.png",
  "narwhalbody19.png",
  "narwhalbody20.png",
  "narwhalbody21.png",
  "narwhalbody22.png",
  "narwhalbody23.png",
];

export const mouth_options = [
  "mouth1.png", 
  "mouth2.png", 
  "mouth3.png", 
  "mouth4.png",
  "mouth5.png",
  "mouth6.png",
  "mouth7.png"
];

export const tusk_options = [
  "tusk1.png", 
  "tusk2.png", 
  "tusk3.png", 
  "tusk4.png",
  "tusk5.png",
  "tusk6.png",
];

export const eye_options = [
  "eyes1.png",
  "eyes2.png",
  "eyes3.png",
];

export const glasses_options = [
  "glasses1.png", 
  "glasses2.png", 
  "glasses3.png", 
  "glasses4.png"
];

export const hair_options = [
  "hair1.png", 
  "hair2.png", 
  "hair3.png", 
  "hair4.png",
  "hair5.png",
  "hair6.png",
  "hair7.png",
  "hair8.png",
  "hair9.png"
];
