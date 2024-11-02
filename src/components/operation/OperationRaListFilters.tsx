import { required, DateTimeInput, useTranslate } from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { useListContext } from "react-admin";

const OperationRaListFilters = () => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const onSubmit = (values: { since?: string; until?: string }) => {
        if (Object.keys(values).length > 0) {
            setFilters(values);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
