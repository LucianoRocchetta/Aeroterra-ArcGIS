import Legend from "@arcgis/core/widgets/Legend.js";
import Search from "@arcgis/core/widgets/Search.js";

const Widgets = ({ view }: any): null => {
    view.ui.components = (['attribution', 'compass', 'zoom']);
    view.ui.add(new Legend({ view }), 'bottom-right');
    view.ui.add(new Search({ view }), 'top-right')

    return null;
}

export { Widgets }