import * as React from "react";
import { Layout as RALayout } from "react-admin";
import AppBar from "./AppBar";
import AppMenu from "./AppMenu";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <RALayout appBar={AppBar} menu={AppMenu}>
        {children}
    </RALayout>
);

export default Layout;
