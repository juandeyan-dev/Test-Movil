import React, { useLayoutEffect } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import { colors, spacing, radius, typography } from '../theme/index';
// import { formatearPrecio } from '../data/clases'; // Descoméntalo cuando vayas a pintar el precio

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    
    const { esTablet } = useResponsive();

    useLayoutEffect(() => {
        navigation.setOptions({ title: clase.titulo });
    }, [navigation, clase.titulo]);

    return (
        <View style={styles.pantalla}>
            <ScrollView 
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: clase.imagen }}
                    style={[styles.portada, { height: esTablet ? 300 : 200 }]}
                    resizeMode="cover"
                />
                
                {/* Nombre del profesor completo: Name and lastName */}
                {/* Al lado del nombre FOTO --En dos columnas, abajo tenemos styles para usarlos, en VIDEO la profe explica. */}
                
                {/* Descripción */}
                
                {/* Precio */}
                
                {/* Duración */}
                
                {/* Cupos */}
                
                {/* Horarios */}
                
                {/* Al final del componente requiere un botón "Realizar reserva" - click en la card realizar reserva, ya si queremos hacer otro componente de realizarReserva */}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    portada: { width: '100%', backgroundColor: colors.primarioSuave },
    datos: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        paddingVertical: spacing.lg,
    },
    dato: { alignItems: 'center', gap: 2 },
    datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        padding: spacing.lg,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
    profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
    descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
    barra: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingTop: spacing.lg
    },
    precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
});