// IMPORTACIONES DE REACT Y REACT NATIVE
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';

// IMPORTACIONES DE LIBRERÍAS EXTERNAS 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

//IMPORTACIONES INTERNAS (Mis componentes, hooks, data y temas)
import useResponsive from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelChip from '../components/NivelChip'; 
import EstadoVacio from '../components/EstadoVacio'; 
import { colors, radius, spacing, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default function ClasesScreen({ navigation }) {

    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState('Todos'); 
    const [busqueda, setBusqueda] = useState(''); 

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTexto = textoBusqueda === '' ||
                clase.titulo.toLowerCase().includes(textoBusqueda) ||
                clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
            
            return coincideNivel && coincideTexto;
        });
    }, [nivel, busqueda]);

    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={{ paddingHorizontal }}>
                {/*IMPORTANTE, COLOCARLE STYLE A ESTE TÍTULO, NO SE TE PUEDE OLVIDAR, COLOCARLO LINDO*/}
                <Text style={typography.titulo}>Aplicación de clases de inglés</Text>
                
                <View style={styles.buscador}>
                    <Ionicons name="search" size={18} color={colors.textoSuave} />
                    
                    {/*PODEMOS COLOCARLE COLOR, STYLES*/}
                    {/*IMPORTANT, SI QUEREMOS TAMBIÉN QUE SEA CON PROFESOR, TENEMOS QUE CREAR UN HOOK(COMO EL DE NIVEL CON USESTATE, PARA BUSCAR POR PROFESOR*/}
                    {/*Puedes elegir true o false, para que use o no autocorrector*/}
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar por nivel o profesor"
                        value={busqueda}
                        onChangeText={setBusqueda}
                        autoCorrect={false}
                    />
                    
                    {busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.textoSuave}
                            onPress={() => setBusqueda('')}
                        />
                    )}
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0, marginTop: spacing.md, paddingHorizontal }}
            >
                {NIVELES.map((item) => (
                    <NivelChip
                        key={item}
                        etiqueta={item}
                        activo={nivel === item} 
                        onPress={() => setNivel(item)}
                    />
                ))}
            </ScrollView>

            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        onPress={() => navigation.navigate('DetalleClase', { clase: item })}
                    />
                )}
                numColumns={columnas} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1,
                    paddingBottom: 120, 
                    paddingTop: spacing.md
                }}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No encontramos resultados"
                        mensaje="Prueba con otro valor de búsqueda o cambia las palabras."
                        textoAccion="Quitar filtros"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    buscador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        height: 46,
        marginTop: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});