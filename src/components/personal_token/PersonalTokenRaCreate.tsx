import { ReactElement } from "react";
import {
    Create,
    DateInput,
    ListButton,
    maxLength,
    minValue,
    required,
    SimpleForm,
    TextInput,
    TopToolbar,
    useNotify,
    useRedirect,
} from "react-admin";
import PersonalTokenRaScopesCheckbox from "./PersonalTokenRaScopesCheckbox";
import { PersonalTokenCreateDetailedResponseV1 } from "@/dataProvider/types";

const PersonalTokenRaCreateActions = () => {
    return (
        <TopToolbar>
            <ListButton />
        </TopToolbar>
    );
};

const PersonalTokenRaCreate = (): ReactElement => {
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

    const transform = (payload: {
        data: { name: string; until?: string };
    }) => ({
        name: payload.data.name,
        until: payload.data.until,
        // Other fields cannot be set
    });

    return (
        <Create
            resource="personalTokens"
            transform={transform}
            mutationMode="pessimistic"
            mutationOptions={{ onSuccess }}
            actions={<PersonalTokenRaCreateActions />}
        >
            <SimpleForm sanitizeEmptyValues>
                <TextInput
                    source="data.name"
                    label="resources.personalTokens.fields.name"
                    helperText="resources.personalTokens.helperText.name"
                    validate={[required(), maxLength(64)]}
                />
                <PersonalTokenRaScopesCheckbox source="data.scopes" disabled />
                <DateInput
                    source="data.since"
                    label="resources.personalTokens.fields.since"
                    helperText="resources.personalTokens.helperText.since"
                    defaultValue={todayString}
                    disabled
                />
                <DateInput
                    source="data.until"
                    label="resources.personalTokens.fields.until"
                    helperText="resources.personalTokens.helperText.until"
                    validate={minValue(todayString)}
                />
            </SimpleForm>
        </Create>
    );
};

export default PersonalTokenRaCreate;
