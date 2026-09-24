import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservaProvider({children}){
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    //Cargar las reservas que tengo guardadas, sino tengo nada me devuelve un arreglo vacío
    useEffect(()=>{
        const cargar = async () => {
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null){
                    setReservas(JSON.parse(guardado))
                }

            }catch(error){
                console.log('Error leyendo reservas ', error);
            }finally{
                setCargando(false);
            }
        };
        cargar();
    },[])
    /*
    //Hacer el guardado
    useEffect(()=>{
        if(cargando) return; //Esto evita que sobreescriba el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=> 
            console.log('Ocurrio un error guardando la reserva: ', error)
        );
    },[reservas, cargando])
    */
}//LLave de cierre-función