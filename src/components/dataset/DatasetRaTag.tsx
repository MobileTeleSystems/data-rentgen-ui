import { useRecordContext } from "react-admin";
import { Stack, Chip, Box } from "@mui/material";
import { Key } from "react";

const DatasetRaTag = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Stack spacing={1}>
            {record.data.tags.map(
                (tag: { name: string; value: string }, index: Key) => (
                    <Box key={index} sx={{ width: "fit-content" }}>
                        <Chip
                            label={`${tag.name}: ${tag.value}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                        ></Chip>
                    </Box>
                ),
            )}
        </Stack>
    );
};

export default DatasetRaTag;
