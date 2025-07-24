import { useRecordContext } from "react-admin";
import { DatasetDetailedResponseV1 } from "@/dataProvider/types";
import { Stack, Chip, Box } from "@mui/material";

const DatasetRaTag = () => {
    const record: DatasetDetailedResponseV1 | undefined = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Stack spacing={1}>
            {record.data.tags
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tag, index) => (
                    <Box key={index} sx={{ width: "fit-content" }}>
                        <Chip
                            label={`${tag.name}: ${tag.value}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                        ></Chip>
                    </Box>
                ))}
        </Stack>
    );
};

export default DatasetRaTag;
