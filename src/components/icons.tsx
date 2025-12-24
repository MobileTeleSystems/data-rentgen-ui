import ApacheAirflowIcon from "@assets/icons/apache-airflow.svg?react";
import ApacheFlinkIcon from "@assets/icons/apache-flink.svg?react";
import ApacheHadoopIcon from "@assets/icons/apache-hadoop.svg?react";
import ApacheHiveIcon from "@assets/icons/apache-hive.svg?react";
import ApacheKafkaIcon from "@assets/icons/apache-kafka.svg?react";
import ApacheSparkIcon from "@assets/icons/apache-spark.svg?react";
import ClickhouseIcon from "@assets/icons/clickhouse.svg?react";
import DBTIcon from "@assets/icons/dbt.svg?react";
import GreenplumIcon from "@assets/icons/greenplum.svg?react";
import MSSQLServerIcon from "@assets/icons/microsoft-sql-server.svg?react";
import MongoDBIcon from "@assets/icons/mongodb.svg?react";
import MySQLIcon from "@assets/icons/mysql.svg?react";
import OracleIcon from "@assets/icons/oracle.svg?react";
import PostgreSQLIcon from "@assets/icons/postgresql.svg?react";
import TeradataIcon from "@assets/icons/teradata.svg?react";
import DatasetIcon from "@assets/icons/dataset.svg?react";
import DataRentgenIcon from "@assets/icons/data-rentgen.svg?react";
import ReplickIcon from "@assets/icons/replick.svg?react";
import SyncMasterIcon from "@assets/icons/syncmaster.svg?react";
import { ReactElement } from "react";
import { Cloud, Computer, Public, QuestionMark } from "@mui/icons-material";

const IconByName = ({ name }: { name: string }): ReactElement => {
    const nameLower = name.toLowerCase().split(/[^a-z]/)[0];

    switch (nameLower) {
        case "airflow":
            return <ApacheAirflowIcon />;
        case "clickhouse":
            return <ClickhouseIcon />;
        case "dbt":
            return <DBTIcon />;
        case "flink":
            return <ApacheFlinkIcon />;
        case "greenplum":
            return <GreenplumIcon />;
        case "hive":
            return <ApacheHiveIcon />;
        case "kafka":
            return <ApacheKafkaIcon />;
        case "mongodb":
            return <MongoDBIcon />;
        case "mysql":
            return <MySQLIcon />;
        case "oracle":
            return <OracleIcon />;
        case "postgres":
            return <PostgreSQLIcon />;
        case "replick":
            return <ReplickIcon />;
        case "spark":
            return <ApacheSparkIcon />;
        case "sqlserver":
            return <MSSQLServerIcon />;
        case "syncmaster":
            return <SyncMasterIcon />;
        case "teradata":
            return <TeradataIcon />;
        case "hdfs":
        case "yarn":
            return <ApacheHadoopIcon />;
        case "ftp":
        case "ftps":
        case "sftp":
        case "s3":
        case "samba":
        case "webdav":
            return <Cloud />;
        case "local":
        case "file":
            return <Computer />;
        case "http":
        case "https":
            return <Public />;
        default:
            return <QuestionMark />;
    }
};

export {
    ApacheAirflowIcon,
    ApacheFlinkIcon,
    ApacheHadoopIcon,
    ApacheHiveIcon,
    ApacheKafkaIcon,
    ApacheSparkIcon,
    ClickhouseIcon,
    DBTIcon,
    GreenplumIcon,
    MSSQLServerIcon,
    MongoDBIcon,
    MySQLIcon,
    OracleIcon,
    PostgreSQLIcon,
    TeradataIcon,
    DatasetIcon,
    DataRentgenIcon,
    ReplickIcon,
    SyncMasterIcon,
    IconByName,
};
