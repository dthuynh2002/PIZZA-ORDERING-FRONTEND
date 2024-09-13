import { Fragment } from "react";
import { Outlet } from "react-router-dom";


const DefaultLayoutPage = () => {
    return (
        <Fragment>
            <main>
                <Outlet/>
            </main>
        </Fragment>
    );
};
export default DefaultLayoutPage;