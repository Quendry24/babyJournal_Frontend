import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }) {
  return (

  //************** PORTAIL PARENT **************     
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
          <Text className="text-black-300 text-4xl text-center pb-24">J'accède à mon carnet de liaison</Text>
          <Text className="text-black-300 text-xl font-bold text-center pb-72">Portail parent</Text>
        </View>

          <View className="flex-1 items-center justify-center">
            <Text>IMAGE</Text>
    {/* Image ici */}
  </View>
        <View className="pb_24">
          <Button
            title="Inscription"
            variant="jaune"
            textSize="lg"
            onPress={() => navigation.navigate("Home")}
          />
          <Button
            title="connexion"
            variant="outlineJaune"
            textSize="lg"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );

  //************** PORTAIL ASSISTANTE MATERNELLE ************** 
  return (
      <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">
        <View>
  <View className="flex-row  justify-between">
          <ButtonRetour
          title="Retour"
          variant="ter"
          textSize="sm"/>
          <Text className="text-black-300 text-2xl text-right font-bold pb-16">Baby Journal</Text>
   </View>
          <View>
            <Text className="text-black-300 text-3xl text-center pb-24">J'accède à mon carnet de liaison</Text>
            <Text className="text-black-300 text-xl font-bold text-center pb-72">Portail assistante maternelle</Text>
          </View>
  
            <View className="flex-1 items-center justify-center">
              <Text>IMAGE</Text>
      {/* Image ici */}
    </View>
          <View className="pb_24">
            <Button
              title="Inscription"
              variant="ter"
              textSize="lg"
              onPress={() => navigation.navigate("Home")}
            />
            <Button
              title="connexion"
              variant="outlineTer"
              textSize="lg"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  
}