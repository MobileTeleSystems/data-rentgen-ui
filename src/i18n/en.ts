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
            type: "Type",
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
                postgres: "PostgreSQL",
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
                id: "Internal ID",
                type: "Location type",
                name: "Location name",
                external_id: "External ID",
                addresses: "Addresses",
            },
            filters: {
                location_type: {
                    label: "Location Type",
                    helperText: "Only selected",
                },
                search_query: {
                    label: "Search",
                    helperText: "Filter by name or address",
                },
            },
            tabs: {
                datasets: "Datasets",
                jobs: "Jobs",
            },
        },
        datasets: {
            name: "Dataset |||| Datasets",
            amount: "1 dataset |||| %{smart_count} datasets",
            title: "Dataset %{reference}",
            fields: {
                id: "Internal ID",
                name: "Dataset name",
                tags: "Tags",
                schema: {
                    exact_match: "Schema projection",
                    latest_known: "Schema projection (latest)",
                    field: {
                        name: "Field",
                        type: "Type",
                        description: "Description",
                    },
                    search: {
                        name: "Search",
                        placeholder: "Filter by name",
                    },
                    pagination: {
                        all: "All",
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
                flink_job: "Flink Job",
                dbt_job: "DBT Job",
                hive_session: "Hive Session",
                spark_application: "Spark Application",
            },
            fields: {
                id: "Internal ID",
                name: "Job Name",
                type: "Job Type",
            },
            tabs: {
                runs: "Runs",
                lineage: "Lineage",
            },
            filters: {
                job_type: {
                    label: "Job Type",
                    helperText: "Only selected",
                },
                search_query: {
                    label: "Search",
                    helperText: "Filter by name or address",
                },
                apply_button: "Apply",
            },
        },
        runs: {
            name: "Run |||| Runs",
            amount: "1 run |||| %{smart_count} runs",
            title: "Run %{reference}",
            fields: {
                id: "Internal ID",
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
                },
            },
            sections: {
                created: "Created",
                started: "Started",
                ended: "Ended",
                external: "External",
                external_id: "External ID",
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
                    helperText: "Minimal created_at",
                },
                until: {
                    label: "Until",
                    helperText: "Maximum created_at",
                },
                status: {
                    label: "Status",
                    helperText: "Only selected",
                },
                started_by_user: {
                    label: "Started by user",
                    helperText: "Username (exact match)",
                },
                search_query: {
                    label: "Search",
                    helperText:
                        "Filter by external ID (including partial match)",
                },
                apply_button: "Apply",
            },
            pagination: {
                all: "All",
            },
        },
        operations: {
            name: "Operation |||| Operations",
            amount: "1 operation |||| %{smart_count} operations",
            title: "Operation %{reference}",
            fields: {
                id: "Internal ID",
                created_at: "Created at",
                run_id: "Run ID",
                position: "Position",
                name: "Name",
                group: "Group",
                description: "Description",
                sql_query: "SQL query",
                origin: "Origin",
                status: "Status",
                started_at: "Started at",
                ended_at: "Ended at",
                duration: "Duration",
                statistics: {
                    name: "Statistics",
                    inputs: "Total inputs",
                    outputs: "Total outputs",
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
                sql_query: "SQL query",
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
                    helperText: "Minimal created_at",
                },
                until: {
                    label: "Until",
                    helperText: "Maximum created_at",
                },
                search_query: {
                    label: "Search",
                    helperText:
                        "Filter by name, group or description (partial match)",
                },
                apply_button: "Apply",
            },
            pagination: {
                all: "All",
            },
        },
        personalTokens: {
            name: "Personal Token |||| Personal Tokens",
            amount: "1 personal token |||| %{smart_count} personal tokens",
            title: "Personal Token %{reference}",
            fields: {
                id: "Internal ID",
                name: "Name",
                scopes: "Scopes",
                since: "Since",
                until: "Until",
                status: "State",
            },
            helperText: {
                name: "Unique token name",
                scopes: "Currently scopes are fixed",
                since: "Token is valid since this date",
                until: "Token is valid until this date (inclusive)",
            },
            scopes: {
                "all:read": "Read all objects",
                "all:write": "Write all objects",
            },
            status: {
                active: "ACTIVE",
                expired: "EXPIRED",
            },
            actions: {
                refresh: "Refresh",
                revoke: "Revoke",
            },
            notification: {
                tokenCreated:
                    "Token in text form is copied to your clipboard. You should save it somewhere - it will be lost when you leave this page!",
            },
        },
    },
    errors: {
        fetch: "Cannot fetch %{resource}",
    },
    units: {
        rows: "row |||| rows",
        files: "file |||| files",
    },
    lineage: {
        filters: {
            since: {
                label: "Since",
                helperText: "Only events created after",
            },
            until: {
                label: "Until",
                helperText: "Only events created before",
            },
            depth: {
                label: "Depth",
                helperText: "Number of node → edge → node hops (up an down)",
            },
            direction: {
                label: "Direction",
                helperText: "Only events with specific direction",
                both: "Upstream & downstream",
                downstream: "Downstream",
                upstream: "Upstream",
            },
            granularity: {
                label: "Granularity",
                helperText: "Max node type to include",
                dataset: "Datasets",
                job: "Jobs",
                run: "Runs",
                operation: "Operations",
            },
            include_column_lineage: {
                label: "Column lineage",
                helperText: "Draw lineage between columns",
            },
        },
        build_button: "Build lineage graph",
    },
};

export default customEnglishMessages;
