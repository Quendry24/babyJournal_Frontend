import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "jaune",
  textSize = "md",
}) {
  const variants = {
    jaune: {
      container: "bg-jaune",
      text: "text-white",
      iconColor:"white"
    },
    ter: {
      container: "bg-ter",
      text: "text-white",
      iconColor:"white"
    },
    outlineJaune: {
      container: "bg-white border-2 border-jaune",
      text: "text-jaune",
      iconColor: "jaune",
    },
      outlineTer: {
      container: "bg-white border-2 border-ter",
      text: "text-ter",
      iconColor: "ter",
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
        px-6 py-4
        rounded-xl
        mb-4
      `} >
      <Text
        className={`
          ${selectedVariant.text}
          ${selectedTextSize}
          font-bold
          text-center
        `} >
        {title}
      </Text>
    </TouchableOpacity>
  );
}