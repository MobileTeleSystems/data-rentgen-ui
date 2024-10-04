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
import { useRecordContext, useTranslate } from "react-admin";
import { DatasetResponseV1 } from "@/dataProvider/types";
import { Stack } from "@mui/material";
import { Cloud, QuestionMark } from "@mui/icons-material";

const DatasetLocationIcon = (): ReactElement | null => {
    const record = useRecordContext<DatasetResponseV1>();
    if (!record) {
        return null;
    }

    const translate = useTranslate();

    switch (record.location.type) {
        case "clickhouse":
            return (
                <Stack>
                    <ClickhouseIcon />
                    {translate(`resources.locations.types.clickhouse`)}
                </Stack>
            );
        case "greenplum":
            return (
                <Stack>
                    <GreenplumIcon />
                    {translate(`resources.locations.types.greenplum`)}
                </Stack>
            );
        case "hive":
            return (
                <Stack>
                    <ApacheHiveIcon />
                    {translate(`resources.locations.types.hive`)}
                </Stack>
            );
        case "kafka":
            return (
                <Stack>
                    <ApacheKafkaIcon />
                    {translate(`resources.locations.types.kafka`)}
                </Stack>
            );
        case "mongodb":
            return (
                <Stack>
                    <MongoDBIcon />
                    {translate(`resources.locations.types.mongodb`)}
                </Stack>
            );
        case "mysql":
            return (
                <Stack>
                    <MySQLIcon />
                    {translate(`resources.locations.types.mysql`)}
                </Stack>
            );
        case "oracle":
            return (
                <Stack>
                    <OracleIcon />
                    {translate(`resources.locations.types.oracle`)}
                </Stack>
            );
        case "postgres":
            return (
                <Stack>
                    <PostgreSQLIcon />
                    {translate(`resources.locations.types.postgres`)}
                </Stack>
            );
        case "sqlserver":
            return (
                <Stack>
                    <MSSQLServerIcon />
                    {translate(`resources.locations.types.sqlserver`)}
                </Stack>
            );
        case "teradata":
            return (
                <Stack>
                    <TeradataIcon />
                    {translate(`resources.locations.types.teradata`)}
                </Stack>
            );
        case "ftp":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.ftp`)}
                </Stack>
            );
        case "ftps":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.ftps`)}
                </Stack>
            );
        case "hdfs":
            return (
                <Stack>
                    <ApacheHadoopIcon />
                    {translate(`resources.locations.types.hdfs`)}
                </Stack>
            );
        case "sftp":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.sftp`)}
                </Stack>
            );
        case "s3":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.s3`)}
                </Stack>
            );
        case "samba":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.samba`)}
                </Stack>
            );
        case "webdav":
            return (
                <Stack>
                    <Cloud />
                    {translate(`resources.locations.types.webdav`)}
                </Stack>
            );
        default:
            return (
                <Stack>
                    <QuestionMark />
                    {record.location.type}
                </Stack>
            );
    }
};

export default DatasetLocationIcon;
