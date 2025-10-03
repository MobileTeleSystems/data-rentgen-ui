import { DeleteButton } from "react-admin";

const PersonalTokenRaDeleteButton = () => {
    return (
        <DeleteButton
            redirect="list"
            label="resources.personalTokens.actions.revoke"
            mutationMode="pessimistic"
        />
    );
};
export default PersonalTokenRaDeleteButton;
