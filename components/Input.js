import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// mettre isPassword true pour masquer et afficher l'icone de l'oeil

export default function Input({
  title,
  value,
  type,
  inputMode,
  editable,
  onChangeText,
  isPassword = false,
  fond,
  nbLignes = 1,
}) {
  const [focused, setFocused] = useState(false);
  const [hide, setHide] = useState(isPassword);
  let background = "";
  fond === "sans" ? (background = "bg-white") : (background = "bg-back");

  return (
    <View className={`${background} ${nbLignes > 1 ? "flex-1" : ""}`}>
      <View
        className={`${background} border ${focused ? "border-jaune border-2" : "border-gray-600"}  relative my-4 p-4 rounded-xl flex-row justify-between`}
        style={nbLignes > 1 ? { minHeight: nbLignes * 24 } : {}}
      >
        <Text
          className={`translate-x-4 absolute top-0  -translate-y-1/2 ${background}
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
          enterKeyHint="next"
          inputMode={inputMode}
          editable={editable !== false}
          textContentType={type}
          onChangeText={onChangeText}
          secureTextEntry={hide}
          multiline={nbLignes > 1}
          textAlignVertical={nbLignes > 1 ? "top" : "center"}
          style={{ width: "100%" }}
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
