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
            locations: "Locations",
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
            fields: {
                id: "Location ID",
                type: "Location type",
                name: "Location name",
                external_id: "External ID",
            },
            filters: {
                search_query: {
                    label: "Search",
                    placeholder: "Filter by name or address",
                },
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
                schema: {
                    input: "Input schema (projected) |||| Latest of %{smart_count} input schemas (projected)",
                    output: "Output Schema |||| Latest of %{smart_count} output schemas",
                    field: {
                        name: "Field",
                        type: "Type",
                        description: "Description",
                    },
                },
            },
            tabs: {
                lineage: "Lineage",
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
                airflow_task: "Airflow Task",
                airflow_dag: "Airflow DAG",
                spark_application: "Spark Application",
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
            tabs: {
                runs: "Runs",
                lineage: "Lineage",
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
                job: "Job",
                status: "Status",
                parent_run: "Parent Run",
                started_at: "Started at",
                started_by_user: "Started by user",
                start_reason: "Start reason",
                ended_at: "Ended at",
                end_reason: "End reason",
                duration: "Duration",
                external_id: "External ID",
                attempt: "Attempt",
                running_log_url: "Running log URL",
                persistent_log_url: "Persistent log URL",
                statistics: {
                    name: "Statistics",
                    inputs: "Total inputs",
                    outputs: "Total outputs",
                    operations: "Total operations",
                    rows: "row |||| rows",
                    files: "file |||| files",
                },
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
                statistics: {
                    name: "Statistics",
                    inputs: "Total inputs",
                    outputs: "Total Outputs",
                },
            },
            tabs: {
                operations: "Operations",
                child_runs: "Child runs",
                lineage: "Lineage",
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
                duration: "Duration",
                statistics: {
                    name: "Statistics",
                    inputs: "Total inputs",
                    outputs: "Total outputs",
                    rows: "row |||| rows",
                    files: "file |||| files",
                },
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
                statistics: {
                    name: "Statistics",
                    inputs: "Total inputs",
                    outputs: "Total Outputs",
                },
            },
            tabs: {
                lineage: "Lineage",
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
                search_query: {
                    label: "Search",
                    helperText: "Filter by name, group or description",
                },
            },
        },
    },
    errors: {
        fetch: "Cannot fetch %{resource}",
    },
    lineage: {
        filters: {
            since: {
                label: "Since",
                helperText: "Include only events created after",
            },
            until: {
                label: "Until",
                helperText: "Include only events created before",
            },
            depth: {
                label: "Depth",
                helperText: "How many levels of events to include",
            },
            direction: {
                label: "Direction",
                helperText: "Include only events with specific direction",
                both: "Downstream & upstream",
                downstream: "Downstream",
                upstream: "Upstream",
            },
            granularity: {
                label: "Granularity",
                helperText: "Include only events with specific granularity",
                job: "Job",
                run: "Run",
                operation: "Operation",
            },
        },
        build_button: "Build lineage graph",
    },
};

export default customEnglishMessages;
