//import ChildCard from "../components/ChildCard";
//import { useEffect, useState } from "react";
//import ItemDetailcard from "../components/ItemDetailCard";

import { Text, View } from "react-native";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import Button from "../components/Button";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">
      <View>

        <Text className="text-black-300 text-3xl text-center font-bold pb-16">
          Baby Journal
        </Text>
        <Text className="text-black-300 text-2xl text-center mb-72">
          Bienvenue dans votre carnet de transmission digital
        </Text>
<View >
  {/* image  */}
</View>

        <View className="flex-1 items-center justify-center">
          <Text>IMAGE</Text>
          {/* Image ici */}
        </View>

        <View className="pb-8 space-y-4">

          <Button
            title="Je suis parent"
            variant="jaune"
            textSize="lg"
            onPress={() => navigation.navigate("LoginScreen")}
          />

          <Button
            title="Je suis assistante maternelle"
            variant="ter"
            textSize="lg"
            onPress={() => navigation.navigate("Home")}
          />

        </View>

      </View>
    </SafeAreaView>
  );
}




//   const [password, setPassword] = useState("");
//   const [nom, setNom] = useState("");

//   return (
//     <Pressable
//       className="flex-1 p-4 pt-16 bg-back "
//       onPress={() => navigation.navigate("TabNavigator")}
//     >
//       <Text className="text-green-500 text-3xl pb-4">WelcomeScreen</Text>
//       <View className="border ">
//         <Input title="Nom" value={nom} onChangeText={setNom} />
//         <Input
//           title="Password"
//           value={password}
//           onChangeText={setPassword}
//           isPassword={true}
//         />
//       </View>
//       <ItemDetailcard />
//     </Pressable>
//   );
// }
