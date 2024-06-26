import {
    List,
    Datagrid,
    TextField,
    TextInput,
    useGetList,
    usePermissions,
    TopToolbar,
    // CreateButton,
    // ExportButton,
    useRedirect,
    ReferenceField,
    DateField,
    FunctionField,
    downloadCSV,
    Link,
    useRecordContext,
    Loading,
    useCreatePath,
    BulkDeleteButton,
    useNotify,
} from "react-admin";
import { stopPropagation } from "ol/events/Event";
import { Fragment } from "react/jsx-runtime";
import { ImportButton } from "react-admin-import-csv";
import { CreateButton, ExportButton } from "ra-ui-materialui";
import jsonExport from 'jsonexport/dist';

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
];

const PlotListActions = (props) => {
    const {
        className,
        basePath,
        total,
        resource,
        currentSort,
        filterValues,
        exporter,
    } = props;
    const { permissions } = usePermissions();
    const notify = useNotify();

    return (
        <TopToolbar className={className}>
            {permissions === 'admin' && <>
                <CreateButton basePath={basePath} />
                <ImportButton
                    parseConig={{ dynamicTyping: true }}
                    postCommitCallback={(response) => {
                        console.log("Response:", response);
                        if (response[0].success === false) {
                            // Provide useful message to user
                            notify(
                                `Error: ${response[0]?.err.message} (${response[0]?.err?.body.detail.length} errors)\n${response[0].err?.body.detail.map(obj => `Line ${obj.loc[1]} (${obj.loc[2]}): ${obj.msg}`).join('\n')}`, {
                                type: 'error',
                                multiLine: true,
                            });
                            throw new Error(error);
                        }
                    }}
                    {...props}
                />
            </>}
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
        </TopToolbar>
    );
};

const exporter = plots => {
    const plotsForExport = plots.map(plot => {
        const {
            area_id,
            area,
            samples,
            geom,
            latitude,
            longitude,
            last_updated,
            name,
            image,
            coord_srid,
            ...plotForExport
        } = plot; // omit fields
        plotForExport.area_name = plot.area.name; // add a field
        return plotForExport;
    });

    // console.log("plotsForExport", plotsForExport[1]);
    jsonExport(plotsForExport, {
        headers: [
            "id", "plot_iterator", "slope", "gradient", "vegetation_type",
            "topography", "aspect", "created_on", "weather", "lithology",
            "coord_x", "coord_y", "coord_z", "area_name"
        ]  // order fields in the export
    }, (err, csv) => {
        downloadCSV(csv, 'plots');
    });
};

const AreaNameField = () => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    const path = createPath({
        resource: 'areas',
        type: 'show',
        id: record.area.id,
    });

    return (
        <Link to={path} onClick={stopPropagation}>
            <TextField source="area.name" label="Area" />
        </Link>
    );
}

const PlotBulkActionButtons = props => (
    <Fragment>
        {/* <ResetViews label="Reset Views" {...props} /> */}
        {/* Add the default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
);
export const PlotList = () => {
    const FieldWrapper = ({ children, label }) => children;
    const { data, total, isLoading, error } = useGetList(
        'areas', {}
    );
    function toTitleCase(text) {
        return text.toLowerCase().replace(
            /(?<![^\s\p{Pd}])[^\s\p{Pd}]/ug, match => match.toUpperCase()
        );
    }
    if (isLoading) return <Loading />;

    return (
        <List
            filters={postFilters}
            actions={<PlotListActions />}
            storeKey={false}
            empty={false}
            perPage={25}
            exporter={exporter}
        >
            <Datagrid
                rowClick="show"
                bulkActionButtons={<PlotBulkActionButtons />}
            >
                <TextField source="name" />
                <FieldWrapper label="Area"><AreaNameField /></FieldWrapper>
                <FunctionField render={record => `${toTitleCase(record.gradient)}`} label="Gradient" />
                <TextField source="coord_x" label="X (m)" sortable={false} />
                <TextField source="coord_y" label="Y (m)" sortable={false} />
                <TextField source="coord_z" label="Elevation (m)" sortable={false} />
                <TextField source="slope" label="Slope (°)" />
                <DateField source="created_on" />
                <DateField source="last_updated" />
                <FunctionField render={record => `${record.samples.length}`} label="Samples" />
                <ReferenceField label="Soil Type" source="soil_type_id" reference="soil_types" sortable={false} >
                    <TextField source="name" />
                </ReferenceField>
            </Datagrid>
        </List >
    );
};


// const link =
// resourceLinkPath === false ||
// (resourceLinkPath === 'edit' && !resourceDefinition.hasEdit) ||
// (resourceLinkPath === 'show' && !resourceDefinition.hasShow)
//     ? false
//     : createPath({
//           resource: reference,
//           id: referenceRecord.id,
//           type:
//               typeof resourceLinkPath === 'function'
//                   ? resourceLinkPath(referenceRecord, reference)
//                   : resourceLinkPath,
//       });

// let child = children || (
// <Typography component="span" variant="body2">
//     {getRecordRepresentation(referenceRecord)}
// </Typography>
// );

// if (link) {
// return (
//     <Root className={className} sx={sx}>
//         <RecordContextProvider value={referenceRecord}>
//             <Link
//                 to={link}
//                 className={ReferenceFieldClasses.link}
//                 onClick={stopPropagation}
//                 state={{ _scrollToTop: true }}
//             >
//                 {child}
//             </Link>
//         </RecordContextProvider>
//     </Root>
// );
// }

export default PlotList;
