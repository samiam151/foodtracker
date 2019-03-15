import React from "react";
import { Layout } from "../Layout/Layout";
import { CreateAccountStepper } from "./CreateAccountStepper";

export const SignupPageComponent = (props) => {
    return (
        <Layout>
            <div className="signup">
                <CreateAccountStepper />
            </div>
        </Layout>
    );
}

