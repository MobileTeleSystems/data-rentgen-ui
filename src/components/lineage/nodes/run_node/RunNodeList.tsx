import { useTranslate } from "react-admin";
import { ReactElement, useLayoutEffect, useMemo, useState } from "react";

import { RunResponseV1 } from "@/dataProvider/types";
import { IconButton, Stack, TablePagination, TextField } from "@mui/material";
import RunNode from "./RunNode";
import { Search } from "@mui/icons-material";
import { paginateArray } from "../../utils/pagination";
import { runMatchesText } from "./utils/runMatchesText";
import { useUpdateNodeInternals } from "@xyflow/react";

const RunNodeList = ({
    nodeId,
    runs,
    defaultRowsPerPage = 10,
}: {
    nodeId: string;
    runs: RunResponseV1[];
    defaultRowsPerPage?: number;
}): ReactElement => {
    if (runs.length == 1) {
        const run = runs[0];
        return (
            // @ts-expect-error Not managed by ReactFlow
            <RunNode key={run.id} data={run} />
        );
    }

    const translate = useTranslate();
    const updateNodeInternals = useUpdateNodeInternals();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");

    const filteredRuns = useMemo(
        () => runs.filter((run) => !showSearch || runMatchesText(run, search)),
        [runs, showSearch, search],
    );

    const runsToShow = paginateArray(filteredRuns, page, rowsPerPage);

    const rowsPerPageOptions = [
        5,
        10,
        25,
        50,
        100,
        {
            label: translate("resources.runs.pagination.all"),
            value: -1,
        },
    ];

    useLayoutEffect(() => {
        // Re-render all edges connected to this node
        updateNodeInternals(nodeId);
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
                            "resources.runs.filters.search_query.helperText",
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

            {runsToShow.map((run) => (
                // @ts-expect-error Not managed by ReactFlow
                <RunNode key={run.id} data={run} />
            ))}

            <TablePagination
                count={filteredRuns.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={(e, pageNumber) => setPage(pageNumber)}
                onRowsPerPageChange={(e) =>
                    setRowsPerPage(e.target.value as unknown as number)
                }
                className="nodrag nopan"
            />
        </>
    );
};

export default RunNodeList;
