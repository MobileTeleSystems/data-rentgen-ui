import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        search: "Search",
        configuration: "Configuration",
        language: "Language",
        theme: {
            name: "Theme",
            light: "Light",
            dark: "Dark",
        },
        menu: {
            datasets: "Datasets",
            jobs: "Jobs",
            runs: "Runs",
        },
    },
    resources: {
        locations: {
            name: "Location |||| Locations",
            amount: "1 location |||| %{smart_count} locations",
            title: "Location %{reference}",
        },
        datasets: {
            name: "Dataset |||| Datasets",
            amount: "1 dataset |||| %{smart_count} datasets",
            title: "Dataset %{reference}",
        },
        jobs: {
            name: "Job |||| Jobs",
            amount: "1 job |||| %{smart_count} jobs",
            title: "Job %{reference}",
        },
        runs: {
            name: "RUn |||| Runs",
            amount: "1 run |||| %{smart_count} runs",
            title: "Run %{reference}",
        },
    },
};

export default customEnglishMessages;
