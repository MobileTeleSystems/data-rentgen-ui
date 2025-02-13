import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
} from "react-admin";
import { DataRentgenIcon } from "../icons";

interface FormValues {
    username?: string;
    password?: string;
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();

    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(
            auth,
            /* eslint-disable @typescript-eslint/no-explicit-any */
            location.state ? (location.state as any).nextPathname : "/",
        ).catch((error: Error) => {
            setLoading(false);
            notify(error?.message ?? "ra.auth.sign_in_error", {
                type: "error",
                messageArgs: {
                    _: error?.message,
                },
            });
        });
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    background:
                        "url(https://source.unsplash.com/featured/1600x900)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: "6em" }}>
                    <Stack
                        direction="column"
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <DataRentgenIcon />
                        <Typography variant="h5">Data.Rentgen</Typography>
                    </Stack>
                    <Box
                        sx={{
                            marginTop: "1em",
                            display: "flex",
                            justifyContent: "center",
                            color: (theme) => theme.palette.grey[500],
                        }}
                    ></Box>
                    <Box sx={{ padding: "0 1em 1em 1em" }}>
                        <Box sx={{ marginTop: "1em" }}>
                            <TextInput
                                autoFocus
                                source="username"
                                label={translate("ra.auth.username")}
                                disabled={loading}
                                validate={required()}
                            />
                        </Box>
                        <Box sx={{ marginTop: "1em" }}>
                            <TextInput
                                source="password"
                                label={translate("ra.auth.password")}
                                type="password"
                                disabled={loading}
                                validate={required()}
                            />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: "0 1em 1em 1em" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {translate("ra.auth.sign_in")}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    );
};

export default Login;
