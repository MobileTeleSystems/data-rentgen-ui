import { FieldProps, useRecordContext, useTranslate } from "react-admin";
import { PersonalTokenDetailedResponseV1 } from "@/dataProvider/types";
import { Stack, Chip, Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PersonalTokenRaScopesArray = (props: FieldProps) => {
    const translate = useTranslate();
    const record: PersonalTokenDetailedResponseV1 | undefined =
        useRecordContext();

    if (!record) {
        return null;
    }
    return (
        <Stack spacing={1}>
            {record.data.scopes.map((scope, index) => (
                <Box key={index} sx={{ width: "fit-content" }}>
                    <Chip
                        label={translate(
                            `resources.personalTokens.scopes.${scope}`,
                        )}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
                    />
                </Box>
            ))}
        </Stack>
    );
};

export default PersonalTokenRaScopesArray;
