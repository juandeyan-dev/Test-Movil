import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "Home"
                component={ClasesScreen}
                options={{headerShow: false}}
            />
        </Stack.Navigator>
    )
}
