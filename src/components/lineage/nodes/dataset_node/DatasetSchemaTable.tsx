import {
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import { IORelationSchemaFieldV1 } from "@/dataProvider/types";
import { useTranslate } from "react-admin";
import { useMemo, useState } from "react";
import { Search } from "@mui/icons-material";
import { paginateArray } from "../../utils/pagination";
import { fieldMatchesText, flattenFields } from "./utils";

const DatasetSchemaTable = ({
    fields,
    defaultRowsPerPage = 10,
}: {
    fields: IORelationSchemaFieldV1[];
    defaultRowsPerPage?: number;
}) => {
    const translate = useTranslate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");

    const filteredFields = useMemo(
        () =>
            flattenFields(fields).filter(
                (field) => !showSearch || fieldMatchesText(field, search),
            ),
        [fields, showSearch, search],
    );

    const fieldsToShow = paginateArray(filteredFields, page, rowsPerPage);

    const rowsPerPageOptions = [
        5,
        10,
        25,
        50,
        100,
        {
            label: translate("resources.datasets.fields.schema.pagination.all"),
            value: -1,
        },
    ];

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                justifyContent={"flex-end"}
                className="nodrag nopan"
            >
                {showSearch && (
                    <TextField
                        id="search"
                        type="search"
                        autoFocus={true}
                        placeholder={translate(
                            "resources.datasets.fields.schema.search.placeholder",
                        )}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
                <IconButton
                    aria-label={translate(
                        "resources.datasets.fields.schema.search.name",
                    )}
                    onClick={() => setShowSearch(!showSearch)}
                >
                    <Search />
                </IconButton>
            </Stack>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fieldsToShow.map((field) => (
                        <>
                            <TableRow key={`${field.name}.main`}>
                                <TableCell>{field.name}</TableCell>
                                <TableCell>{field.type}</TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
                <TablePagination
                    count={filteredFields.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onPageChange={(e, pageNumber) => setPage(pageNumber)}
                    onRowsPerPageChange={(e) =>
                        setRowsPerPage(e.target.value as unknown as number)
                    }
                    className="nodrag nopan"
                />
            </Table>
        </>
    );
};

export default DatasetSchemaTable;
