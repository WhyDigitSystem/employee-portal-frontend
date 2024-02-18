import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import routes from '../routes/sidebar';
import SidebarSubmenu from './SidebarSubmenu';
import Axios from "axios";
import React, { useState, useEffect } from "react";


function LeftSidebar(){
    const [orgId, setOrgId] = React.useState(localStorage.getItem("orgId"));
    const [branchId, setBranchId] = React.useState(localStorage.getItem("branchId"));
    const [branchName, setBranchName] = React.useState("");
    const [orgName, setOrgName] = React.useState("");

    const location = useLocation();

    const dispatch = useDispatch()


    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    useEffect(()=> {
        getOrgById()
        //getBranchByOrgId()
      },[]);

    const getOrgById = async () => {
        try {
          const response = await Axios.get(
            `${process.env.REACT_APP_API_URL}/api/admin/orginization/${orgId}`
          );
    
          if (response.status === 200) {
            //setOrgData(response.data.paramObjectsMap.organizationVO);
            setOrgName(response.data.paramObjectsMap.organizationVO.name); 
            // setBranchName(response.data.paramObjectsMap.organizationVO.branchVO.branchName); 
            if (response.data && response.data.paramObjectsMap && response.data.paramObjectsMap.organizationVO && response.data.paramObjectsMap.organizationVO.branchVO) {
                // Extract the branch name from the response
                const branchName = response.data.paramObjectsMap.organizationVO.branchVO[0].branchName;
                // Store the branch name in state
                setBranchName(branchName);
            }
            
            //setBranchOrgCode(response.data.paramObjectsMap.organizationVO.orgCode); 
            console.log("OrganizationName:",response.data.paramObjectsMap.organizationVO[0].name) 
            console.log("OrganizationDetail:",response.data.paramObjectsMap.organizationVO)      
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    return(
        <div className="drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu  pt-2 w-80 bg-base-100 text-base-content">
            <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>

                <li className="mb-2 font-semibold text-xl">
                    
                    <Link to={'/app/welcome'}>
                        {/* <img className="mask mask-squircle w-10" src="/logo196.png" alt="DashWind Logo"/> */}
                    <div>{orgName} &nbsp;<span style={{fontSize:"12px"}}>{branchName}</span></div></Link> </li>
                {
                    routes.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar