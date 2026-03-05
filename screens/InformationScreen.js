import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";

export default function InformationScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  //const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pajemploi, setPajemploi] = useState("");
  const [agrement, setAgrement] = useState("");

  const { role } = route.params;

  return (
    //************** Information parent **************
    <>
      {role === "parent" && (
        <View className="flex-1 p-16 bg-back">
          <View className="flex-row  justify-between">
            <ButtonRetour
              title="Retour"
              variant="jaune"
              textSize="sm"
              onPress={() => navigation.goBack()}
            />
            <Text className="text-2xl text-right font-bold pb-16">
              Baby Journal
            </Text>
          </View>
          <View>
            <Text className="text-4xl font-bold text-center pb-8">
              Informations parents
            </Text>
          </View>

          <View className="mb-30">
            <Input
              className="color-[#F9BC50]"
              title="Nom"
              value={name}
              onChangeText={setName}
            />
            <Input
              className="jaune"
              title="Prénom"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              className="jaune"
              title="Rôle"
              value={role}
              onChangeText={setRole}
            />
            <Input
              className="jaune"
              title="Date de naissance"
              value={birthday}
              onChangeText={setBirthday}
            />
            <Input
              className="jaune"
              title="Adresse"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              className="jaune"
              title="N° pajemploi"
              value={pajemploi}
              onChangeText={setPajemploi}
            />
          </View>
          <View className="w-80 h-16 self-center mt-8">
            <Button
              title="Se connecter"
              variant="jaune"
              textSize="lg"
              onPress={() => navigation.navigate("Profil", { role: "parent" })}
            />
          </View>
        </View>
      )}
      {/* ************** Information parent ************** */}

      {role === "nounou" && (
        <View className="flex-1 p-16 bg-back">
          <View className="flex-row  justify-between">
            <ButtonRetour
              title="Retour"
              variant="jaune"
              textSize="sm"
              onPress={() => navigation.goBack()}
            />
            <Text className="text-2xl text-right font-bold pb-16">
              Baby Journal
            </Text>
          </View>
          <View>
            <Text className="text-4xl font-bold text-center pb-8">
              Informations Assistante maternelle
            </Text>
          </View>

          <View className="mb-30">
            <Input
              className="ter"
              title="Nom"
              value={name}
              onChangeText={setName}
            />
            <Input
              className="ter"
              title="Prénom"
              value={username}
              onChangeText={setUsername}
            />

            <Input
              className="ter"
              title="Date de naissance"
              value={birthday}
              onChangeText={setBirthday}
            />
            <Input
              className="ter"
              title="Adresse"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              className="ter"
              title="Contact"
              value={contact}
              onChangeText={setContact}
            />
            <Input
              className="ter"
              title="Agrément"
              value={agrement}
              onChangeText={setagrement}
            />
          </View>
          <View className="w-80 h-16 self-center mt-8">
            <Button
              title="Se connecter"
              variant="jaune"
              textSize="lg"
              onPress={() => navigation.navigate("Profil", { role: "nounou" })}
            />
          </View>
        </View>
      )}
    </>
  );
}
