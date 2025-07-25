import { FieldProps, useRecordContext, useTranslate } from "react-admin";
import { Chip } from "@mui/material";
import { PersonalTokenDetailedResponseV1 } from "@/dataProvider/types";

const PersonalTokenRaState = (props: FieldProps) => {
    const translate = useTranslate();
    const record: PersonalTokenDetailedResponseV1 | undefined =
        useRecordContext();
    if (!record) {
        return null;
    }
    const validUntil = new Date(record.data.until);
    if (validUntil < new Date()) {
        return (
            <Chip
                color="error"
                label={translate("resources.personalTokens.status.expired")}
            />
        );
    }
    return (
        <Chip
            color="success"
            label={translate("resources.personalTokens.status.active")}
        />
    );
};

export default PersonalTokenRaState;
