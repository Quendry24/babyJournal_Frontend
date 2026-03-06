import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useState } from "react";
import Button from "../components/Button";
import { ChevronLeft, Ellipsis } from "lucide-react-native";

export default function FolderScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { width } = Dimensions.get("window");
  const photosData = [
    "https://images.pexels.com/photos/3845492/pexels-photo-3845492.jpeg",
    "https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg",
    "https://images.pexels.com/photos/1724173/pexels-photo-1724173.jpeg",
    "https://images.pexels.com/photos/774910/pexels-photo-774910.jpeg",
    "https://images.pexels.com/photos/2505101/pexels-photo-2505101.jpeg",
    "https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg",
    "https://images.pexels.com/photos/266004/pexels-photo-266004.jpeg",
    "https://images.pexels.com/photos/2869315/pexels-photo-2869315.jpeg",
    "https://images.pexels.com/photos/1735742/pexels-photo-1735742.jpeg",
    "https://images.pexels.com/photos/421884/pexels-photo-421884.jpeg",
    "https://images.pexels.com/photos/37664/pexels-photo-37664.jpeg",
    "https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg",
    "https://images.pexels.com/photos/803277/pexels-photo-803277.jpeg",
    "https://images.pexels.com/photos/1470677/pexels-photo-1470677.jpeg",
    "https://images.pexels.com/photos/62272/pexels-photo-62272.jpeg",
    "https://images.pexels.com/photos/421884/pexels-photo-421884.jpeg",
    "https://images.pexels.com/photos/3845492/pexels-photo-3845492.jpeg",
    "https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg",
    "https://images.pexels.com/photos/1724173/pexels-photo-1724173.jpeg",
    "https://images.pexels.com/photos/774910/pexels-photo-774910.jpeg",
    "https://images.pexels.com/photos/2505101/pexels-photo-2505101.jpeg",
    "https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg",
    "https://images.pexels.com/photos/266004/pexels-photo-266004.jpeg",
    "https://images.pexels.com/photos/2869315/pexels-photo-2869315.jpeg",
    "https://images.pexels.com/photos/1735742/pexels-photo-1735742.jpeg",
    "https://images.pexels.com/photos/421884/pexels-photo-421884.jpeg",
    "https://images.pexels.com/photos/37664/pexels-photo-37664.jpeg",
    "https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg",
    "https://images.pexels.com/photos/803277/pexels-photo-803277.jpeg",
    "https://images.pexels.com/photos/1470677/pexels-photo-1470677.jpeg",
    "https://images.pexels.com/photos/62272/pexels-photo-62272.jpeg",
    "https://images.pexels.com/photos/421884/pexels-photo-421884.jpeg",
    "https://images.pexels.com/photos/3845492/pexels-photo-3845492.jpeg",
    "https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg",
    "https://images.pexels.com/photos/1724173/pexels-photo-1724173.jpeg",
  ];
  const images = photosData.map((url) => ({ source: { uri: url } }));
  const show = (index) => {
    setSelectedIndex(index);
    setVisible(true);
  };
  const hide = () => setVisible(false);
  const photos = photosData.map((data, i) => {
    return (
      <Pressable key={i} className="items-center w-1/4" onPress={() => show(i)}>
        <Image source={{ uri: data }} className="w-full aspect-square" />
      </Pressable>
    );
  });

  return (
    <>
      <View className="flex-1 pt-16 bg-back">
        <Text className="pt-4 pb-2 text-center text-black text-4xl font-bold">
          Documents
        </Text>

        <Text className="text-2xl pl-4 pb-4">Fichiers</Text>
        <Text className="text-2xl pl-4 pb-4">Photos</Text>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
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
              {photosData.map((uri, i) => (
                <View
                  key={i}
                  style={{
                    width,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}
