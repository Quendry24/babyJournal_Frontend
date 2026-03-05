import "./global.css";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import CreateFamilyScreen from "./screens/CreateFamilyScreen";
import SignUpScreen from "./screens/SignUpScreen";
import JoinFamilyScreen from "./screens/JoinFamilyScreen";
import InformationScreen from "./screens/InformationScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { LinearGradient } from "expo-linear-gradient";
import FolderScreen from "./screens/FolderScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const user = route?.params?.user;

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Calendar") {
            iconName = "calendar";
          } else if (route.name === "Folder") {
            iconName = "folder";
          } else if (route.name === "Settings") {
            iconName = "gear";
          } else if (route.name === "Plus") {
            iconName = "plus";
          }

          if (route.name === "Plus") {
            return (
              <LinearGradient
                colors={["transparent", "transparent", "#EADFD7", "#EADFD7"]}
                locations={[0, 0.49, 0.49, 1]}
                style={{
                  position: "absolute",
                  bottom: 30,
                  width: 74,
                  height: 74,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 40,
                    backgroundColor: "#F9BC50",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name={iconName}
                    size={24}
                    color="white"
                    style={
                      focused ? { transform: [{ rotate: "45deg" }] } : undefined
                    }
                  />

                  {focused && (
                    <View style={{ position: "absolute" }}>
                      <FontAwesome
                        name="phone"
                        size={22}
                        color="white"
                        style={{ position: "absolute", bottom: 24, right: 34 }}
                      />

                      <Pressable onPress={() => navigation.navigate("Camera")}>
                        <FontAwesome
                          name="camera"
                          size={22}
                          color="white"
                          style={{
                            position: "absolute",
                            bottom: 34,
                            left: -12,
                          }}
                        />
                      </Pressable>

                      <FontAwesome
                        name="send"
                        size={22}
                        color="white"
                        style={{ position: "absolute", bottom: 24, left: 34 }}
                      />
                    </View>
                  )}
                </View>
              </LinearGradient>
            );
          }
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FontAwesome name={iconName} size={24} color={color} />

              {focused && (
                <View
                  style={{
                    position: "absolute",
                    width: 35,
                    height: 3,
                    backgroundColor: "#F9BC50",
                    borderRadius: 3,
                    bottom: -22,
                  }}
                />
              )}
            </View>
          );
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          height: 68,
          marginHorizontal: 16,
          marginBottom: 34,
          borderRadius: 24,
          paddingTop: 0,
          paddingBottom: 0,
          boxShadow: " 0px 5px 5px rgba(0,0,0,0.25)",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarActiveTintColor: "#F9BC50",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar" component={ProfileScreen} />
      <Tab.Screen name="Plus" component={ProfileScreen} />
      <Tab.Screen name="Folder" component={FolderScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CreateFamily" component={CreateFamilyScreen} />
        <Stack.Screen name="JoinFamily" component={JoinFamilyScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />

        <Stack.Screen name="TabNavigator" component={TabNavigator} />

        {/* Les écrans du bouton + */}
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
