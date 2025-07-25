import { EditButton } from "react-admin";
import RefreshIcon from "@mui/icons-material/Refresh";

const PersonalTokenRaEditButton = () => {
    return (
        <EditButton
            label="resources.personalTokens.actions.refresh"
            startIcon={<RefreshIcon />}
        />
    );
};
export default PersonalTokenRaEditButton;
