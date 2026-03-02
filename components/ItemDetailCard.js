import { Image, Text, View } from "react-native";

export default function ItemDetailcard() {
  const cards = [
    {
      sousTitre: "Sous-titre",
      TextIci: "Text ici",
      infosIci: "Infos ici",
      commentaires: "Com 1",
    },
    {
      sousTitre: "Sous-titre 2",
      TextIci: "Text ici",
      infosIci: "Infos ici",
      commentaires: "Com 2",
    },
  ];

  const allcards = cards.map((data, i) => (
    <View className="my-5" key={i}>
      <Text className="text-3xl">{data.sousTitre}</Text>
      <View
        className={`my-5 ${i % 2 === 0 ? "bg-vert" : "bg-ter"} border rounded-2xl p-4`}
      >
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.TextIci}
        </Text>
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.infosIci}
        </Text>
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.commentaires}
        </Text>
      </View>
    </View>
  ));

  return (
    <View className=" bg-white flex-1 rounded-2xl relative border p-4 shadow">
      <View className=" flex-1 p-4 border relative border-jaune rounded-lg">
        <Text className="text-2xl color-jaune absolute top-0  -translate-y-1/2 translate-x-4 bg-white">
          Titre ici
        </Text>
        <Image
          width={60}
          height={60}
          className="border self-end rounded-xl -mb-4"
        ></Image>
        <View className="">{allcards}</View>
        <Text className="text-3xl font-bold absolute right-4 bottom-4 ">
          {cards.length}
        </Text>
      </View>
    </View>
  );
}
