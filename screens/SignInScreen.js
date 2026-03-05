import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen({ navigation }) {
  return (
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    //************** SIGNIN PARENT **************
    <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">
      <View>
        <View className="flex-row  justify-between">
          <ButtonRetour title="Retour" variant="jaune" textSize="sm" />
          <Text className="text-black-300 text-2xl text-right font-bold pb-16">
            Baby Journal
          </Text>
        </View>
        <View>
          <Text className="text-black-300 text-4xl font-bold text-center pb-24">
            Inscription
          </Text>
          <Text className="text-black-300 text-xl font-bold text-center pb-1 m-4">
            Vous voulez créer une famille ?
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text>IMAGE</Text>
          {/* Image ici */}
        </View>
        <View className="pb_32">
          <Button
            title="Je créer une famille"
            variant="jaune"
            textSize="lg"
            onPress={() => navigation.navigate("Home")}
          />

          <View className="h-[1px] bg-gray-300 w-full my-16" />

          <Text className="text-black-300 text-xl font-bold text-center pb-1 m-4">
            {" "}
            Vous voulez rejoindre une famille existante ?
          </Text>
          <Button
            title="Rejoindre une famille"
            variant="outlineJaune"
            textSize="lg"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
//************** SIGNIN ASSISTANTE MATERNELLE **************

// {/* <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">

//       <View>
// <View className="flex-row  justify-between">
//         <ButtonRetour
//         title="Retour"
//         variant="ter"
//         textSize="sm"/>
//         <Text className="text-black-300 text-2xl text-right font-bold pb-16">Baby Journal</Text>
//  </View>
//         <View>
//           <Text className="text-black-300 text-4xl font-bold text-center pb-24">Inscription</Text>
//           {/* <Text className="text-black-300 text-xl font-bold text-center pb-1 m-4">Vous voulez créer une famille ?</Text> */}
//         </View>

//       <View className="mb-30">
//         <Input title="Email" value={email} onChangeText={setEmail} />
//         <Input
//           title="Password"
//           value={password}
//           onChangeText={setPassword}
//           isPassword={true}
//         />

//           <Button
//             title="Créer mon profil pro"
//             variant="ter"
//             textSize="lg"
//             onPress={() => navigation.navigate("Home")}
//           />
//       </View>
//       </View>
//     </SafeAreaView>
//   );

// } */}
