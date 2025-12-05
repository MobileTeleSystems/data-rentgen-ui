import { required, DateTimeInput, useTranslate } from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { useListContext } from "react-admin";
import { useEffect } from "react";

type OperationRaListFilterValues = {
    since?: string;
    until?: string;
};
type OperationRaListFilterKeys = keyof OperationRaListFilterValues;
const filterKeys: OperationRaListFilterKeys[] = ["since", "until"];

const OperationRaListFilters = () => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const submit = form.handleSubmit(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formValues: OperationRaListFilterValues & { [key: string]: any }) => {
            const keys = Object.keys(formValues);
            const validKeys = filterKeys.filter((key) => keys.includes(key));
            if (validKeys.length > 0) {
                const validValues = validKeys.reduce(
                    (acc, key) => ({ ...acc, [key]: formValues[key] }),
                    {},
                );
                setFilters(validValues);
            }
        },
    );

    // fill up filters just after opening the page
    useEffect(() => {
        submit();
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
                <Box display="flex" alignItems="flex-end">
                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="since"
                            validate={required()}
                            label="resources.operations.filters.since.label"
                            helperText="resources.operations.filters.since.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="until"
                            label="resources.operations.filters.until.label"
                            helperText="resources.operations.filters.until.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2} mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate(
                                "resources.operations.filters.apply_button",
                            )}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default OperationRaListFilters;
