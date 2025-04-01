import { useTranslate } from "react-admin";
import { ReactElement, useLayoutEffect, useMemo, useState } from "react";

import { OperationResponseV1 } from "@/dataProvider/types";
import { IconButton, Stack, TablePagination, TextField } from "@mui/material";
import OperationNode from "./OperationNode";
import { Search } from "@mui/icons-material";
import { paginateArray } from "@/components/lineage/utils/pagination";
import { operationMatchesText } from "./utils/operationMatchesText";
import { useUpdateNodeInternals } from "@xyflow/react";

const OperationNodeList = ({
    jobNodeId,
    operations,
    defaultRowsPerPage = 5,
}: {
    jobNodeId: string;
    operations: OperationResponseV1[];
    defaultRowsPerPage?: number;
}): ReactElement => {
    if (operations.length == 1) {
        const operation = operations[0];
        return (
            // @ts-expect-error Not managed by ReactFlow
            <OperationNode
                jobNodeId={jobNodeId}
                key={operation.id}
                data={operation}
            />
        );
    }

    const translate = useTranslate();
    const updateNodeInternals = useUpdateNodeInternals();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOperations = useMemo(
        () =>
            operations.filter(
                (operation) =>
                    !showSearch || operationMatchesText(operation, search),
            ),
        [operations, showSearch, search],
    );

    const operationsToShow = paginateArray(
        filteredOperations,
        page,
        rowsPerPage,
    );

    const rowsPerPageOptions = [
        5,
        10,
        25,
        50,
        100,
        {
            label: translate("resources.operations.pagination.all"),
            value: -1,
        },
    ];

    useLayoutEffect(() => {
        // Re-render all edges connected to this node
        updateNodeInternals(jobNodeId);
    }, [page, rowsPerPage, showSearch, search]);

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
                            "resources.operations.filters.search_query.helperText",
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

            {operationsToShow.map((operation) => (
                // @ts-expect-error Not managed by ReactFlow
                <OperationNode
                    jobNodeId={jobNodeId}
                    key={operation.id}
                    data={operation}
                />
            ))}

            <TablePagination
                count={filteredOperations.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                labelRowsPerPage={translate("ra.navigation.page_rows_per_page")}
                labelDisplayedRows={({ from, to, count }) =>
                    translate("ra.navigation.page_range_info", {
                        offsetBegin: from,
                        offsetEnd: to,
                        total: count,
                    })
                }
                onPageChange={(e, pageNumber) => setPage(pageNumber)}
                onRowsPerPageChange={(e) =>
                    setRowsPerPage(e.target.value as unknown as number)
                }
                className="nodrag nopan"
            />
        </>
    );
};

export default OperationNodeList;
