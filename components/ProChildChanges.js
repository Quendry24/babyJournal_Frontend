import { Keyboard, Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { useEffect, useState } from "react";
import Input from "./Input";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function ProChildChanges({ childInfo }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [heureChange, setHeureChange] = useState(new Date());
  const [commentaire, setCommentaire] = useState(null);
  const [ok, setOk] = useState(false);

  const types = ["URINES", "SELLES", "MIXTE", "CREME"];

  const changeTypes = (change) => {
    if (selectedItems.includes(change)) {
      setSelectedItems(selectedItems.filter((e) => e !== change));
    } else {
      setSelectedItems([...selectedItems, change]);
    }
  };

  const save = async () => {
    const heure = heureChange.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/Changes/${childInfo.idBabyJournal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heure,
            types: selectedItems,
            commentaire,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        console.log("change ajouté");
        setOk(true);
        setHeureChange(new Date());
        setSelectedItems([]);
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
        <View className=" gap-2 ">
          <View className="flex-row items-center gap-4">
            <Text className="text-2xl">Heure du change :</Text>
            <RNDateTimePicker
              mode="time"
              value={heureChange}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setHeureChange(selectedDate);
                }
              }}
            />
          </View>
          <Text className="text-2xl">Types : </Text>
          <View className="flex-row gap-2 py-4">
            {types.map((data, i) => (
              <Button
                key={i}
                title={data}
                onPress={() => changeTypes(data)}
                variant={
                  selectedItems.includes(data) ? "outlineJaune" : "jaune"
                }
              />
            ))}
          </View>
          <View className="flex-1">
            <Input
              fond="sans"
              title="Commentaires"
              nbLignes={4}
              value={commentaire}
              onChangeText={(value) => setCommentaire(value)}
            />
          </View>
        </View>
        <View className=" self-center w-1/2">
          {ok && (
            <Text className="text-green-700 text-center">Change ajouté</Text>
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
