import { IconButton, IconButtonProps, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Origin: https://mui.com/material-ui/react-card/#complex-interaction
interface ExpandMoreProps extends IconButtonProps {
    isExpanded: boolean;
}

const ShowMoreButton = styled((props: ExpandMoreProps) => {
    const { isExpanded, ...other } = props;
    return (
        <IconButton {...other}>
            <ExpandMoreIcon />
        </IconButton>
    );
})(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ isExpanded }) => !isExpanded,
            style: {
                transform: "rotate(0deg)",
            },
        },
        {
            props: ({ isExpanded }) => !!isExpanded,
            style: {
                transform: "rotate(180deg)",
            },
        },
    ],
}));

export default ShowMoreButton;
