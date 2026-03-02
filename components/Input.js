import { View, Text, TextInput } from "react-native";

export default function Input({ placeholder, title }) {
  return (
    <View className="bg-back">
      <View className="bg-back border-2 border-jaune relative m-4 p-4">
        <Text className="px-2 absolute top-0 -translate-y-1/2 bg-back">
          {title}
        </Text>
        <TextInput placeholder={title}></TextInput>
      </View>
    </View>
  );
}
