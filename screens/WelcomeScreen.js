import { Pressable, Text, View } from "react-native";
import Button from "../components/Button";

export default function WelcomeScreen({ navigation }) {
  return (
    <>
      <View className="flex-1 p-4 pt-16 bg-back">
        <Text className="text-black-300 text-3xl text-center font-bold pb-16">
          Baby Journal
        </Text>
        <Text className="text-black-300 text-2xl text-center">
          Bienvenue dans votre carnet de transmission digital
        </Text>
        <View>{/* image  */}</View>

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
      <Pressable
        className="absolute bottom-0 right-0 h-20 p-4  border bg-back"
        onPress={() => navigation.navigate("TabNavigator", { user: "Pro" })}
      >
        <Text className=" text-3xl pb-4">Pro</Text>
      </Pressable>
      <Pressable
        className="absolute bottom-0 h-20 p-4 border bg-back"
        onPress={() => navigation.navigate("TabNavigator", { user: "Parents" })}
      >
        <Text className="text-3xl pb-4">Parents</Text>
      </Pressable>
    </>
  );
}
