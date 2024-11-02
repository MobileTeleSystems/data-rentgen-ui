import { ReactElement } from "react";
import {
    ApacheHadoopIcon,
    ApacheHiveIcon,
    ApacheKafkaIcon,
    ClickhouseIcon,
    GreenplumIcon,
    MongoDBIcon,
    MSSQLServerIcon,
    MySQLIcon,
    OracleIcon,
    PostgreSQLIcon,
    TeradataIcon,
} from "@/components/icons";
import { LocationResponseV1 } from "@/dataProvider/types";
import { Cloud, Computer, Public, QuestionMark } from "@mui/icons-material";

const LocationIcon = ({
    location,
}: {
    location: LocationResponseV1;
}): ReactElement => {
    switch (location.type) {
        case "clickhouse":
            return <ClickhouseIcon />;
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
        case "sqlserver":
            return <MSSQLServerIcon />;
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
            return <Computer />;
        case "http":
        case "https":
            return <Public />;
        default:
            return <QuestionMark />;
    }
};

export default LocationIcon;
