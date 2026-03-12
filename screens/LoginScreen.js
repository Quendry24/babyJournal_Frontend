import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "../reducers/user";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.type);

  const config =
    user === "parents"
      ? {
          title: "Portail parent",
          variantPrimary: "jaune",
          variantSecondary: "outlineJaune",
        }
      : {
          title: "Portail Assistante maternelle",
          variantPrimary: "ter",
          variantSecondary: "outlineTer",
        };

  return (
    <>
      {user === "parents" && (
        //************** PORTAIL PARENT **************
        <View className="flex-1 pt-16 px-8 bg-back">
          <View className="flex-row  justify-between">
            <ButtonRetour
              title="Retour"
              variant={config.variantPrimary}
              textSize="sm"
              onPress={() => navigation.goBack()}
            />
            <Text className="text-xl text-right font-bold pb-16">
              Baby Journal
            </Text>
          </View>
          <View className="gap-16 ">
            <Text className=" text-4xl text-center pb-8">
              J'accède à mon carnet de liaison
            </Text>
          </View>

          <Text className=" text-xl h-96 font-bold text-center">
            {config.title}
          </Text>
          <View className="w-80 h-16 self-center mt-8 ">
            <Button
              title="Inscription"
              variant={config.variantPrimary}
              textSize="lg"
              onPress={() => {
                dispatch(setUserType);

                navigation.navigate("SignUp");
              }}
            />
          </View>
          <View className=" w-80 h-16 self-center mt-8">
            <Button
              title="connexion"
              variant={config.variantSecondary}
              textSize="lg"
              onPress={() => {
                dispatch(setUserType("parents"));

                navigation.navigate("SignIn");
              }}
            />
          </View>
        </View>
      )}

      {/* ************** PORTAIL ASSISTANTE MATERNELLE ************** */}
      {user === "nounou" && (
        <View className="flex-1 pt-16 px-8 bg-back">
          <View>
            <View className="flex-row  justify-between">
              <ButtonRetour
                title="Retour"
                variant={config.variantPrimary}
                textSize="sm"
                onPress={() => navigation.goBack()}
              />
              <Text className="text-black-300 text-2xl text-right font-bold pb-16">
                Baby Journal
              </Text>
            </View>
            <View>
              <Text className="text-3xl text-center pb-24">
                J'accède à mon carnet de liaison
              </Text>
              <Text className="text-xl font-bold text-center pb-72">
                Portail assistante maternelle
              </Text>
            </View>

            <View className="w-80 h-16 self-center mt-8 ">
              <Button
                title="Inscription"
                variant={config.variantPrimary}
                textSize="lg"
                onPress={() => {
                  dispatch(setUserType("nounou"));
                  navigation.navigate("SignUp");
                }}
              />
            </View>
            <View className=" w-80 h-16 self-center mt-8">
              <Button
                title="connexion"
                variant={config.variantSecondary}
                textSize="lg"
                onPress={() => {
                  dispatch(setUserType("nounou"));
                  navigation.navigate("SignIn");
                }}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
