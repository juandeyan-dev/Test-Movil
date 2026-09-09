import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import DetalleClasesScreen from "../screens/DetalleClaseScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ClasesScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClasesScreen}
                options={{title: 'Detalle', headerBackTitle: 'Atrás'}}
            />
        </Stack.Navigator>
    )
}