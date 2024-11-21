import { ReactElement } from "react";
import { Stack } from "@mui/material";
import { LocationIcon } from "@/components/location";
import { useRecordContext } from "react-admin";

const DatasetRaRepr = (): ReactElement | null => {
    const dataset = useRecordContext();
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
            <LocationIcon location={dataset.location} />
            <span>{dataset.name}</span>
        </Stack>
    );
};
export default DatasetRaRepr;
