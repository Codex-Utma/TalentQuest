import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
    return (
        <div>
            <p>employee</p>
        <Outlet />
        </div>
    );
}
