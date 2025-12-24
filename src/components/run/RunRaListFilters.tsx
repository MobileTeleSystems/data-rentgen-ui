import {
    TextInput,
    required,
    minLength,
    DateTimeInput,
    useTranslate,
    useListContext,
} from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect } from "react";
import RunRaStatusFilter from "./RunRaStatusFilter";
import { JobTypeRaFilter } from "../job";

type RunRaListFilterValues = {
    since?: string;
    until?: string;
    status?: string;
    job_type?: string;
    started_by_user?: string;
    search_query?: string;
};
type RunRaListFilterKeys = keyof RunRaListFilterValues;
const filterKeys: RunRaListFilterKeys[] = [
    "since",
    "until",
    "status",
    "job_type",
    "started_by_user",
    "search_query",
];

export const weekAgo = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() - 7);
    result.setHours(0, 0, 0, 0);
    return result;
};

const RunRaListFilters = () => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formValues: RunRaListFilterValues & { [key: string]: any }) => {
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
        [setFilters],
    );

    const submit = form.handleSubmit(onSubmit);

    useEffect(() => {
        submit();
    }, [form]);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
                <Box display="flex" alignItems="flex-end">
                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="since"
                            validate={required()}
                            label="resources.runs.filters.since.label"
                            helperText="resources.runs.filters.since.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="until"
                            label="resources.runs.filters.until.label"
                            helperText="resources.runs.filters.until.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <RunRaStatusFilter />
                    </Box>

                    <Box component="span" mr={2}>
                        <JobTypeRaFilter />
                    </Box>

                    <Box component="span" mr={2}>
                        <TextInput
                            source="started_by_user"
                            label="resources.runs.filters.started_by_user.label"
                            helperText="resources.runs.filters.started_by_user.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2} sx={{ flex: "0.5 1 1" }}>
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
                            validate={minLength(3)}
                            label="resources.runs.filters.search_query.label"
                            helperText="resources.runs.filters.search_query.helperText"
                        />
                    </Box>

                    <Box component="span" mb={4}>
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

export default RunRaListFilters;
