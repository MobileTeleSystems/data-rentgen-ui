import { ReactElement } from "react";
import { Edit, SaveButton, SimpleForm, TextInput, Toolbar } from "react-admin";

const LocationRaEditToolbar = () => {
    return (
        <Toolbar>
            <SaveButton />
            {/* Delete operation is not supportedm remove it */}
        </Toolbar>
    );
};

const LocationRaEdit = (): ReactElement => {
    const transform = (data: { external_id?: string }) => ({
        external_id: data.external_id,
        // Other fields are not updatable, exclude from the payload
    });

    return (
        <Edit
            resource="locations"
            redirect="show"
            mutationMode="pessimistic"
            transform={transform}
        >
            <SimpleForm sanitizeEmptyValues toolbar={<LocationRaEditToolbar />}>
                <TextInput
                    source="id"
                    label="resources.locations.fields.id"
                    disabled
                />
                <TextInput
                    source="data.type"
                    label="resources.locations.fields.type"
                    disabled
                />
                <TextInput
                    source="data.name"
                    label="resources.locations.fields.name"
                    disabled
                />
                <TextInput
                    source="data.external_id"
                    label="resources.locations.fields.external_id"
                    resettable
                />
            </SimpleForm>
        </Edit>
    );
};

export default LocationRaEdit;
