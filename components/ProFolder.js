import { useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ProFolder() {
  const allChilds = useSelector((state) => state.user.value.all);
  console.log(allChilds);

  //   useEffect(() => {
  //     fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/enfants/${idNounou}}`);
  //   }, []);
  return (
    <View className="flex-1  p-4 items-center">
      <Text className="text-3xl text-center">
        Espace de partage de documents
      </Text>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="flex-row flex-wrap w-full">
        {allChilds.map((data, i) => (
          <View className="w-1/3 aspect-square border">
            <Text>{data.Prenom}</Text>
          </View>
        ))}
      </View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
    </View>
  );
}
