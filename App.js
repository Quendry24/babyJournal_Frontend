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

//redux
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "./reducers/user";
import parent from "./reducers/parent";
import nounou from "./reducers/nounou";

const reducers = combineReducers({ user });
const persistConfig = { key: "BabyJournal", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import { useState } from "react";
import CameraScreen from "./screens/CameraScreen";
import { Camera, Phone, Send } from "lucide-react-native";

//déplacer les import camera et provider avec les autres imports + rajouter <Provider store={store}> autour de la fontion App

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const [plus, setPlus] = useState(false);

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
              <View
                style={{
                  position: "relative",
                  overflow: "visible",
                  width: "auto",
                  bottom: 0,
                }}
              >
                {plus && (
                  <View
                    style={{
                      position: "absolute",
                      width: 74,
                      bottom: 68,
                      height: 80,
                    }}
                  >
                    <Phone
                      size={30}
                      color="black"
                      style={{
                        position: "absolute",
                        bottom: 20,
                        left: -15,
                        zIndex: 10,
                      }}
                      onPress={() => console.log("phone")}
                    />
                    <Camera
                      size={30}
                      color="black"
                      style={{
                        position: "absolute",
                        bottom: 42,
                        left: 22,
                        zIndex: 10,
                      }}
                      onPress={() => navigation.navigate("Camera")} // remplacer ici !!
                    />
                    <Send
                      size={30}
                      color="black"
                      style={{
                        position: "absolute",
                        bottom: 20,
                        right: -15,
                        zIndex: 10,
                      }}
                      onPress={() => console.log("send")}
                    />
                  </View>
                )}
                <LinearGradient
                  colors={["transparent", "transparent", "#EADFD7", "#EADFD7"]}
                  locations={[0, 0.43, 0.43, 1]}
                  style={{
                    position: "relative",
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
                        plus ? { transform: [{ rotate: "45deg" }] } : undefined
                      }
                    />
                  </View>
                </LinearGradient>
              </View>
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen
        name="Plus"
        component={ProfileScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setPlus(!plus);
          },
        }}
      />
      <Tab.Screen name="Folder" component={FolderScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
