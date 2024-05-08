import PlotCreate from './PlotCreate';
import PlotEdit from './PlotEdit';
import PlotList from './PlotList';
import PlotShow from './PlotShow';
import PlotSampleCreate from './samples/PlotSampleCreate';
import PlotSampleEdit from './samples/PlotSampleEdit';
import PlotSampleList from './samples/PlotSampleList';
import PlotSampleShow from './samples/PlotSampleShow';

const Plot = {
    create: PlotCreate,
    edit: PlotEdit,
    list: PlotList,
    show: PlotShow,
    recordRepresentation: 'name.en',
};

const Sample = {
    create: PlotSampleCreate,
    edit: PlotSampleEdit,
    list: PlotSampleList,
    show: PlotSampleShow,
    recordRepresentation: 'name.en',
};

export default {
    plot: Plot,
    sample: Sample,
};