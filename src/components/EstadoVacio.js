import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/index";

export default function EstadoVacio({ icono, titulo, mensaje, textoAccion, onAction }) {
    return (
        <View style={style.contenedor}>
            <View style={style.circulo}>
                <Ionicons name={icono} size={30} color={colors.primario}/>
            </View> 
            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.mensaje}>{mensaje}</Text>
            {textoAccion && (
                <Text style={[style.mensaje, { color: colors.primario, marginTop: spacing.md }]} onPress={onAction}>
                    {textoAccion}
                </Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xxl,
    },
    circulo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primarioSuave,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    titulo: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.texto,
        textAlign: "center",
    },
    mensaje: {
        fontSize: 14,
        color: colors.textoSuave,
        textAlign: "center",
        marginTop: spacing.sm,
        lineHeight: 20,
    },
});