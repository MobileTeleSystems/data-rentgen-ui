import { ReactElement } from "react";
import {
    DateInput,
    DeleteButton,
    Edit,
    ListButton,
    minValue,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    useNotify,
    useRedirect,
} from "react-admin";
import PersonalTokenRaScopesCheckbox from "./PersonalTokenRaScopesCheckbox";
import { PersonalTokenCreateDetailedResponseV1 } from "@/dataProvider/types";

const PersonalTokenRaEditToolbar = () => {
    return (
        <Toolbar>
            <SaveButton label="resources.personalTokens.actions.refresh" />
            <DeleteButton
                redirect="list"
                mutationMode="pessimistic"
                label="resources.personalTokens.actions.revoke"
            />
        </Toolbar>
    );
};

const PersonalTokenRaEdit = (): ReactElement => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data: PersonalTokenCreateDetailedResponseV1) => {
        navigator.clipboard.writeText(data.content);
        notify("resources.personalTokens.notification.tokenCreated", {
            messageArgs: { smart_count: 1 },
            type: "warning",
            autoHideDuration: null,
            undoable: false,
        });
        redirect("show", "personalTokens", data.id, data);
    };

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const todayString = today.toISOString().slice(0, 10);

    const transform = (payload: { data: { until?: string } }) => ({
        until: payload.data.until,
        // Other fields are not updatable, exclude from the payload
    });

    return (
        <Edit
            resource="personalTokens"
            mutationMode="pessimistic"
            mutationOptions={{ onSuccess }}
            transform={transform}
        >
            <SimpleForm
                sanitizeEmptyValues
                toolbar={<PersonalTokenRaEditToolbar />}
            >
                <TextInput
                    source="data.id"
                    label="resources.personalTokens.fields.id"
                    disabled
                />
                <TextInput
                    source="data.name"
                    label="resources.personalTokens.fields.name"
                    helperText="resources.personalTokens.helperText.name"
                    disabled
                />
                <PersonalTokenRaScopesCheckbox source="data.scopes" disabled />
                <DateInput
                    source="data.since"
                    label="resources.personalTokens.fields.since"
                    helperText="resources.personalTokens.helperText.since"
                    disabled
                />
                <DateInput
                    source="data.until"
                    label="resources.personalTokens.fields.until"
                    helperText="resources.personalTokens.helperText.until"
                    validate={minValue(todayString)}
                />
            </SimpleForm>
        </Edit>
    );
};

export default PersonalTokenRaEdit;
