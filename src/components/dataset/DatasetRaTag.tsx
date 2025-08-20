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
            {record.tags?.map((tag, tag_index) => (
                <Box key={tag_index} sx={{ width: "fit-content" }}>
                    {tag.values.map((tag_value, tag_value_index) => (
                        <Chip
                            key={tag_value_index}
                            label={`${tag.name}: ${tag_value.value}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                        />
                    ))}
                </Box>
            ))}
        </Stack>
    );
};

export default DatasetRaTag;
