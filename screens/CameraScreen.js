import { CameraView, Camera } from "expo-camera";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Circle, X, SwitchCamera, Baby } from "lucide-react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, addPhoto2 } from "../reducers/user";
import Button from "../components/Button";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [facing, setFacing] = useState("back");
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const todayChilds = useSelector((state) => state.user.value.today);
  const famille = useSelector((state) => state.user.value.famille);
  const [photoUrl, setPhotoUrl] = useState("");
  console.log("tc", todayChilds, "f", famille);
  const [choixPossible, setChoixPossible] = useState(false);
  const [enfants, setEnfants] = useState([]);
  console.log(todayChilds);
  useEffect(() => {
    const enfantsPossible = [
      ...(famille || []).map((e) => ({
        prenom: e.Prenom,
        idBabyJournal: e.idBabyJournal,
      })),
      ...(todayChilds || []).map((e) => ({
        prenom: e.Prenom,
        idBabyJournal: e.idBabyJournal,
      })),
    ];
    setEnfants(enfantsPossible);
  }, []);

  console.log(enfants);
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    console.log("bouton cliqué");
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    console.log("photo prise");
    setModalVisible(true);

    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    console.log("envoi au backend");
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setChoixPossible(true);

          console.log("Photo ajoutée :", photo.uri, data.url, data.result);
          setPhotoUrl(data.url);
          dispatch(addPhoto(data.url));
        }
      });
  };

  const addPhotoToDoc = (id) => {
    console.log("photourl", photoUrl);
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/addToDoc/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photoUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setModalVisible(false);
          navigation.navigate("Folder");
        }
      });
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      ref={(ref) => (cameraRef.current = ref)}
      facing={facing}
    >
      <View className="flex-row pt-16 justify-between mx-8">
        <Pressable onPress={() => navigation.goBack()}>
          <X color="white" size={40} />
        </Pressable>
        <Pressable>
          <SwitchCamera color="white" size={40} onPress={toggleCameraFacing} />
        </Pressable>
      </View>
      <View className="absolute bottom-16 self-center">
        <TouchableOpacity onPress={takePicture}>
          <Circle className="items-center" size={75} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="items_center justify-center gap-2 p-4 aspect-square w-5/6 bg-white rounded-3xl border-4 border-jaune elevation-3">
              <Text className="text-2xl text-center ">
                Attribuer cette photo à un enfant
              </Text>
              {!choixPossible && (
                <Text className="text-center">
                  Chargement des enfants en cours ...
                </Text>
              )}
              {choixPossible && (
                <View className="flex-row gap-10 items-center justify-center flex-wrap">
                  {enfants.map((data, i) => (
                    <Pressable
                      key={i}
                      className="items-center "
                      onPress={() => {
                        addPhotoToDoc(data.idBabyJournal);
                      }}
                    >
                      <View className="border-4 border-jaune rounded-full">
                        <Baby color="gray" size={48} />
                      </View>
                      <Text className="text-xl">{data.prenom}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </CameraView>
  );
}
