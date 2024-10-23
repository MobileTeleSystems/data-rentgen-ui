import { required, minLength, DateTimeInput, useTranslate } from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput, useListContext } from "react-admin";

const weekAgo = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() - 7);
    result.setHours(0, 0, 0, 0);
    return result;
};

type RunListFiltersProps = {
    isReadyCallback: (enabled: boolean) => void;
    requiredFilters: string[];
};

const RunListFilters = ({
    isReadyCallback,
    requiredFilters = ["since", "search_query"],
}: RunListFiltersProps) => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const requiredFieldsFilled = requiredFilters.every(
        (filter) => !!filterValues[filter],
    );

    isReadyCallback(requiredFieldsFilled);

    const initialValidators = (field: string) =>
        requiredFilters.includes(field) ? [required()] : [];

    const onSubmit = (values: {
        since?: string;
        until?: string;
        search_query?: string;
    }) => {
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
                            validate={initialValidators("since")}
                            defaultValue={weekAgo()}
                            label="resources.runs.filters.since.label"
                            helperText="resources.runs.filters.since.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="until"
                            validate={initialValidators("until")}
                            label="resources.runs.filters.until.label"
                            helperText="resources.runs.filters.until.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        {/* Not using SearchInput here because it doesn't match styles with other filters */}
                        <TextInput
                            source="search_query"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="disabled" />
                                    </InputAdornment>
                                ),
                            }}
                            validate={[
                                minLength(3),
                                ...initialValidators("search_query"),
                            ]}
                            label="resources.runs.filters.search_query.label"
                            helperText="resources.runs.filters.search_query.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2} mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate("resources.runs.filters.apply_button")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default RunListFilters;
