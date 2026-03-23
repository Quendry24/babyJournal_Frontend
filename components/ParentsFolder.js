import {
  ScrollView,
  Text,
  View,
  Pressable,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Baby,
  Images,
  FileText,
  ChevronLeft,
  Ellipsis,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import Button from "./Button";
import { removePhoto } from "../reducers/user";

export default function ParentsFolder() {
  const allChilds = useSelector((state) => state.user.value.famille);

  const [photos, setPhotos] = useState([]);
  const [enfant, setEnfant] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("grille");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const { width } = Dimensions.get("window");

  const hide = () => {
    if (mode === "zoom") {
      setMode("grille");
    } else {
      setModalVisible(false);
    }
  };

  const openPhotos = (id, child) => {
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setPhotos(data.photos);
          setMode("grille");
          setModalVisible(true);
          setEnfant(child);
        }
      });
  };

  const openPicture = (index) => {
    setSelectedIndex(index);
    setMode("zoom");
  };

  const deletePhoto = () => {
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/photo/${photos?.[selectedIndex]?._id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          const updatedPhotos = photos.filter(
            (e) => e !== photos[selectedIndex],
          );
          setPhotos(updatedPhotos);
          hide();
        }
      });
  };

  const cards = allChilds?.map((data, i) => (
    <View
      key={i}
      className="w-['44%'] border-2 border-jaune rounded-3xl p-4 gap-4 bg-white items-center m-2"
    >
      <View className="items-center gap-4 w-full">
        <View className="items-center gap-2">
          <View className="border-4 border-jaune rounded-full w-16 h-16 overflow-hidden">
            <Baby color="gray" size={48} />
          </View>

          <Text className="text-2xl font-bold">{data.Prenom}</Text>
        </View>

        <View className="flex-row w-full justify-around">
          <Images
            color="#F9BC50"
            size={36}
            onPress={() => openPhotos(data.idBabyJournal, data.Prenom)}
          />
          <FileText color="#F9BC50" size={36} />
        </View>
      </View>
    </View>
  ));

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text className="py-4 text-3xl font-bold text-center">Documents</Text>

        <View className="border-b-2 w-full border-jaune mb-4"></View>

        <View className="px-4 pb-10 flex-row flex-wrap items-center">
          {cards}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-back pt-16">
          {mode === "grille" && (
            <>
              <Text className="absolute top-16 self-center text-4xl font-semibold">
                Galerie de {enfant}
              </Text>
              <View className="mt-16 flex-row items-center px-4 gap-4">
                <View className="w-10 aspect-square mb-4">
                  <Button
                    title={<ChevronLeft color="white" />}
                    textSize="xl"
                    onPress={hide}
                  />
                </View>
              </View>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  paddingBottom: 120,
                }}
              >
                {photos.map((photo, i) => (
                  <Pressable
                    key={i}
                    className="w-1/3 p-1"
                    onPress={() => openPicture(i)}
                  >
                    <Image
                      source={{ uri: photo.url }}
                      style={{
                        width: "100%",
                        height: 120,
                        borderRadius: 10,
                      }}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}

          {mode === "zoom" && (
            <>
              <View className="mt-16 flex-row justify-between px-4">
                <View className="w-10 aspect-square">
                  <Button
                    title={<ChevronLeft color="white" />}
                    textSize="xl"
                    onPress={hide}
                  />
                </View>

                <View className=" self-center">
                  <Text className="font-semibold text-xl text-center">
                    {new Date(
                      photos[selectedIndex]?.Date_de_creation,
                    ).toLocaleDateString()}
                  </Text>

                  <Text className="text-center">
                    {new Date(
                      photos[selectedIndex]?.Date_de_creation,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
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
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / width,
                  );
                  setSelectedIndex(index);
                }}
              >
                {photos?.map((photo, i) => (
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
                      source={{ uri: photo.url }}
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
                    deletePhoto();
                  }}
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
