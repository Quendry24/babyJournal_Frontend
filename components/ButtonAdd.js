import React from "react";
import { TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

export default function ButtonAdd({ onPress, variant = "jaune" }) {
  const variants = {
    jaune: {
      container: "bg-jaune",
      iconColor: "white",
    },
    ter: {
      container: "bg-ter",
      iconColor: "white",
    },
    outlineJaune: {
      container: "bg-white border-2 border-jaune",
      iconColor: "#F9BC50",
    },
    outlineTer: {
      container: "bg-white border-2 border-ter",
      iconColor: "ter",
    },
  };

  const selectedVariant = variants[variant] || variants.jaune;

  return (
    <TouchableOpacity
      onPress={() => onPress}
      className={`${selectedVariant.container}
        w-16 h-16
        items-center justify-center
        rounded-2xl
        shadow-md`}
    >
      <Plus size={20} color={selectedVariant.iconColor} strokeWidth={4} />
    </TouchableOpacity>
  );
}
