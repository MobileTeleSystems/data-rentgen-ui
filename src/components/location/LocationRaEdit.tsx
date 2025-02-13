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
                <TextInput source="id" disabled />
                <TextInput source="type" disabled />
                <TextInput source="name" disabled />
                <TextInput source="external_id" resettable />
            </SimpleForm>
        </Edit>
    );
};

export default LocationRaEdit;
