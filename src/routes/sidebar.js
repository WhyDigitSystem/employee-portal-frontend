/** Icons are imported separatly to reduce build time */
// import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
// import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
// import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
// import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
// import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
// import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
// import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
// import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
// import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
// import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
// import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
// import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
// import UserIcon from "@heroicons/react/24/outline/UserIcon";
// import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
// import WalletIcon from "@heroicons/react/24/outline/WalletIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const userRole = localStorage.getItem("userDetails");

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "/app/calendar", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Calendar", // name that appear in Sidebar
  },
  {
    path: "/app/allorg", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Organization", // name that appear in Sidebar
  },
  {
    path: "/app/organizationsetup", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Organization Setup", // name that appear in Sidebar
  },
  //MASTERS FOLDER
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: "Masters", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/employeeDetails", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Employee Details", // name that appear in Sidebar
      },
      {
        path: "/app/leavetype", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Leave Type", // name that appear in Sidebar
      },
      {
        path: "/app/holidays", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Holidays", // name that appear in Sidebar
      },
      {
        path: "/app/leaveprocess", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Leave Process", // name that appear in Sidebar
      },
      {
        path: "/app/jpcheckincheckout", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "JP CheckIn CheckOut", // name that appear in Sidebar
      },
      {
        path: "/app/organizationsetup", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Orginazation Setup", // name that appear in Sidebar
      },
    ],
  },
  // transaction Folder
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: "Me", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/permissionrequest", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Permission Request", // name that appear in Sidebar
      },
      {
        path: "/app/leaverequest", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Leave Request", // name that appear in Sidebar
      },
      //
      {
        path: "/app/holidayreport", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Holiday Report", // name that appear in Sidebar
      },
    ],
  },
  // transaction folder end
  {
    path: "", // url
    icon: <CalendarDaysIcon className={`${iconClasses} inline`} />, // icon component
    name: "Team", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/leaveapproval", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Leave Approval", // name that appear in Sidebar
      },
      {
        path: "/app/permissionapproval", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Permission Approval", // name that appear in Sidebar
      },
      {
        path: "/app/attendancereport", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Attendance Report", // name that appear in Sidebar
      },
      {
        path: "/app/todayfullattendance", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Today Attendance", // name that appear in Sidebar
      },
      {
        path: "/app/searchattendance", // url
        icon: <CalendarDaysIcon className={iconClasses} />, // icon component
        name: "Search Attendance", // name that appear in Sidebar
      },

      // {
      //      path: "/app/attendance", // url
      //      icon: <CalendarDaysIcon className={iconClasses} />, // icon component
      //      name: "Attendance", // name that appear in Sidebar
      // },
    ],
  },
];


//USER ROLE CONTROL
if (userRole === "USER") {
  const sectionsToRemove = ["Organization", "Organization Setup", "Masters", "Team"];

  sectionsToRemove.forEach(sectionName => {
    const sectionIndex = routes.findIndex(route => route.name === sectionName);
    if (sectionIndex !== -1) {
      routes.splice(sectionIndex, 1);
    }
  });
}

//HR ROLE CONTROL
if (userRole === "HR") {
  const sectionsToRemove = ["Organization", "Organization Setup", "Masters"];

  sectionsToRemove.forEach(sectionName => {
    const sectionIndex = routes.findIndex(route => route.name === sectionName);
    if (sectionIndex !== -1) {
      routes.splice(sectionIndex, 1);
    }
  });
}

//ADMIN ROLE CONTROL
if (userRole === "ADMIN") {
  const sectionsToRemove = ["Organization", "Me"];

  sectionsToRemove.forEach(sectionName => {
    const sectionIndex = routes.findIndex(route => route.name === sectionName);
    if (sectionIndex !== -1) {
      routes.splice(sectionIndex, 1);
    }
  });
}

//OWNER ROLE CONTROL
if (userRole === "OWNER") {
  const sectionsToRemove = ["Organization Setup", "Me", "Team", "Masters"];

  sectionsToRemove.forEach(sectionName => {
    const sectionIndex = routes.findIndex(route => route.name === sectionName);
    if (sectionIndex !== -1) {
      routes.splice(sectionIndex, 1);
    }
  });
}


export default routes;
