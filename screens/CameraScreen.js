import { CameraView, Camera } from "expo-camera";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Circle, X, SwitchCamera } from "lucide-react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addPhoto, addPhoto2 } from "../reducers/user";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [facing, setFacing] = useState("back");
  const dispatch = useDispatch();

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
          console.log("Photo ajoutée :", photo.uri, data.url, data.result);
          dispatch(addPhoto(data.url));
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
    </CameraView>
  );
}
