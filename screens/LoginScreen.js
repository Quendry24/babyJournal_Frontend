import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params;

  const config =
    role === "parent"
      ? {
          title: "Portail parents",
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
      {role === "parent" && (
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
            {config.title}{" "}
          </Text>
          <View className="w-80 h-16 self-center mt-8 ">
            <Button
              title="Inscription"
              variant={config.variantPrimary}
              textSize="lg"
              onPress={() => navigation.navigate("SignUp", { role: "parent" })}
            />
          </View>
          <View className=" w-80 h-16 self-center mt-8">
            <Button
              title="connexion"
              variant={config.variantSecondary}
              textSize="lg"
              onPress={() => navigation.navigate("SignIn", { role: "parent" })}
            />
          </View>
        </View>
      )}

      {/* ************** PORTAIL ASSISTANTE MATERNELLE ************** */}
      {role === "nounou" && (
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
                onPress={() =>
                  navigation.navigate("SignUp", { role: "nounou" })
                }
              />
            </View>
            <View className=" w-80 h-16 self-center mt-8">
              <Button
                title="connexion"
                variant={config.variantSecondary}
                textSize="lg"
                onPress={() =>
                  navigation.navigate("SignIn", { role: "nounou" })
                }
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
