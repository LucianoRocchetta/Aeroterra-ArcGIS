import { useRef, useEffect, useState } from "react"
import Map from '@arcgis/core/Map.js';
import esriConfig from "@arcgis/core/config";
import MapView from '@arcgis/core/views/MapView.js';
import CSVLayer from "@arcgis/core/layers/CSVLayer.js";
import SceneView from "@arcgis/core/views/SceneView.js";


// Own Components
import { Widgets } from '../components/Widgets.tsx';

//Configuración de APIKEY
esriConfig.apiKey = 'AAPKd6297e652e3649d68560645aa126553fKRlw0Kii3wYDc8HB67xgoRvJN3_FEL--UR9BiajsRzqllRPDlIGCrAaA6V91XNHc'


const MainMap = () => {
    const MapRef = useRef(null);
    const [view, setView] = useState(null);

    const map = new Map({
        basemap: 'dark-gray',
    })

    const colors = ['rgba(0, 0, 0, 0)', "#6AF7AA", "#910091", "#a000a0"]
        const csvLayer = new CSVLayer({
            title: 'Intensidad de trafico en BSAS',
            url: './traffic_data.csv',
            latitudeField: 'LATITUD',
            longitudeField: 'LONGITUD',
            outFields: ['LATITUD, LONGITUD', 'CANTIDAD'],
            // Definir la renderización en el mapa
            renderer: {
                type: "heatmap",
                colorStops: [
                    { color: colors[0], ratio: 0.03 },
                    { color: colors[1], ratio: 0.04 },
                    { color: colors[2], ratio: 0.09 },
                    { color: colors[3], ratio: 1 },
                ],
                radius: 50,
                maxDensity: 0.005,
                minDensity: 0,
               
                opacity: 0.5,
               
            },
            popupTemplate: {
                title: 'Sensor: {LATITUD} | {LONGITUD}',
                content: `<div>
                    <h3>Cantidad de autos: <span style='color:#3f91de'>{CANTIDAD}</span></h3>
                </div>`,
            },
             /* Renderización con marcadores
                renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    size: 20,
                    color: 'red',
                outline: {
                    width: 0.5,
                    color: 'black'
                    }
                }      
            }*/
        });

    //Creacion del objeto map
    //Tambien se puede utilizar SceneView (Mapa 3D)
    useEffect(() => {
        new MapView({
            //Uso del hook ref como container
            container: MapRef.current,
            center: [-58.428837, -34.595221], //Coordenadas de Buenos Aires
            map: map,
            zoom: 12,
            constraints: {
                snapToZoom: false,
                minScale: 20500,
                maxScale: 800000,
            },
        }).when(view => setView(view))


        
        //Add layer
        map.add(csvLayer)
    }, []);



    return (
        <div ref={MapRef} className="main-map">
            {view && <Widgets view={view}></Widgets>}
        </div>
    )
}

export { MainMap };