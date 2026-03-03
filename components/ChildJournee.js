import { Text, Image, View, Pressable, ScrollView } from "react-native";
import {
  Baby,
  Utensils,
  Bed,
  Shapes,
  HeartPlus,
  Shirt,
} from "lucide-react-native";

export default function ChildJournee({ photo, name, birthDate }) {
  return (
    <View className="flex-1 pt-4">
      <View className="flex-row items-center justify-center">
        {photo ? (
          <Image source={{ uri: photo }} className="w-16 h-16 rounded-full" />
        ) : (
          <View className="items-center  border-4  border-jaune rounded-full ">
            <Baby color="gray" size={75} />
          </View>
        )}
      </View>
      <Text className=" pt-2 pb-2 text-center text-black text-4xl font-bold">
        Léa
      </Text>
      <View>
        <ScrollView
          className="pt-4"
          contentContainerStyle={{ gap: 16, paddingBottom: 280 }}
        >
          <Pressable className="bg-white items-center py-4 rounded-3xl shadow-sm elevation-3">
            <Text className="text-2xl">Notes de nounou </Text>
          </Pressable>
          <Pressable className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3">
            <View className="w-12 items-start">
              <Bed size={40} />
            </View>

            <View className="flex-1 items-center">
              <Text className="text-2xl">Sieste </Text>
            </View>

            <View className="w-12 items-end">
              <Text className="text-2xl">4</Text>
            </View>
          </Pressable>
          <Pressable className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3">
            <View className="w-12 items-start">
              <Utensils size={40} />
            </View>

            <View className="flex-1 items-center">
              <Text className="text-2xl">Repas </Text>
            </View>

            <View className="w-12 items-end">
              <Text className="text-2xl">1</Text>
            </View>
          </Pressable>
          <Pressable className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3">
            <View className="w-12 items-start">
              <Shapes size={40} />
            </View>

            <View className="flex-1 items-center">
              <Text className="text-2xl">Activités </Text>
            </View>

            <View className="w-12 items-end">
              <Text className="text-2xl">2</Text>
            </View>
          </Pressable>
          <Pressable className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3">
            <View className="w-12 items-start">
              <Shirt size={40} />
            </View>

            <View className="flex-1 items-center">
              <Text className="text-2xl">Changes</Text>
            </View>

            <View className="w-12 items-end">
              <Text className="text-2xl">2</Text>
            </View>
          </Pressable>
          <Pressable className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3">
            <View className="w-12 items-start">
              <HeartPlus size={40} />
            </View>

            <View className="flex-1 items-center">
              <Text className="text-2xl">Santé</Text>
            </View>

            <View className="w-12 items-end">
              <Text className="text-2xl">0</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
