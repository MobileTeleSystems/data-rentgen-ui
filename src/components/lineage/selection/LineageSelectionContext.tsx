import { createContext } from "react";
import { LineageSelection } from "./utils/common";

const LineageSelectionValue = {
    selection: {
        nodeWithColumns: new Map<string, Set<string>>(),
        edges: new Set<string>(),
    },
    setSelection: (newValue: LineageSelection): void => {},
    resetSelection: (): void => {},
};

const LineageSelectionContext = createContext(LineageSelectionValue);

export default LineageSelectionContext;
