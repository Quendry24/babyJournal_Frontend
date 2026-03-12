import { ScrollView, Text, View, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { Baby, Images, FileText } from "lucide-react-native";

export default function ProFolder() {
  const allChilds = useSelector((state) => state.user.value.all);

  const cards = allChilds?.map((data, i) => (
    <View
      key={i}
      className="w-['44%'] border-2 border-jaune rounded-3xl p-4 gap-4 bg-white items-center m-2"
    >
      <View className="items-center gap-4 justify-around flex-wrap w-full">
        <View className="items-center  justify-center gap-2  ">
          <View className="border-4 border-jaune rounded-full w-16 h-16 overflow-hidden">
            <Baby color="gray" size={48} />
          </View>
          <Text className="text-2xl font-bold">{data.Prenom}</Text>
        </View>
        <View className="flex-row w-full  justify-around">
          <View className="">
            <Images color="#facc15" size={36} />
          </View>
          <View className="">
            <FileText color="#facc15" size={36} />
          </View>
        </View>
      </View>
    </View>
  ));

  return (
    <ScrollView
      className="flex-1 w-full"
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <Text className="py-4 text-3xl font-bold text-center">Documents</Text>
      <View className="border-b-2 w-full border-jaune mb-4"></View>
      <View className="px-4 pb-10 flex-row flex-wrap items-center">
        {allChilds?.length > 0 ? (
          cards
        ) : (
          <Text className="text-center text-xl text-gray-400 mt-20">
            Aucun enfant trouvé
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
