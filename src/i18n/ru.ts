import { TranslationMessages } from "react-admin";
import russianMessages from "ra-language-russian";

const customRussianMessages: TranslationMessages = {
    ...russianMessages,
    pos: {
        search: "Поиск",
        configuration: "Настройки",
        language: "Язык",
        theme: {
            name: "Тема",
            light: "Светлая",
            dark: "Темная",
        },
        menu: {
            locations: "Расположения",
            datasets: "Датасеты",
            jobs: "Джобы",
            runs: "Запуски",
        },
    },
    resources: {
        locations: {
            name: "Расположение |||| Расположения",
            type: "Тип",
            amount: "%{smart_count} расположение |||| %{smart_count} расположения |||| %{smart_count} расположений",
            title: "Расположение %{reference}",
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
                id: "Внутренний идентификатор",
                type: "Тип расположения",
                name: "Имя расположения",
                external_id: "Внешний идентификатор",
                addresses: "Адреса",
            },
            filters: {
                search_query: {
                    label: "Поиск",
                    placeholder: "Фильтр по имени или адресу",
                },
            },
        },
        datasets: {
            name: "Датасет |||| Датасеты",
            amount: "%{smart_count} датасет |||| %{smart_count} датасета |||| %{smart_count} датасетов",
            title: "Датасет %{reference}",
            fields: {
                id: "Внутренний идентификатор",
                name: "Имя датасета",
                format: "Формат",
                schema: {
                    input: {
                        exact_match: "Проекция схемы на чтение",
                        latest_known: "Проекция схемы на чтение (последняя)",
                    },
                    output: {
                        exact_match: "Схема на запись",
                        latest_known: "Схема на запись (последняя)",
                    },
                    field: {
                        name: "Поле",
                        type: "Тип",
                        description: "Описание",
                    },
                    search: {
                        name: "Поиск",
                        placeholder: "Фильтр по имени",
                    },
                    pagination: {
                        all: "Все",
                    },
                },
            },
            tabs: {
                lineage: "Линедж",
            },
            filters: {
                search_query: {
                    label: "Поиск",
                    placeholder: "Фильтр по имени или адресу",
                },
            },
        },
        jobs: {
            name: "Джоба |||| Джобы",
            amount: "%{smart_count} джоба |||| %{smart_count} джобы |||| %{smart_count} джоб",
            title: "Джоба %{reference}",
            types: {
                airflow_task: "Airflow Task",
                airflow_dag: "Airflow DAG",
                flink_job: "Flink Job",
                dbt_job: "DBT Job",
                hive_session: "Hive Session",
                spark_application: "Spark Application",
            },
            fields: {
                id: "Внутренний идентификатор",
                name: "Имя джобы",
                type: "Тип джобы",
            },
            tabs: {
                runs: "Запуски",
                lineage: "Линедж",
            },
            filters: {
                search_query: {
                    label: "Поиск",
                    placeholder: "Фильтр по имени или адресу",
                },
            },
        },
        runs: {
            name: "Запуск |||| Запуски",
            amount: "%{smart_count} запуск |||| %{smart_count} запуска |||| %{smart_count} запусков",
            title: "Запуск %{reference}",
            fields: {
                id: "Внутренний идентификатор",
                created_at: "Создан",
                job: "Джоба",
                status: "Статус",
                parent_run: "Родительский запуск",
                started_at: "Запущен",
                started_by_user: "Запущен пользователем",
                start_reason: "Причина запуска",
                ended_at: "Завершен",
                end_reason: "Причина завершения",
                duration: "Длительность",
                external_id: "Внешний идентификатор",
                attempt: "Попытка №",
                running_log_url: "URL логов",
                persistent_log_url: "Постоянный URL",
                statistics: {
                    name: "Статистика",
                    inputs: "Всего прочитано",
                    outputs: "Всего записано",
                    operations: "Всего операций",
                },
            },
            sections: {
                created: "Создан",
                started: "Запущен",
                ended: "Завершен",
                external: "Внешняя информация",
                when: "Когда",
                how: "Как",
                for_job: "Для джобы",
                by_parent_run: "Родительским запуском",
                as_user: "Кем",
                duration: "Длительность",
                external_id: "Внешний идентификатор",
                attempt: "№ попытки ",
                external_url: "Внешний URL",
                logs_url: "URL логов",
                statistics: {
                    name: "Статистика",
                    inputs: "Всего прочитано",
                    outputs: "Всего записано",
                },
            },
            tabs: {
                operations: "Операции",
                child_runs: "Дочерние запуски",
                lineage: "Линедж",
            },
            filters: {
                since: {
                    label: "Дата начала",
                    helperText: "Запуски, созданные после указанной даты",
                },
                until: {
                    label: "Дата окончания",
                    helperText: "Запуски, созданные до указанной даты",
                },
                search_query: {
                    label: "Поиск",
                    helperText: "Фильтр по applicationId и т.п.",
                },
                apply_button: "Применить",
            },
            pagination: {
                all: "Все",
            },
        },
        operations: {
            name: "Операция |||| Операци",
            amount: "%{smart_count} операция |||| %{smart_count} операции |||| %{smart_count} операций",
            title: "Операция %{reference}",
            fields: {
                id: "Внутренний идентификатор",
                created_at: "Создана",
                run_id: "Запуск",
                position: "№ п/п",
                name: "Название",
                group: "Группа",
                description: "Описание",
                sql_query: "SQL запрос",
                origin: "Источник",
                status: "Статус",
                started_at: "Запущена",
                ended_at: "Завершена",
                duration: "Длительность",
                statistics: {
                    name: "Статистика",
                    inputs: "Всего прочитано",
                    outputs: "Всего записано",
                },
            },
            sections: {
                created: "Создана",
                by_run: "Запуском",
                external: "Внешнее",
                name: "Название",
                position: "№ п/п",
                group: "Группа",
                description: "Описание",
                sql_query: "SQL запрос",
                started: "Запущена",
                ended: "Остановлена",
                when: "Когда",
                duration: "Длительность",
                statistics: {
                    name: "Статистика",
                    inputs: "Всего прочитано",
                    outputs: "Всего записано",
                },
            },
            tabs: {
                lineage: "Линедж",
            },
            filters: {
                since: {
                    label: "Дата начала",
                    helperText: "Операции, созданные после указанной даты",
                },
                until: {
                    label: "Дата окончания",
                    helperText: "Операции, созданные до указанной даты",
                },
                search_query: {
                    label: "Поиск",
                    helperText: "Фильтр по названию, группе или описанию",
                },
                apply_button: "Применить",
            },
            pagination: {
                all: "Все",
            },
        },
    },
    errors: {
        fetch: "Невозможно получить %{resource}",
    },
    lineage: {
        filters: {
            since: {
                label: "Дата начала",
                helperText: "События, созданные после указанной даты",
            },
            until: {
                label: "Дата окончания",
                helperText: "События, созданные до указанной даты",
            },
            depth: {
                label: "Глубина",
                helperText:
                    'На сколько узлов "вниз" спускаться по графу (или подниматься "вверх")',
            },
            direction: {
                label: "Направление",
                helperText: "Только события с указанным направлением",
                both: "Входящие и исходящие",
                downstream: "Исходящие",
                upstream: "Входящие",
            },
            granularity: {
                label: "Детализация",
                helperText: "Суммировать линедж до указанного типа узлов",
                dataset: "Датасеты",
                job: "Джобы",
                run: "Запуски",
                operation: "Операции",
            },
            include_column_lineage: {
                label: "Колоночный линедж",
                helperText: "Отобразить связи между колонками",
            },
        },
        build_button: "Построить граф",
    },
    units: {
        numbers: {
            K: " тыс.",
            M: " млн",
            B: " млрд",
            T: " трлн",
        },
        bytes: {
            Bytes: "Байт",
            KiB: "КиБ",
            MiB: "МиБ",
            GiB: "ГиБ",
            TiB: "ТиБ",
            PiB: "ПиБ",
            EiB: "ЭиБ",
            ZiB: "ЗиБ",
            YiB: "ЙиБ",
        },
        time: {
            hours: "ч",
            minutes: "м",
            seconds: "с",
        },
        rows: "строка |||| строки |||| строк",
        files: "файл |||| файла |||| файлов",
    },
    statuses: {
        STARTED: "ЗАПУЩЕН",
        RUNNING: "РАБОТАЕТ",
        SUCCEEDED: "УСПЕХ",
        FAILED: "ОШИБКА",
        KILLED: "УБИТ",
        UNKNOWN: "НЕИЗВЕСТНО",
    },
    edges: {
        ioTypes: {
            ALTER: "МОДИЦИФИРОВАН",
            CREATE: "СОЗДАН",
            DROP: "УДАЛЕН",
            OVERWRITE: "ЗАМЕНЕН",
            RENAME: "ПЕРЕИМЕНОВАН",
            TRUNCATE: "ОЧИЩЕН",
        },
        columnLineageTypes: {
            UNKNOWN: "НЕИЗВЕСТНО",
            IDENTITY: "КАК ЕСТЬ",
            TRANSFORMATION: "ТРАНСФОРМАЦИЯ",
            TRANSFORMATION_MASKING: "МАСКИРОВАНИЕ",
            AGGREGATION: "АГРЕГАЦИЯ",
            AGGREGATION_MASKING: "КОЛИЧЕСТВО",
            FILTER: "ФИЛЬТР",
            JOIN: "СОЕДИНЕНИЕ",
            GROUP_BY: "ГРУППИРОВКА",
            SORT: "СОРТИРОВКА",
            WINDOW: "ОКОННАЯ ФУНКЦИЯ",
            CONDITIONAL: "УСЛОВИЕ",
        },
        labels: {
            SYMLINK: "СИМЛИНК",
        },
    },
};

customRussianMessages.ra.navigation.clear_filters = "Сбросить фильтры";
customRussianMessages.ra.navigation.no_filtered_results = "Ничего не найдено";

export default customRussianMessages;
