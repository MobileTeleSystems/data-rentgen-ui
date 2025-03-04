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
import { useTranslate } from "react-admin";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { MouseEvent, useContext, useMemo, useState } from "react";
import { Search } from "@mui/icons-material";
import { IORelationSchemaFieldV1 } from "@/dataProvider/types";
import { paginateArray } from "../../utils/pagination";
import { fieldMatchesText, flattenFields } from "./utils";
import {
    getNearestColumnRelations,
    getAllColumnRelations,
} from "../../selection/utils/columnSelection";
import LineageSelectionContext from "../../selection/LineageSelectionContext";

const DatasetSchemaTable = ({
    nodeId,
    fields,
    defaultRowsPerPage = 10,
}: {
    nodeId: string;
    fields: IORelationSchemaFieldV1[];
    defaultRowsPerPage?: number;
}) => {
    const { getEdges } = useReactFlow();
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

    const { selection, setSelection } = useContext(LineageSelectionContext);
    const selectedFields =
        selection.nodeWithColumns.get(nodeId) ?? new Map<string, Set<string>>();

    const onFieldClick = (e: MouseEvent, fieldName: string) => {
        const selection = getNearestColumnRelations(
            getEdges(),
            nodeId,
            fieldName,
        );
        setSelection(selection);
        e.stopPropagation();
    };

    const onFieldDoubleClick = (e: MouseEvent, fieldName: string) => {
        const selection = getAllColumnRelations(getEdges(), nodeId, fieldName);
        setSelection(selection);
        e.stopPropagation();
    };

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
                        <TableCell className="hidden" />
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
                        <TableCell className="hidden" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fieldsToShow.map((field) => (
                        <TableRow
                            key={field.name}
                            className={`columnLineageField ${selectedFields.has(field.name) ? "selected" : ""}`}
                            onClick={(e) => onFieldClick(e, field.name)}
                            onDoubleClick={(e) =>
                                onFieldDoubleClick(e, field.name)
                            }
                        >
                            <TableCell className="hidden">
                                <Handle
                                    className="columnLineageHandle"
                                    type="target"
                                    id={field.name}
                                    position={Position.Left}
                                    isConnectable={false}
                                />
                            </TableCell>
                            <TableCell>{field.name}</TableCell>
                            <TableCell>{field.type}</TableCell>
                            <TableCell className="hidden">
                                <Handle
                                    className="columnLineageHandle"
                                    type="source"
                                    id={field.name}
                                    position={Position.Right}
                                    isConnectable={false}
                                />
                            </TableCell>
                        </TableRow>
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
