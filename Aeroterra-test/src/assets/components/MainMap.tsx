import { useRef, useEffect, useState } from 'react'
import Map from '@arcgis/core/Map.js';
import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView.js';
import CSVLayer from '@arcgis/core/layers/CSVLayer.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import SceneView from '@arcgis/core/views/SceneView.js';


// Own Components
import { Widgets } from '../components/Widgets.tsx';
import { Graphics } from '../components/Graphics.tsx';

//Configuración de APIKEY
esriConfig.apiKey = 'AAPKd6297e652e3649d68560645aa126553fKRlw0Kii3wYDc8HB67xgoRvJN3_FEL--UR9BiajsRzqllRPDlIGCrAaA6V91XNHc'


const MainMap = () => {
    const MapRef = useRef();
    const [view, setView] = useState(null);

    interface heatMap {
        color: string,
        ratio: number,
    }

    const heatMapColor: heatMap[] = [
        { color: 'rgba(0, 0, 0, 0)', ratio: 0 },
        { color: '#192E46', ratio: 0.25 },
        { color: '#1C3859', ratio: 0.30 },
        { color: '#23456B', ratio: 0.53 },
        { color: '#2A5585', ratio: 0.76 },
        { color: '#346EB2', ratio: 0.82 },
        { color: '#3272BD', ratio: 0.95 },
        { color: 'rgba(70, 234, 192, 0.5)', ratio: 1 },
    ]

    //Capa de Delimitacion de Buenos Aires
    const graphicLayer = new GraphicsLayer({
        id: 'buenosAires',
    })

    //Capa de datos de intensidad
    const csvLayer = new CSVLayer({
        title: 'Intensidad de trafico en BSAS',
        url: './traffic_data.csv',
        latitudeField: 'LATITUD',
        longitudeField: 'LONGITUD',
        outFields: ['LATITUD, LONGITUD', 'CANTIDAD'],
        // Definir la renderización en el mapa
        renderer: {
            type: 'heatmap',
            field: 'CANTIDAD',
            colorStops: heatMapColor,
            radius: 20,
            maxDensity: 1000,
            minDensity: 500,
            opacity: 0.5,

        },
        popupTemplate: {
            title: 'Sensor: {LATITUD} | {LONGITUD}',
            content: `<div class="popup-info">
                    <h2>Cantidad de autos: <span>{CANTIDAD}</span></h2>
                    <h3>Latidud: <span>{LATITUD}</span></h3>
                    <h3>Longitud: <span>{LONGITUD}</span></h3>
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

    const map = new Map({
        basemap: 'dark-gray',
        layers: [graphicLayer, csvLayer]
    })

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
            {view &&
                <>
                    <Widgets view={view}></Widgets>
                    <Graphics view={view}></Graphics>
                </>
            }
        </div>
    )
}

export { MainMap };