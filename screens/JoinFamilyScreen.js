import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { SafeAreaView } from "react-native-safe-area-context";

export default function createFamilyScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idFamilly, setIdFamily] = useState("");
  return (
  //************** Rejoindre une famille **************   
    <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">
<View> 
<View className="flex-row  justify-between">
        <ButtonRetour
        title="Retour"
        variant="jaune"
        textSize="sm"/>
        <Text className="text-black-300 text-2xl text-right font-bold pb-16">Baby Journal</Text>
 </View>
        <View>
          <Text className="text-black-300 text-4xl font-bold text-center pb-24">Rejoindre une famille</Text>
        </View>

       <View className="mb-30">
       <Input className="color-[#F9BC50]" title="Email" value={email} onChangeText={setEmail} />
       <Input className="color-[#F9BC50]" title="ID de la famille" value={idFamilly} onChangeText={setIdFamily} />
      <Input
          title="Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />
    
      </View>
            <View className="pb_32">
                  <Button
                    title="Se connecter"
                    variant="jaune"
                    textSize="lg"
                    onPress={() => navigation.navigate("Home")}
                  />
 
      </View>
            </View>
    </SafeAreaView>
  )
}