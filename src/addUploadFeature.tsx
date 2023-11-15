// This allows instrument data to be uploaded as base64 strings

const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    update: (resource, params) => {
        console.log("UPLOADING", resource, params);
        if (resource !== 'sensors') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
        // The sensors update uses a file upload widget for the instrument
        // data field.
        // A new data file is an updated version of the existing file.
        // and are converted to base64 strings to be unwrapped and stored
        // in the DB
        console.log("PARAMS", params.data.instrumentdata);
        const newInstrumentData = params.data.instrumentdata.filter(
            p => p.rawFile instanceof File
        );

        return Promise.all(newInstrumentData.map(convertFileToBase64))
            .then(base64InstrumentData =>
                base64InstrumentData.map(instrumentdata64 => ({
                    src: instrumentdata64,
                    title: `${params.data.title}`,
                }))
            )
            .then(transformedNewInstrumentData =>
                dataProvider.update(resource, {
                    ...params,
                    data: {

                        id: params.data.id,
                        name: params.data.name,
                        description: params.data.description,
                        geom: params.data.geom,
                        area_id: params.data.area_id,
                        latitude: params.data.latitude,
                        longitude: params.data.longitude,
                        instrumentdata: transformedNewInstrumentData[0].src,
                    },
                })
            );
    },
});

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default addUploadCapabilities;
