// All components mapping with path for internal routes

import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));
const EmployeeDetails = lazy(() =>
  import("../pages/protected/EmployeeDetails")
);
const LeaveType = lazy(() => import("../pages/protected/LeaveType"));
const LeaveRequest = lazy(() => import("../pages/protected/LeaveRequest"));
const PermissionRequest = lazy(() =>
  import("../pages/protected/PermissionRequest")
);
const Holidays = lazy(() => import("../pages/protected/Holidays"));
const Attendance = lazy(() => import("../pages/protected/Attendance"));
const HolidayReport = lazy(() => import("../pages/protected/HolidayReport"));
const LeaveApproval = lazy(() => import("../pages/protected/LeaveApproval"));
const PermissionApproval = lazy(() =>
  import("../pages/protected/PermissionApproval")
);
const AttendanceReport = lazy(() =>
  import("../pages/protected/AttendanceReport")
);
const TodayFullAttendance = lazy(() =>
  import("../pages/protected/TodayFullAttendance")
);
const Practice = lazy(() => import("../pages/protected/Practice"));
const LeaveProcess = lazy(() => import("../pages/protected/LeaveProcess"));
const ChangePwd = lazy(() => import("../pages/protected/ChangePwd"));
const JpCheckinCheckout = lazy(() =>
  import("../pages/protected/JpCheckinCheckout")
);
const SwipeINSwipeOUT = lazy(() =>
  import("../pages/protected/SwipeINSwipeOUT")
);
const AllOrg = lazy(() => import("../pages/protected/AllOrg"));
const OrganizationSetup = lazy(() =>
  import("../pages/protected/OrganizationSetup")
);

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },

  // Our Changes
  {
    path: "/employeeDetails",
    component: EmployeeDetails,
  },
  {
    path: "/leavetype",
    component: LeaveType,
  },
  {
    path: "/permissionrequest",
    component: PermissionRequest,
  },
  {
    path: "/leaverequest",
    component: LeaveRequest,
  },
  {
    path: "/holidays",
    component: Holidays,
  },
  {
    path: "/attendance",
    component: Attendance,
  },
  {
    path: "/holidayreport",
    component: HolidayReport,
  },
  {
    path: "/leaveapproval",
    component: LeaveApproval,
  },
  {
    path: "/permissionapproval",
    component: PermissionApproval,
  },
  {
    path: "/attendanceReport",
    component: AttendanceReport,
  },
  {
    path: "/todayfullattendance",
    component: TodayFullAttendance,
  },
  {
    path: "/leaveprocess",
    component: LeaveProcess,
  },
  {
    path: "/changepwd",
    component: ChangePwd,
  },
  {
    path: "/practice",
    component: Practice,
  },
  {
    path: "/jpcheckincheckout",
    component: JpCheckinCheckout,
  },
  {
    path: "/swipeinswipeout",
    component: SwipeINSwipeOUT,
  },
  {
    path: "/allorg",
    component: AllOrg,
  },
  {
    path: "/organizationsetup",
    component: OrganizationSetup,
  },
];

export default routes;
