import { minLength, useTranslate } from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput, useListContext } from "react-admin";
import { useEffect } from "react";
import JobTypeRaFilter from "./JobRaTypeFilter";

type JobRaListFilterValues = {
    job_type?: string[];
    search_query?: string;
};

const JobRaListFilters = () => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const submit = form.handleSubmit((formValues: JobRaListFilterValues) => {
        if (Object.keys(formValues).length > 0) {
            setFilters(formValues);
        }
    });

    // fill up filters just after opening the page
    useEffect(() => {
        submit();
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
                <Box display="flex" alignItems="flex-end">
                    <Box component="span" mr={2}>
                        <JobTypeRaFilter />
                    </Box>

                    <Box component="span" mr={2} sx={{ flex: "0.3 1 1" }}>
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
                            label="resources.jobs.filters.search_query.label"
                            helperText="resources.jobs.filters.search_query.helperText"
                        />
                    </Box>

                    <Box component="span" mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate("resources.jobs.filters.apply_button")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default JobRaListFilters;
