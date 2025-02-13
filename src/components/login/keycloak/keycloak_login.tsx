import {
    Box,
    Button,
    Card,
    CardActions,
    Stack,
    Typography,
} from "@mui/material";
import { Form, useTranslate, useAuthProvider } from "react-admin";
import { DataRentgenIcon } from "../../icons";

const keycloakLoginForm = () => {
    const translate = useTranslate();

    const authProvider = useAuthProvider();
    if (!authProvider) {
        return null;
    }

    return (
        <Form onSubmit={authProvider.login} noValidate>
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
                    <CardActions sx={{ padding: "0 1em 1em 1em" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                        >
                            {translate("ra.auth.sign_in")}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    );
};

export default keycloakLoginForm;
