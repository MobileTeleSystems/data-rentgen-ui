import { CheckboxGroupInput } from "react-admin";

type PersonalTokenRaScopesCheckboxProps = {
    disabled?: boolean;
};

const PersonalTokenRaScopesCheckbox = ({
    source,
    ...props
}: PersonalTokenRaScopesCheckboxProps & {
    source: string;
}) => {
    return (
        <CheckboxGroupInput
            source="data.scopes"
            label="resources.personalTokens.fields.scopes"
            helperText="resources.personalTokens.helperText.scopes"
            choices={[
                {
                    id: "all:read",
                    name: "resources.personalTokens.scopes.all:read",
                },
                {
                    id: "all:write",
                    name: "resources.personalTokens.scopes.all:write",
                },
            ]}
            defaultValue={["all:read", "all:write"]}
            row={false}
            {...props}
        />
    );
};
export default PersonalTokenRaScopesCheckbox;
