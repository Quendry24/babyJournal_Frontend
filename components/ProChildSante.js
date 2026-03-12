import { Keyboard, Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import Input from "./Input";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function ProChildSante({ childInfo }) {
  const [heureSoin, setHeureSoin] = useState(new Date());
  const [symptomes, setSymptomes] = useState("");
  const [traitements, setTraitements] = useState("");
  const [temperature, setTemperature] = useState(false);
  const [degreTemperature, setdegreTemperature] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [ok, setOk] = useState(false);

  const save = async () => {
    const heure = heureSoin.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/Sante/${childInfo.idBabyJournal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heure,
            symptomes,
            traitements,
            temperature: degreTemperature,
            commentaire,
          }),
        },
      );

      const data = await response.json();
      if (data.result) {
        console.log("Soin ajouté");
        setOk(true);
        setHeureSoin(new Date());
        setSymptomes("");
        setTemperature(null);
        setTraitements("");
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
          <View className="flex-row items-center gap-4">
            <Text className="text-2xl">Heure du change :</Text>
            <RNDateTimePicker
              mode="time"
              value={heureSoin}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setHeureSoin(selectedDate);
                }
              }}
            />
          </View>
          <Input
            title="Symptômes :"
            value={symptomes}
            onChangeText={setSymptomes}
            fond="sans"
          />
          <Input
            title="Traitements :"
            value={traitements}
            onChangeText={setTraitements}
            fond="sans"
          />
          <View className="flex-row w-full items-center gap-4">
            <View className="flex-row  items-center">
              <Pressable onPress={() => setTemperature(!temperature)}>
                {temperature ? <SquareCheck /> : <Square />}
              </Pressable>
              <Text className="text-2xl">Température : </Text>
            </View>

            <View className="flex-1 ">
              <Input
                title="°C"
                fond="sans"
                value={degreTemperature}
                onChangeText={(value) => setdegreTemperature(value)}
              />
            </View>
          </View>
        </View>
        <View className="flex-1 ">
          <Input
            fond="sans"
            title="Commentaires"
            nbLignes={4}
            value={commentaire}
            onChangeText={(value) => setCommentaire(value)}
          />
        </View>
        <View className=" self-center w-1/2">
          {ok && (
            <Text className="text-green-700 text-center mb-2">Soin ajouté</Text>
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
