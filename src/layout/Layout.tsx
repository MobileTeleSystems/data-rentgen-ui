import * as React from "react";
import { Layout } from "react-admin";
import AppBar from "./AppBar";
import AppMenu from "./AppMenu";

export default ({ children }: { children: React.ReactNode }) => (
    <Layout appBar={AppBar} menu={AppMenu}>
        {children}
    </Layout>
);
