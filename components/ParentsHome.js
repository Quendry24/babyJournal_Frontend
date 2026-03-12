import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Send } from "lucide-react-native";
import { ArrowLeft } from "lucide-react-native";
import ChildCard from "./ChildCard";
import ItemDetail from "./ItemDetail";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddChild from "./AddChild";
import ButtonRetour from "./ButtonRetour";
import Input from "./Input";
import { famille } from "../reducers/user";

export default function ParentsHome({ onSelectChild }) {
  //Remplacement tableau dur
  const [child, setChild] = useState([]);
  const [addChild, setAddchild] = useState(false);
  const idFamille = useSelector((state) => state.user.value.idFamille);
  console.log(child);

  //pour ajout enfant
  const [modalVisible, setModalVisible] = useState(false);
  const [inputIdBabyJournal, setInputIdBabyJournal] = useState("");
  const [error, setError] = useState("");
  const [infoEnfant, setInfoEnfant] = useState(null);
  const [newChild, setNewChild] = useState(null);
  const dispatch = useDispatch();
  console.log(idFamille);

  useEffect(() => {
    if (!idFamille) return;
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/famille/${idFamille}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChild(data.enfants);
        dispatch(famille(data.enfants));
      })
      .catch((error) => console.log(error));
  }, [idFamille]);

  const allChild = child?.map((data, i) => (
    <ChildCard
      key={i}
      name={data.Prenom}
      birthDate={data.Birthday}
      jours={data.jours}
      idBabyJournal={data.idBabyJournal}
      onPress={() => onSelectChild(data)}
    />
  ));

  //verifie si l'id est correct et renvoie les données entrées par la nounou
  const ajout = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/${inputIdBabyJournal}`,
      );
      const data = await res.json();

      if (data.result) {
        ajoutFamille(data.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ajoute la famlle à l'enfant dans mongo et l'enfant a la famille dans le reducer
  const ajoutFamille = async (data) => {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/addToFamilly/${inputIdBabyJournal}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idFamille,
        }),
      },
    );
    const retour = await res.json();
    if (retour.result) {
      setChild([...child, data]);
      setNewChild(data);
      setAddchild(true);
      setModalVisible(!modalVisible);
    }
  };

  return (
    <View className="flex-1 gap-2">
      {!addChild && (
        <>
          <View className="pr-4 flex-row justify-end ">
            <Pressable>
              <Send />
            </Pressable>
          </View>
          <Text className=" pt-4 pb-10 text-center text-black text-4xl font-bold">
            Ma Famille
          </Text>

          <ScrollView contentContainerStyle={{ paddingBottom: 240 }}>
            <View className="gap-8">{allChild}</View>

            <Pressable className="items-center pt-4 "></Pressable>
            <View className="w-1/2 self-center h-16 mt-4">
              <Button
                title="Ajouter un enfant"
                textSize="xl"
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 items-center justify-center">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="items_center justify-center gap-2 p-4 aspect-square w-5/6 bg-white rounded-3xl border-4 border-jaune elevation-3">
                <Text className="text-2xl text-center">
                  Entrer l'identifiant BabyJournal de votre enfant
                </Text>
                <Input
                  title="Identifiant"
                  fond="sans"
                  value={inputIdBabyJournal}
                  onChangeText={(value) => setInputIdBabyJournal(value)}
                />
                {error && (
                  <Text className="text-xl text-center text-red-600 mb-2">
                    Identifiant inconnu
                  </Text>
                )}
                <View className="w-1/2 h-12 self-center">
                  <Button
                    title="Ajouter"
                    onPress={() => {
                      ajout();
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {addChild && (
        <>
          <ButtonRetour
            onPress={() => {
              setAddchild(false);
            }}
          />
          <AddChild infos={newChild} />
        </>
      )}
    </View>
  );
}
