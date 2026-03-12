import { View, Text, Pressable, ScrollView } from "react-native";
import ButtonRetour from "../components/ButtonRetour";
import { useSelector, useDispatch } from "react-redux";
import AddChild from "../components/AddChild";
import Button from "../components/Button";
import { useState } from "react";
import { logout, setUserType } from "../reducers/user";

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.type);
  const idNounou = useSelector((state) => state.user.value.userId);
  const allChild = useSelector((state) => state.user.value.all);
  const idFamille = useSelector((state) => state.user.value.idFamille);
  const famille = useSelector((state) => state.user.value.famille);
  const [add, setAdd] = useState(false);
  console.log(famille);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Welcome");
  };

  return (
    <View className="flex-1 bg-back p-4 pt-16">
      {user === "parents" && (
        <View className="flex-1  gap-4">
          <Pressable className="">
            <ButtonRetour onPress={() => navigation.navigate("Home")} />
          </Pressable>
          <View className="flex-1 items-center  gap-4">
            <Text className="border-b-2 border-jaune w-full pt-4 pb-2 text-center text-black text-4xl font-bold">
              Paramètres
            </Text>
            <Text className="text-3xl">Partager mon Baby Journal</Text>
            <Text className="text-2xl">
              Identifiant de ma famille : {idFamille}
            </Text>
            <View className="border-t-2 border-b-2 border-jaune w-full">
              <Text className="text-3xl text-center">Ma famille</Text>
              {famille?.map((data, i) => (
                <Text key={i} className="text-2xl text-center">
                  {data.Prenom} - id : {data.idBabyJournal}
                </Text>
              ))}
            </View>
            <View className="h-16 w-2/3 ">
              <Button
                title="Deconnexion"
                variant="outlineJaune"
                onPress={() => handleLogout()}
              />
            </View>
          </View>
        </View>
      )}

      {user === "nounou" && (
        <View className="flex-1 gap-4 items-center justify-around mb-60">
          <Text className="text-3xl font-bold text-center">Paramètres</Text>
          <View className="border-b-2 w-full border-ter"></View>
          <Text className="text-xl">Id Nounou : {idNounou}</Text>
          <View className="border-b-2 w-full border-ter"></View>
          {!add && (
            <>
              <View className=" w-full items-center">
                <Text className="text-2xl">Mes enfants :</Text>
                {allChild?.map((data, i) => (
                  <View key={i} className="flex-row">
                    <Text className="text-xl">{data.Prenom}</Text>
                    <Text className="text-xl">
                      {" "}
                      - Id : {data.idBabyJournal}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="border-b-2 w-full border-ter "></View>
              <View className="pt-36 w-full items-center gap-4">
                <View className="h-16 w-2/3 ">
                  <Button
                    variant="ter"
                    title="Ajouter un enfant"
                    onPress={() => setAdd(true)}
                  />
                </View>
                <View className="h-16 w-2/3 ">
                  <Button
                    title="Deconnexion"
                    variant="outlineTer"
                    onPress={() => handleLogout()}
                  />
                </View>
              </View>
            </>
          )}
          {add && (
            <>
              <AddChild add={add} setAdd={setAdd} />
            </>
          )}
        </View>
      )}
    </View>
  );
}
