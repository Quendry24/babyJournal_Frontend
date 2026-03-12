import { Keyboard, Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import {
  Frown,
  Image,
  Meh,
  Smile,
  Square,
  SquareCheck,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import Input from "./Input";

export default function ProChildActivites({ childInfo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activite, setActivite] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [ok, setOk] = useState(false);

  const save = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/Activites/${childInfo.idBabyJournal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: activite,
            humeur: selectedItem,
            commentaire,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        console.log("activité ajoutée");
        setOk(true);
        setActivite("");
        setSelectedItem(null);
        setCommentaire("");

        setTimeout(() => {
          setOk(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pour gerer la visibilité du bouton avec le mb vu que keybopardavoidingview ne marche pas
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <View
      className={`flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ${keyboardVisible ? "mb-96" : "mb-36"}`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2">
          <Input
            title="Activité :"
            value={activite}
            onChangeText={setActivite}
            fond="sans"
          />
          <View className="flex-row gap-10 items-center">
            <Text className="text-2xl">Humeur : </Text>
            <View className="flex-row gap-10 ">
              <Pressable
                onPress={() =>
                  setSelectedItem(selectedItem === "Smile" ? null : "Smile")
                }
              >
                <Smile
                  size={40}
                  color={selectedItem === "Smile" ? "green" : "black"}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  setSelectedItem(selectedItem === "Meh" ? null : "Meh")
                }
              >
                <Meh
                  size={40}
                  color={selectedItem === "Meh" ? "#F9BC50" : "black"}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  setSelectedItem(selectedItem === "frown" ? null : "frown")
                }
              >
                <Frown
                  size={40}
                  color={selectedItem === "frown" ? "#BE7D61" : "black"}
                />
              </Pressable>
            </View>
          </View>
          <View className="flex-row w-full items-center "></View>
        </View>
        <View className="flex-1 h-15">
          <Input
            fond="sans"
            title="Commentaires"
            nbLignes={5}
            value={commentaire}
            onChangeText={(value) => setCommentaire(value)}
          />
        </View>
        {ok && (
          <Text className="text-green-700 text-center mb-2">
            Activité ajoutée
          </Text>
        )}
        <View className="relative w-full">
          <Image size={40} />
          <View className=" absolute bottom self-center w-1/2">
            <Button
              title="Enregistrer"
              textSize="xl"
              variant="ter"
              onPress={() => save()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
