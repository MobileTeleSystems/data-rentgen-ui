import { ReactElement } from "react";
import {
    List,
    DateField,
    TopToolbar,
    SelectColumnsButton,
    CreateButton,
    DataTable,
} from "react-admin";
import PersonalTokenRaScopesArray from "./PersonalTokenRaScopesArray";
import PersonalTokenRaEditButton from "./PersonalTokenRaEditButton";
import PersonalTokenRaDeleteButton from "./PersonalTokenRaDeleteButton";
import PersonalTokenRaStatus from "./PersonalTokenRaStatus";

const PersonalTokenRaEditActions = () => {
    return (
        <>
            <TopToolbar>
                <CreateButton />
                <SelectColumnsButton />
            </TopToolbar>
        </>
    );
};

const PersonalTokenRaList = (): ReactElement => {
    return (
        <List
            actions={<PersonalTokenRaEditActions />}
            resource="personalTokens"
            storeKey={false}
        >
            <DataTable bulkActionButtons={false}>
                <DataTable.Col
                    label="resources.personalTokens.fields.id"
                    source="data.id"
                    disableSort
                />
                <DataTable.Col
                    label="resources.personalTokens.fields.name"
                    source="data.name"
                    disableSort
                />
                <DataTable.Col
                    label="resources.personalTokens.fields.scopes"
                    source="data.scopes"
                    field={PersonalTokenRaScopesArray}
                    disableSort
                />
                <DataTable.Col
                    label="resources.personalTokens.fields.since"
                    source="data.since"
                    field={DateField}
                    disableSort
                />
                <DataTable.Col
                    label="resources.personalTokens.fields.until"
                    source="data.until"
                    field={DateField}
                    disableSort
                />
                <DataTable.Col
                    label="resources.personalTokens.fields.status"
                    source="data.status"
                    field={PersonalTokenRaStatus}
                    disableSort
                />
                <DataTable.Col disableSort>
                    <PersonalTokenRaEditButton />
                    <PersonalTokenRaDeleteButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export default PersonalTokenRaList;
