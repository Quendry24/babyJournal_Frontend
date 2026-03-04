import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { SafeAreaView } from "react-native-safe-area-context";

export default function createFamilyScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pajemploi, setPajemploi] = useState("");
  return (
  //************** Information parents **************   
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
          <Text className="text-black-300 text-4xl font-bold text-center pb-8">Informations parents</Text>
        </View>

       <View className="mb-30">
       <Input className="color-[#F9BC50]" title="Nom" value={name} onChangeText={setName} />
       <Input className="color-[#F9BC50]" title="Nom de famille" value={username} onChangeText={setUsername} />
       <Input className="color-[#F9BC50]" title="Rôle" value={role} onChangeText={setRole} />
       <Input className="color-[#F9BC50]" title="Date de naissance" value={birthday} onChangeText={setBirthday} />
       <Input className="color-[#F9BC50]" title="Adresse" value={address} onChangeText={setAddress} />
       <Input className="color-[#F9BC50]" title="N° pajemploi" value={pajemploi} onChangeText={setPajemploi} />

    
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

  //************** Information assistante maternelle ************** 
  // import { Pressable, Text, TouchableOpacity, View } from "react-native";
  // import Input from "../components/Input";
  // import ChildCard from "../components/ChildCard";
  // import { useEffect, useState } from "react";
  // import ItemDetailcard from "../components/ItemDetailCard";
  // import Button from "../components/Button";
  // import ButtonRetour from "../components/ButtonRetour";
  // import { SafeAreaView } from "react-native-safe-area-context";
  
  // export default function createFamilyScreen({ navigation }) {
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [idFamilly, setIdFamily] = useState("");
  //   return (
  //   //************** Rejoindre une famille **************   
  //     <SafeAreaView className="flex-1 p-16 bg-[#EADFD7]">
  // <View> 
  // <View className="flex-row  justify-between">
  //         <ButtonRetour
  //         title="Retour"
  //         variant="jaune"
  //         textSize="sm"/>
  //         <Text className="text-black-300 text-2xl text-right font-bold pb-16">Baby Journal</Text>
  //  </View>
  //         <View>
  //           <Text className="text-black-300 text-4xl font-bold text-center pb-24">Rejoindre une famille</Text>
  //         </View>
  
  //        <View className="mb-30">
  //        <Input className="color-[#F9BC50]" title="Email" value={email} onChangeText={setEmail} />
  //        <Input className="color-[#F9BC50]" title="ID de la famille" value={idFamilly} onChangeText={setIdFamily} />
  //       <Input
  //           title="Password"
  //           value={password}
  //           onChangeText={setPassword}
  //           isPassword={true}
  //         />
      
  //       </View>
  //             <View className="pb_32">
  //                   <Button
  //                     title="Se connecter"
  //                     variant="jaune"
  //                     textSize="lg"
  //                     onPress={() => navigation.navigate("Home")}
  //                   />
   
  //       </View>
  //             </View>
  //     </SafeAreaView>
  //   )
  // }  
