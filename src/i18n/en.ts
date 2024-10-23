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
            types: {
                clickhouse: "ClickHouse",
                greenplum: "Greenplum",
                hive: "Hive",
                kafka: "Kafka",
                mongodb: "MongoDB",
                mysql: "MySQL",
                oracle: "Oracle",
                postgresql: "PostgreSQL",
                sqlserver: "SQL Server",
                teradata: "Teradata",
                ftp: "FTP",
                ftps: "FTPS",
                sftp: "SFTP",
                hdfs: "HDFS",
                s3: "S3",
                samba: "Samba",
                webdav: "WebDAV",
                yarn: "YARN",
                http: "HTTP",
                https: "HTTPS",
                local: "Local",
            },
        },
        datasets: {
            name: "Dataset |||| Datasets",
            amount: "1 dataset |||| %{smart_count} datasets",
            title: "Dataset %{reference}",
            fields: {
                id: "Dataset ID",
                name: "Dataset name",
                format: "Format",
                location: {
                    name: "Location Name",
                    type: "Location Type",
                },
            },
            filters: {
                search_query: {
                    label: "Search",
                    placeholder: "Filter by name or address",
                },
            },
        },
        jobs: {
            name: "Job |||| Jobs",
            amount: "1 job |||| %{smart_count} jobs",
            title: "Job %{reference}",
            types: {
                airflow: {
                    task: "Airflow Task",
                    dag: "Airflow DAG",
                },
                spark: {
                    application: "Spark Application",
                },
            },
            fields: {
                id: "Job ID",
                name: "Job Name",
                type: "Job Type",
                location: {
                    name: "Location Name",
                    type: "Location Type",
                },
            },
            sections: {
                runs: "Runs",
            },
            filters: {
                search_query: {
                    label: "Search",
                    placeholder: "Filter by name or address",
                },
            },
        },
        runs: {
            name: "Run |||| Runs",
            amount: "1 run |||| %{smart_count} runs",
            title: "Run %{reference}",
            fields: {
                id: "Run ID",
                created_at: "Created at",
                job_id: "Job ID",
                status: "Status",
                parent_run_id: "Parent Run ID",
                started_at: "Started at",
                started_by_user: "Started by user",
                start_reason: "Start reason",
                ended_at: "Ended at",
                end_reason: "End reason",
                external_id: "External ID",
                attempt: "Attempt",
                running_log_url: "Running log URL",
                persistent_log_url: "Persistent log URL",
            },
            sections: {
                created: "Created",
                started: "Started",
                ended: "Ended",
                external: "External",
                when: "When",
                how: "How",
                for_job: "For Job",
                by_parent_run: "By Parent Run",
                as_user: "As User",
                duration: "Duration",
                id: "ID",
                attempt: "Attempt",
                external_url: "External URL",
                logs_url: "Logs URL",
                operations: "Operations",
            },
            filters: {
                since: {
                    label: "Since",
                    helperText: "Include only runs created after",
                },
                until: {
                    label: "Until",
                    helperText: "Include only runs created before",
                },
                search_query: {
                    label: "Search",
                    helperText: "Filter by applicationId",
                },
                apply_button: "Apply",
            },
        },
        operations: {
            name: "Operation |||| Operations",
            amount: "1 operation |||| %{smart_count} operations",
            title: "Operation %{reference}",
            fields: {
                id: "Operation ID",
                created_at: "Created at",
                run_id: "Run ID",
                position: "Position",
                name: "Name",
                group: "Group",
                description: "Description",
                origin: "Origin",
                status: "Status",
                started_at: "Started at",
                ended_at: "Ended at",
            },
            sections: {
                created: "Created",
                by_run: "By Run",
                external: "External",
                name: "Name",
                position: "Position",
                group: "Group",
                description: "Description",
                started: "Started",
                ended: "Ended",
                when: "When",
                duration: "Duration",
            },
            filters: {
                since: {
                    label: "Since",
                    helperText: "Include only operations created after",
                },
                until: {
                    label: "Until",
                    helperText: "Include only operations created before",
                },
                apply_button: "Apply",
            },
        },
    },
    errors: {
        fetch: "Cannot fetch %{resource}",
    },
};

export default customEnglishMessages;
