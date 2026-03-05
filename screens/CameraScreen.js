import { CameraView, Camera } from "expo-camera";
import { View, Text, Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Circle, X, SwitchCamera } from "lucide-react-native";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [facing, setFacing] = useState("back");

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);
  if (!hasPermission) {
    return <View />;
  }
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    photo && console.log(photo);
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
        <Circle
          className="items-center"
          size={75}
          color="white"
          onPress={takePicture}
        />
      </View>
    </CameraView>
  );
}
