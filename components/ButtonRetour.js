import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";

export default function ButtonRetour({
  onPress,
  variant = "jaune",
  textSize = "sm",
}) {
  const variants = {
    jaune: {
      container: "bg-jaune",
      text: "text-white",
      iconColor: "white",
    },
    ter: {
      container: "bg-ter",
      text: "text-white",
      iconColor: "white",
    },
    outlineJaune: {
      container: "bg-white border-2 border-jaune",
      text: "text-jaune",
      iconColor: "#F9BC50",
    },
    outlineTer: {
      container: "bg-white border-2 border-ter",
      text: "text-ter",
      iconColor: "#BE7D61",
    },
  };
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const selectedVariant = variants[variant] || variants.jaune;
  const selectedTextSize = textSizes[textSize] || textSizes.md;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        ${selectedVariant.container}
        flex-row
        h-10
        w-24
        rounded-2xl
        justify-center
        items-center
      `}
    >
      <ChevronLeft
        size={20}
        color={selectedVariant.iconColor}
        strokeWidth={2}
      />
      <Text
        className={`
          ${selectedVariant.text}
          ${selectedTextSize}
          font-bold
          text-right
      
        `}
      >
        Retour
      </Text>
    </TouchableOpacity>
  );
}
