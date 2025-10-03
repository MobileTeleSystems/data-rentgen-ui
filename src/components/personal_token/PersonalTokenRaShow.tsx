import { ReactElement } from "react";
import {
    DateField,
    ListButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
} from "react-admin";
import PersonalTokenRaScopesArray from "./PersonalTokenRaScopesArray";
import PersonalTokenRaEditButton from "./PersonalTokenRaEditButton";
import PersonalTokenRaDeleteButton from "./PersonalTokenRaDeleteButton";
import PersonalTokenRaStatus from "./PersonalTokenRaStatus";

const PersonalTokenRaShowActions = () => {
    return (
        <TopToolbar>
            <ListButton />
            <PersonalTokenRaEditButton />
            <PersonalTokenRaDeleteButton />
        </TopToolbar>
    );
};

const PersonalTokenRaShow = (): ReactElement => {
    return (
        <Show
            resource="personalTokens"
            actions={<PersonalTokenRaShowActions />}
        >
            <SimpleShowLayout>
                <TextField
                    source="data.id"
                    label="resources.personalTokens.fields.id"
                />
                <TextField
                    source="data.name"
                    label="resources.personalTokens.fields.name"
                />
                <PersonalTokenRaScopesArray
                    source="data.scopes"
                    label="resources.personalTokens.fields.scopes"
                />
                <PersonalTokenRaStatus
                    label="resources.personalTokens.fields.status"
                    source="data.status"
                />
                <DateField
                    source="data.until"
                    label="resources.personalTokens.fields.until"
                />
                <DateField
                    source="data.since"
                    label="resources.personalTokens.fields.since"
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default PersonalTokenRaShow;
