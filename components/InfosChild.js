import { Baby } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function InfosChild({ infos = {} }) {
  const adresse = infos.Adresse?.[0];
  const contact = infos.Contacts;
  console.log(infos);
  console.log("adress", adresse);
  const champs = [
    {
      label: "Date de naissance",
      valeur: infos.Birthday
        ? new Date(infos.Birthday).toLocaleDateString("fr-FR")
        : null,
    },
    { label: "Poids", valeur: infos.Poids ? `${infos.Poids} kg` : null },
    {
      label: "Adresse",
      valeur: `${adresse?.Rue} - ${adresse?.Code_Postal} - ${adresse?.Ville}`,
    },

    {
      label: "Contact",
      valeur: `${contact?.nom} : ${contact?.numero?.toString()}`,
    },
    {
      label: "Allergies",
      valeur: infos.Allergies?.length > 0 ? infos.Allergies.join("- ") : null,
    },
    {
      label: "Vaccins",
      valeur: infos.Vaccins?.length > 0 ? infos.Vaccins.join("- ") : null,
    },
  ];

  return (
    <View className="flex-1 pt-4">
      <Text className="text-3xl text-center">
        Profil de {infos.Prenom} {infos.Nom}
      </Text>
      <View className="my-4 w-20 self-center aspect-square rounded-full border-2 border-jaune">
        <Baby size={65} color="gray" />
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="bg-white p-4 rounded-3xl  elevation-3 ">
          {champs.map((champ, i) => (
            <View key={i} className="mb-4">
              <Text className="text-jaune text-xl font-bold">
                {champ.label}
              </Text>
              <Text className="text-lg">{champ.valeur || "Non renseigné"}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
