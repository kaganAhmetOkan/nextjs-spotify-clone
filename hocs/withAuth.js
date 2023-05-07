/* eslint-disable react/display-name */
import React from "react";
import { useSession } from "next-auth/react";
import Redirect from "@/components/Redirect/Redirect";


const withAuth = (Component) => (props) => {
    const { data: session } = useSession();

    if (!session) return <Redirect to="/login" replace />;
    return <Component {...props} />;
};

export default withAuth;