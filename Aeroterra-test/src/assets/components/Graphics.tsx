import Graphic from '@arcgis/core/Graphic.js';
import { useEffect } from 'react';

const Graphics = ({ view }:any):null => {

    // Delimitación de Buenos Aires
    useEffect(() => {
        const layer = view.map.findLayerById('buenosAires');

        if (layer) {
       /* const graph = new Graphic({
            geometry: {
                type: 'point',
                x: -34.595085,
                y: -58.528521,
            },
            symbol: {
                type: 'simple-marker',
                color: 'red',
                size: 35,
            }
        })*/
        const polyline = {
            type: 'polyline',
            paths: [
                [-58.464916, -34.534491], 
                [-58.499923, -34.550066], 
                [-58.530833, -34.615353],
                [-58.528532, -34.653227],
                [-58.461144, -34.705095],
                [-58.422467, -34.661456],
                [-58.360406, -34.639900],
                [-58.374628, -34.580814],
                [-58.464916, -34.534491], 
            ]
        };

        const polylineType = {
            type: 'simple-fill',
            color: 'rgba(30,102,235,0.15)',
            outline: {
                color: 'white',            
            }
        }

        const polylineAtributes = {
            Name: 'BSAS',
        }

        const graphic = new Graphic (
            {
                geometry: polyline,
                symbol: polylineType,
                attributes: polylineAtributes
            }
        )
        view.graphics.add(graphic);
    }
    }, []);

    return null;
}

export { Graphics };