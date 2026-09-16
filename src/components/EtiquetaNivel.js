import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, colors } from '../theme';

export default function EtiquetaNivel({ nivel }) {
    return (
        /* Usamos la estructura de la profe con el color de fondo */
        <View style={[styles.contenedor, { backgroundColor: colors.fondo }]}>
            <Text style={styles.texto}>{nivel}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        alignSelf: 'flex-start', /* Tomado de tu código 1 pero bien escrito */
        paddingVertical: 3,
        paddingHorizontal: spacing.md,
        borderWidth: 1, /* Tomado del código 2 de tu profesora */
    },
    texto: { 
        fontSize: 11, 
        fontWeight: '700', 
        letterSpacing: 0.3 
    }
});
