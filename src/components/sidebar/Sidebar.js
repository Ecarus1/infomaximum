import { ProSidebar, SidebarHeader, MenuItem, SidebarContent} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { sidebarSelector } from "./SidebarSlice";
import { hiddenSidebar } from "./SidebarSlice";

import { userLoginSelector } from "../loginLayout/LoginSlice";

import {ReactComponent as Logo} from "../../assets/icon-menu.svg";
import {ReactComponent as Person} from "../../assets/icon-person.svg";
import {ReactComponent as Diagramma} from "../../assets/icon-diagramma.svg";
import 'react-pro-sidebar/dist/css/styles.css';
import './custom.scss';
import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const {sidebar} = useSelector(sidebarSelector);
    const {name} = useSelector(userLoginSelector);

    // const [sidebar, setSidebar] = useState(true);

    // const onToggle = () => {
    //     setSidebar(!sidebar);
    // }

    let activeStyle = {
        color: "wheat",
    }

    return (
        <ProSidebar collapsed={sidebar}>
            <SidebarHeader>
                <div className="header__box" onClick={() => dispatch(hiddenSidebar())}>
                    <Logo fill="#FFFFFF" width="16" height="16"/>
                    <h1 className="header__title" style={{"color": "#FFFFFF"}}>processet</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <MenuItem icon={<Person />}> <NavLink to="/profile" className="sidebar-item" style={({isActive}) => isActive ? activeStyle : undefined}>{name}</NavLink> </MenuItem>

                <MenuItem icon={<Diagramma />}> <NavLink to="/" className="sidebar-item" style={({isActive}) => isActive ? activeStyle : undefined}>Список процессов</NavLink> </MenuItem>
            </SidebarContent>
        </ProSidebar>
    );
}

export default Sidebar;