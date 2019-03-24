import LoginPage from "./components/Login/LoginPage.jsx";
import LogginDayComponent from "./components/Logging/LogginDayComponent";
import { SignupPageComponent } from "./components/SignUp/index.js";
import { UserInfoPageComponent } from "./components/UserInfo/UserInfoPage";

const RouteTable = {
    "Login Page": LoginPage,
    "Log": LogginDayComponent,
    "Signup Page": SignupPageComponent,
    "AddEditGoalsPage": UserInfoPageComponent
};

export default RouteTable;