import {
    Show,
    SimpleShowLayout,
    TextField,
    useRecordContext,
    TopToolbar,
    EditButton,
    DeleteButton,
    usePermissions,
    DateField,
    ReferenceField,
    Labeled,
    NumberField,
    FunctionField,
    TabbedShowLayout,
} from "react-admin";
import { Grid } from '@mui/material';
import { SedimentChart, MicrobialPieChart } from './Charts';



const PlotSampleShowTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Plot Sample</span>;
};

const PlotSampleShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <EditButton />
                <DeleteButton />
            </>}
        </TopToolbar>
    );
}



export const PlotSampleShow = () => (
    <Show title={<PlotSampleShowTitle />} actions={<PlotSampleShowActions />}>
        <SimpleShowLayout>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ReferenceField
                        label="Plot"
                        reference="plots"
                        sort={{ field: 'name', order: 'ASC' }}
                        link="show"
                        source="plot_id"
                    >
                        <Labeled label="Name"><TextField source="name" /></Labeled>
                    </ReferenceField>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Name">
                        <TextField source="name" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Created On">
                        <DateField source="created_on" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Last Updated">
                        <DateField source="last_updated" showTime />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Depth (cm)">
                        <FunctionField render={record => `${record.upper_depth_cm} - ${record.lower_depth_cm} cm`} />
                    </Labeled>

                </Grid>

                <Grid item xs={3}>
                    <Labeled label="Sample Weight (g)">
                        <NumberField source="sample_weight" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Subsample Weight">
                        <TextField source="subsample_weight" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Subsample Replica Weight">
                        <TextField source="subsample_replica_weight" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="pH">
                        <NumberField source="ph" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Residual Humidity (RH)">
                        <NumberField source="rh" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Loss on Ignition (LOI)">
                        <NumberField source="loi" />
                    </Labeled>
                </Grid>
                <Grid item xs={3}>
                    <Labeled label="Moisture Factor Correction (MFC)">
                        <NumberField source="mfc" />
                    </Labeled>
                </Grid>

            </Grid>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="Soil Texture">
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <Labeled label="Clay (%)">
                                <NumberField source="clay_percent" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Silt (%)">
                                <NumberField source="silt_percent" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Sand (%)">
                                <NumberField source="sand_percent" />
                            </Labeled>
                        </Grid>
                    </Grid>
                    <SedimentChart />

                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Composition">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Labeled label="Carbon (C) %">
                                <NumberField source="c" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Nitrogen (N) %">
                                <NumberField source="n" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Carbon:Nitrogen Ratio">
                                <NumberField source="cn" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Iron (Fe) in ug/g">
                                <NumberField source="fe_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Sodium (Na) in ug/g">
                                <NumberField source="na_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Aluminum (Al) in ug/g">
                                <NumberField source="al_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Potassium (K) in ug/g">
                                <NumberField source="k_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Calcium (Ca) in ug/g">
                                <NumberField source="ca_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Magnesium (Mg) in ug/g">
                                <NumberField source="mg_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Manganese (Mn) in ug/g">
                                <NumberField source="mn_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Sulfur (S) in ug/g">
                                <NumberField source="s_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Chlorine (Cl) in ug/g">
                                <NumberField source="cl_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Phosphorus (P) in ug/g">
                                <NumberField source="p_ug_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Silicon (Si) in ug/g">
                                <NumberField source="si_ug_per_g" />
                            </Labeled>
                        </Grid>
                    </Grid>
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="🦠">

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Labeled label="Fungi (fungal 18S gene copy number per g of soil)">
                                <FunctionField render={record => {
                                    const total = record.fungi_per_g + record.bacteria_per_g + record.archea_per_g;
                                    const percentage = (record.fungi_per_g * 100 / total).toFixed(2);  // Rounds to two decimal places
                                    return `${record.fungi_per_g} (${percentage}%)`;
                                }} />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Bacteria (bacterial 16S gene copy number per g of soil)">
                                <FunctionField render={record => {
                                    const total = record.fungi_per_g + record.bacteria_per_g + record.archea_per_g;
                                    const percentage = (record.bacteria_per_g * 100 / total).toFixed(2);  // Rounds to two decimal places
                                    return `${record.bacteria_per_g} (${percentage}%)`;
                                }
                                } />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Archea (archeal 16S gene copy number per g of soil)">
                                <FunctionField render={record => {
                                    const total = record.fungi_per_g + record.bacteria_per_g + record.archea_per_g;
                                    const percentage = (record.archea_per_g * 100 / total).toFixed(2);  // Rounds to two decimal places
                                    return `${record.archea_per_g} (${percentage}%)`;
                                }
                                } />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Methanogens (mcrA gene copy number per g of soil)">
                                <NumberField source="methanogens_per_g" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Methanotrophs (pmoA gene copy number per g of soil)">
                                <NumberField source="methanotrophs_per_g" />
                            </Labeled>
                            <MicrobialPieChart />
                        </Grid>
                    </Grid>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>

        </SimpleShowLayout>
    </Show >
);


export default PlotSampleShow;
