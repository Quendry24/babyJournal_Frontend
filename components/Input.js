import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// mettre isPassword true pour masquer et afficher l'icone de l'oeil

export default function Input({ title, value, onChangeText, isPassword }) {
  const [focused, setFocused] = useState(false);
  const [hide, setHide] = useState(isPassword);
  return (
    <View className="bg-back">
      <View
        className={`bg-back border ${focused ? "border-jaune border-2" : "border-gray-600"}  relative m-4 p-4 rounded-xl flex-row justify-between`}
      >
        <Text
          className={`translate-x-4 absolute top-0  -translate-y-1/2 bg-back
            ${focused ? "text-jaune font-bold" : "text-black"}
          `}
        >
          {title}
        </Text>
        <TextInput
          placeholder={title}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hide}
        ></TextInput>
        {isPassword && (
          <Pressable onPress={() => setHide(!hide)}>
            {hide ? (
              <FontAwesome name="eye" size={16} color="jaune" />
            ) : (
              <FontAwesome name="eye-slash" size={16} color="jaune" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
