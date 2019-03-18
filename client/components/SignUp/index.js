import React from "react";
import { Layout } from "../Layout/Layout";
import { SignupForm } from "./SignupForm";

export const SignupPageComponent = (props) => {
    return (
        <Layout>
            <div className="signup">
                <SignupForm />
            </div>
        </Layout>
    );
}

