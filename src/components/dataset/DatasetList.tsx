import { ReactElement } from "react";
import {
    List,
    TextField,
    WrapperField,
    DatagridConfigurable,
    SearchInput,
    minLength,
    useTranslate,
} from "react-admin";
import { ListActions } from "@/components/base";
import DatasetLocationIcon from "./DatasetLocationIcon";

const DatasetList = (): ReactElement => {
    const translate = useTranslate();

    const datasetFilters = [
        <SearchInput
            source="search_query"
            alwaysOn
            validate={minLength(3)}
            placeholder={translate(
                "resources.datasets.filters.search_query.placeholder",
            )}
        />,
    ];

    return (
        <List
            actions={<ListActions />}
            filters={datasetFilters}
            resource="datasets"
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <WrapperField source="location.type" sortable={false}>
                    <DatasetLocationIcon />
                </WrapperField>
                <TextField source="location.name" sortable={false} />
                <TextField source="name" sortable={false} />
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetList;
