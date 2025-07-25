import { DeleteButton } from "react-admin";

const PersonalTokenRaDeleteButton = () => {
    return (
        <DeleteButton
            redirect="list"
            label="resources.personalTokens.actions.revoke"
        />
    );
};
export default PersonalTokenRaDeleteButton;
