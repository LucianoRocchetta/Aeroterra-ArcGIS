import View from "@arcgis/core/views/View.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Search from "@arcgis/core/widgets/Search.js";

const Widgets = ( { view }:any ) => {
    view.ui.components = (["attribution", "compass", "zoom"]);
    view.ui.add(new Legend({view}), 'bottom-right');
    view.ui.add(new Search({view}), 'top-right')

    return null;
}

export { Widgets }