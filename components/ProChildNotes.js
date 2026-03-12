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

export default function ProChildNotes({ childInfo }) {
  const [nom, setNom] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [ok, setOk] = useState(false);

  const save = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/Notes/${childInfo.idBabyJournal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom,
            commentaire,
          }),
        },
      );

      const data = await response.json();
      if (data.result) {
        console.log("Soin ajouté");
        setOk(true);
        setNom("");
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
        <View className=" ">
          <Input
            title="Types :"
            value={nom}
            onChangeText={setNom}
            fond="sans"
          />

          <View className="flex-row w-full items-center "></View>
        </View>
        <View className="flex-1 h-15">
          <Input
            fond="sans"
            title="Commentaires"
            nbLignes={8}
            value={commentaire}
            onChangeText={(value) => setCommentaire(value)}
          />
        </View>

        <View className=" self-center w-1/2">
          {ok && (
            <Text className="text-green-700 text-center mb-2">
              Note ajoutée
            </Text>
          )}
          <Button
            title="Enregistrer"
            textSize="xl"
            variant="ter"
            onPress={() => save()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
