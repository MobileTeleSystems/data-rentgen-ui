export const statusToThemeColor = (
    status: string,
): "primary" | "success" | "error" | "warning" => {
    switch (status) {
        case "SUCCEEDED":
            return "success";
        case "FAILED":
        case "KILLED":
            return "error";
        case "UNKNOWN":
            return "warning";
        default:
            return "primary";
    }
};
