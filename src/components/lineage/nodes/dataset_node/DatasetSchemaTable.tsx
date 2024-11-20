import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { IORelationSchemaFieldV1 } from "@/dataProvider/types";
import { useTranslate } from "react-admin";

const DatasetSchemaTable = ({
    fields,
    level = 0,
}: {
    fields: IORelationSchemaFieldV1[];
    level?: number;
}) => {
    const translate = useTranslate();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {translate(
                            "resources.datasets.fields.schema.field.name",
                        )}
                    </TableCell>
                    <TableCell>
                        {translate(
                            "resources.datasets.fields.schema.field.type",
                        )}
                    </TableCell>
                    <TableCell>
                        {translate(
                            "resources.datasets.fields.schema.field.description",
                        )}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {fields.map((field) => (
                    <>
                        <TableRow key={`${level}.${field.name}.main`}>
                            <TableCell>{field.name}</TableCell>
                            <TableCell>{field.type}</TableCell>
                            <TableCell>{field.description}</TableCell>
                        </TableRow>
                        {field.fields.length > 0 && (
                            /* create nested table for nested fields */
                            <TableRow key={`${level}.${field.name}.nested`}>
                                <TableCell rowSpan={level + 1} />
                                <DatasetSchemaTable
                                    fields={field.fields}
                                    level={level + 1}
                                />
                            </TableRow>
                        )}
                    </>
                ))}
            </TableBody>
        </Table>
    );
};

export default DatasetSchemaTable;
