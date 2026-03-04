import { Text, View, Image, Pressable } from "react-native";
import {
  Baby,
  Utensils,
  Bed,
  Shapes,
  HeartPlus,
  Shirt,
  ArrowLeft,
  Send,
} from "lucide-react-native";
import dayjs from "dayjs";

export default function ItemDetail({ photo, child, OnBack }) {
  return (
    <View className="flex-1 pt-4">
      <View className="flex-row pt-16 justify-between ml-4 mr-4">
        <Pressable>
          <ArrowLeft onPress={OnBack} />
        </Pressable>
        <Pressable>
          <Send />
        </Pressable>
      </View>
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
        {child.name},
      </Text>
      <Text className="text-center italic">{ageInMonths} mois</Text>
      <View></View>
    </View>
  );
}
