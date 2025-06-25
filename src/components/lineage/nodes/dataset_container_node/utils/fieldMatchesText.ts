import { IORelationSchemaFieldV1 } from "@/dataProvider/types";

export const fieldMatchesText = (
    field: IORelationSchemaFieldV1,
    searchText: string,
): boolean => {
    const forSearch = searchText.toLowerCase();
    return (
        field.name.toLowerCase().includes(forSearch) ||
        (field.type ?? "").toLowerCase().includes(forSearch)
    );
};
