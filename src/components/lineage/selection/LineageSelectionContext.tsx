import { createContext } from "react";
import { LineageSelection } from "./utils/common";

const LineageSelectionValue = {
    selection: {
        nodeWithHandles: new Map<string, Set<string>>(),
        edges: new Set<string>(),
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelection: (newValue: LineageSelection): void => {},
    resetSelection: (): void => {},
};

const LineageSelectionContext = createContext(LineageSelectionValue);

export default LineageSelectionContext;
