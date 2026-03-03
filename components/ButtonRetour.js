import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";

export default function ButtonRetour({
  title,
  onPress,
  variant = "jaune",
  textSize = "md",
}) {
  const variants = {
    jaune: {
      container: "bg-jaune",
      text: "text-white",
    },
    ter: {
      container: "bg-ter",
      text: "text-white",
    },
    outlineJaune: {
      container: "bg-white border-2 border-jaune",
      text: "text-jaune",
    },
    outlineTer: {
      container: "bg-white border-2 border-ter",
      text: "text-ter",
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
        p-2.5
        mt-1
        w-24
        rounded-2xl

      `}
    >
      <ChevronLeft
        size={20}
        color={selectedVariant.textColor}
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
        {title}
      </Text>
    </TouchableOpacity>
  );
}