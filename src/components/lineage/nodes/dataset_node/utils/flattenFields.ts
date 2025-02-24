import { IORelationSchemaFieldV1 } from "@/dataProvider/types";

export const flattenFields = (
    fields: IORelationSchemaFieldV1[],
    prefix: string = "",
): IORelationSchemaFieldV1[] => {
    let result: IORelationSchemaFieldV1[] = [];
    for (const field of fields) {
        result.push(field);
        if (field.fields.length > 0) {
            // parent.child
            result = result.concat(
                flattenFields(field.fields, prefix + field.name + "."),
            );
        }
    }
    return result;
};
