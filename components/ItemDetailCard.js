import { Meh, Smile, Frown } from "lucide-react-native";
import { Text, View, ScrollView } from "react-native";

export default function ItemDetailCard({ activityTypes, journee = [] }) {
  const cards = journee;
  const IconComponent = activityTypes.icon;

  // Fonction pour récupérer l'icône correspondant à l'humeur
  const getSmileyIcon = (humeur) => {
    if (!humeur) return null;
    if (humeur === "Smile") return <Smile />;
    if (humeur === "Meh") return <Meh />;
    return <Frown />; // icône par défaut si humeur non reconnue
  };

  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3">
      <View className="flex-1 p-4 border relative border-jaune rounded-xl">
        <Text className="text-2xl color-jaune absolute top-0 -translate-y-1/2 translate-x-4 bg-white">
          {activityTypes.label}
        </Text>

        <View className="items-end">
          {IconComponent && <IconComponent size={45} />}
        </View>

        <ScrollView>
          {journee.map((data, i) => (
            <View className="my-5" key={i}>
              <Text className="text-3xl">
                {data.nom || data.heure || `Item ${i + 1}`}
              </Text>

              <View
                className={`my-5 ${i % 2 === 0 ? "bg-vert" : "bg-ter"} border rounded-2xl p-4`}
              >
                {data.heure && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Heure : {data.heure}
                  </Text>
                )}
                {data.couche && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Couché : {data.couche}
                  </Text>
                )}
                {data.reveil && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Réveil : {data.reveil}
                  </Text>
                )}
                {data.humeur && (
                  <View className="flex-row items-center my-2">
                    <Text
                      className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                    >
                      Humeur :
                    </Text>
                    <View className="ml-2">{getSmileyIcon(data.humeur)}</View>
                  </View>
                )}
                {data.biberon && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Biberon : {data.biberon}
                  </Text>
                )}
                {data.commentaire && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Commentaire : {data.commentaire}
                  </Text>
                )}
                {data.symptomes && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Symptômes : {data.symptomes}
                  </Text>
                )}
                {data.traitements && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Traitements : {data.traitements}
                  </Text>
                )}
                {data.temperature && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Température : {data.temperature}
                  </Text>
                )}
                {data.types && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Types : {data.types.join(", ")}
                  </Text>
                )}
                {data.photos && data.photos.length > 0 && (
                  <Text
                    className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
                  >
                    Photos : {data.photos.join(", ")}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <Text className="text-3xl font-bold absolute right-4 bottom-4">
          {cards.length}
        </Text>
      </View>
    </View>
  );
}
