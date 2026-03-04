import { Text, View, ScrollView,TextInput } from "react-native";
import ChildCard from "../components/ChildCard";
import Button from "../components/Button";
import ButtonAdd from "../components/ButtonAdd";
import ButtonRetour from "../components/ButtonRetour";

export default function HomeScreen() {
  const [child, setChild] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);

  const setChildName = (name) => {
    setChild(name);
  };

  return (
    <>
    <View className="flex-1 px-3 items-center justify-center bg-back">
      <Text className="text-white text-2xl font-bold">
      </Text>
      <ChildCard />

      <View className="flex-1 p-4 pt-16">

      <Text className="text-green-500 text-3xl pb-4">
        WelcomeScreen
      </Text>

      <View className="border">
        <TextInput title="Email" />
      </View>
<View>
      <Button
        title="Inscription"
        variant="jaune"
        textSize="md"
        onPress={() => navigation.navigate("Home")}
      />
</View>

      <View>
        <ButtonAdd
          variant="outlineJaune"
        />
      </View>
       <ButtonRetour
        title="Retour"
        variant="ter"
        textSize="sm"
  
      />


    </View>
    </View>
    <>
      {/*<View className="flex-1 p-4 pt-16 bg-back gap-4">
        {child === "" && <ProHome setChildName={setChildName} />}
        {child !== "" && (
          <ProChild childName={child} setChildName={setChildName} />
        )}
      </View>*/}
      <View className="flex-1 p-4 bg-back">
        {selectedChild ? (
          <ChildJournee
            child={selectedChild}
            OnBack={() => setSelectedChild(null)}
          />
        ) : (
          <ParentsHome onSelectChild={setSelectedChild} />
        )}
      </View>
    </>
     </>
  );
}
