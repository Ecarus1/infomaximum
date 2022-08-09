import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import UniversalBlank from "../pages/universalBlank/UniversalBlank";
import HomePage from "../pages/homePage/HomePage";
import RegistrLayout from "../registrLayout/RegistrLayout"
import LoginLayout from "../loginLayout/LoginLayout";
import ProcessList from "../processList/ProcessList";
import Profile from "../profile/Profile";
import PrivateRoute from "../../hoc/PrivateRoute";
import PublicRoute from "../../hoc/PublicRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <HomePage Component={ProcessList}/>
                    </PrivateRoute>
                }/>

                <Route path="/profile" element={
                    <PrivateRoute>
                        <HomePage Component={Profile}/>
                    </PrivateRoute>
                }/>

                <Route path="/registr" element={
                    <PublicRoute>
                        <UniversalBlank Component={RegistrLayout} dataType='reg'/>
                    </PublicRoute>
                }/>
                <Route path="/login" element={
                    <PublicRoute>
                        <UniversalBlank Component={LoginLayout} dataType='log'/>
                    </PublicRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
