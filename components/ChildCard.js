import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { Baby } from "lucide-react-native";

export default function ChildCard({ photo, name, birthDate, jours }) {
  return (
    <Pressable className="items-center bg-white py-6 rounded-3xl shadow-sm elevation-3">
      <View className="flex-row items-center justify-center">
        {photo ? (
          <Image source={{ uri: photo }} className="w-16 h-16 rounded-full" />
        ) : (
          <View className="items-center  border-4  border-jaune rounded-full justify-center ml-12">
            <Baby color="gray" size={75} />
          </View>
        )}

        <View className="flex-1 ml-8">
          <Text className=" text-3xl font-bold">{name} </Text>
          <Text className="text-xl font-medium">{birthDate} </Text>
        </View>
      </View>
      <Text className="italic mt-4">{jours}</Text>
    </Pressable>
  );
}
