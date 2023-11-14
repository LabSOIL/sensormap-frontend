import { useRecordContext, useRedirect, Show, SimpleShowLayout, TextField, useGetManyReference, useCreatePath, useEffect } from 'react-admin';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap } from 'react-leaflet';
import { CRS } from 'leaflet';
import { Link } from 'react-router-dom';

export const LocationFieldPoints = ({ source }) => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    const { data, isLoading, error } = useGetManyReference(
        'sensors',
        {
            target: 'area_id',
            id: record.id,
        }
    );

    if (!record) return null;
    if (!data) return null;

    return (
        <MapContainer
            style={{ width: '100%', height: '700px' }}
            bounds={record["geom"]["coordinates"]}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {isLoading ? null :
                (
                    data.map((sensor, index) => (
                        < Marker
                            key={index}
                            position={sensor["geom"]["coordinates"]}
                        >
                            <Popup>
                                <b>{sensor["name"]}</b>
                                <br />
                                {sensor["description"]}
                                <br /><br />
                                <Link to={createPath({ type: 'show', resource: 'sensors', id: sensor['id'] })}>
                                    Go to Sensor</Link>

                            </Popup>
                        </Marker>
                    ))
                )}
        </MapContainer >
    );
};

export const LocationFieldAreas = ({ rowClick, area }) => {
    const redirect = useRedirect();
    const labelFeature = () => {
        return (
            <Tooltip>
                Hello
            </Tooltip>
        )
    };
    return (
        <MapContainer
            style={{ width: '100%', height: '700px' }}
            // Use the bounds of all areas to set the bounds of the map
            bounds={area.map((sensor) => sensor["geom"]["coordinates"])}
            scrollWheelZoom={true} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                area.map(
                    (sensor, index) => (
                        < Polygon
                            key={index}
                            eventHandlers={{
                                mouseover: labelFeature,
                                click: () => {
                                    redirect('show', 'areas', sensor['id']);
                                }
                            }}
                            positions={sensor["geom"]['coordinates']}
                        >
                        </Polygon>
                    )

                )
            }
        </MapContainer >
    );
};
