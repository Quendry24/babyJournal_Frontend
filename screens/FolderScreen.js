import * as react from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Button from "../components/Button";
import { ChevronLeft, Ellipsis, Trash2 } from "lucide-react-native";
import { removePhoto } from "../reducers/user";
import ProFolder from "../components/ProFolder";

export default function FolderScreen() {
  const user = useSelector((state) => state.user.value.type);

  const [visible, setVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  //const user = useSelector((state) => state.user.value);
  console.log("User type:", user);
  const { width } = Dimensions.get("window");
  const photosData = useSelector((state) => state.user?.value?.photos);

  console.log("photos", photosData);
  const show = (index) => {
    setSelectedIndex(index);
    setVisible(true);
  };
  const hide = () => setVisible(false);

  const photos = photosData?.map((data, i) => {
    console.log("data", data);
    return (
      <Pressable key={i} className="items-center w-1/4" onPress={() => show(i)}>
        <Image source={{ uri: data }} style={{ width: 100, height: 100 }} />
      </Pressable>
    );
  });

  return (
    <View className="flex-1">
      {user === "nounou" && (
        <View className="flex-1 pt-16 bg-back ">
          <ProFolder />
        </View>
      )}
      {user === "parents" && (
        <View className="flex-1 pt-16 bg-back">
          <Text className="pt-4 pb-2 text-center text-black text-4xl font-bold">
            Documents
          </Text>

          <Text className="text-2xl pl-4 pb-4">Fichiers</Text>
          <Text className="text-2xl pl-4 pb-4">Photos</Text>
          <ScrollView
            contentContainerStyle={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flexWrap: "wrap",
              paddingBottom: 180,
              width: "100%",
            }}
          >
            {photos}
          </ScrollView>
          <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-back">
              <View className="mt-16 flex-row justify-between mx-4">
                <View className="w-10 aspect-square">
                  <Button
                    title={<ChevronLeft color="white" />}
                    textSize="xl"
                    onPress={hide}
                  />
                </View>

                <View className=" self-center">
                  <Text className=" font-semibold text-xl text-center">
                    12 mars 2026
                  </Text>
                  <Text className="text-center">11:11</Text>
                </View>
                <View className="w-10 aspect-square">
                  <Button title={<Ellipsis color="white" />} textSize="xl" />
                </View>
              </View>
              <ScrollView
                horizontal
                pagingEnabled
                contentOffset={{ x: selectedIndex * width, y: 0 }}
                showsHorizontalScrollIndicator={false}
              >
                {photosData?.map((uri, i) => (
                  <View
                    key={i}
                    style={{
                      width,
                      maxWidth: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: 120,
                      paddingTop: 10,
                    }}
                  >
                    <Image
                      source={{ uri }}
                      style={{
                        width: width,
                        height: "90%",
                      }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  position: "absolute",
                  bottom: 60,
                  alignSelf: "center",
                }}
              >
                <Button
                  title={<Trash2 color="white" />}
                  textSize="xl"
                  onPress={() => {
                    dispatch(removePhoto(photosData[selectedIndex]));
                    hide();
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
