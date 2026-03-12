import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { TimePickerModal } from "react-native-paper-dates";
import MaskInput from "react-native-mask-input";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function ProChildRepas({ childInfo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [biberon, setBiberon] = useState(false);
  const [mlBiberon, setMlBiberon] = useState(null);
  const [commentaire, setCommentaire] = useState(null);
  const [heureRepas, setHeureRepas] = useState(new Date());
  const [ok, setOk] = useState(false);

  const save = async () => {
    const time = heureRepas.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/Repas/${childInfo.idBabyJournal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heure: time,
            humeur: selectedItem,
            biberon: mlBiberon,
            commentaire,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        console.log("repas ajouté");
        setOk(true);
        setHeureRepas(new Date());
        setSelectedItem(null);
        setBiberon(false);
        setMlBiberon(null);
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className=" gap-2 ">
          <View className="flex-row items-center gap-4">
            <Text className="text-2xl">Heure du repas :</Text>
            <RNDateTimePicker
              mode="time"
              value={heureRepas}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setHeureRepas(selectedDate);
                }
              }}
            />
          </View>
          <View className="flex-row gap-10 items-center">
            <Text className="text-2xl">Humeur : </Text>
            <View className="flex-row gap-10">
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
          <View className="flex-row w-full items-center gap-4">
            <View className="flex-row  items-center">
              <Pressable onPress={() => setBiberon(!biberon)}>
                {biberon ? <SquareCheck /> : <Square />}
              </Pressable>
              <Text className="text-2xl">Biberon</Text>
            </View>

            <View className={`flex-1 ${biberon ? "visible" : "opacity-0"}`}>
              <Input
                title="ml"
                fond="sans"
                value={mlBiberon}
                onChangeText={(value) => setMlBiberon(value)}
              />
            </View>
          </View>
        </View>
        <View className="flex-grow h-15">
          <Input
            fond="sans"
            title="Commentaires"
            nbLignes={4}
            onChangeText={setCommentaire}
            value={commentaire}
          />
        </View>
        <View className=" self-center w-1/2">
          {ok && (
            <Text className="text-green-700 text-center mb-2">
              Repas ajouté
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
