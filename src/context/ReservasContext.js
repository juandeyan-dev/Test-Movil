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
    },[]);

    //Hacer el guardado
    useEffect(()=>{
        if(cargando) return; //Esto evita que sobreescriba el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=> 
            console.log('Ocurrio un error guardando la reserva: ', error)
        );
    },[reservas, cargando]);


    const agregarReserva = useCallback((clase, horario)=>{
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadaEn: new Date().toISOString()
        };
        let resultados = { ok: true };
        setReservas((previa)=>{
            if(previa.some((r)=> r.id === nueva.id)){
                resultados = {ok: false, mensaje: 'Data duplicada'}
                return previa;
            }
            return [nueva, ...previa];
        });
        return resultados;
    },[]);//Cierra el callback

    const valor = useMemo(
        () => {reservas, cargando, agregarReserva},[reservas, cargando, agregarReserva]
    );
    return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>
}//LLave de cierre-función