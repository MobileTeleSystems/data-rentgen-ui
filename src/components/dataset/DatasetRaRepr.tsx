import { ReactElement } from "react";
import { Stack } from "@mui/material";
import { LocationIcon } from "@/components/location";
import { useRecordContext } from "react-admin";
import { DatasetDetailedResponseV1 } from "@/dataProvider/types";

const DatasetRaRepr = (): ReactElement | null => {
    const dataset = useRecordContext<DatasetDetailedResponseV1>();
    if (!dataset) return null;

    return (
        <Stack
            direction={"row"}
            spacing={1}
            sx={{
                // using inline-flex to avoid expanding link to the full width of table column
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "underline",
            }}
        >
            <LocationIcon location={dataset.data.location} />
            <span>{dataset.data.name}</span>
        </Stack>
    );
};
export default DatasetRaRepr;
