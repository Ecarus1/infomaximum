import "./UniversalBlank.scss";
import logo from "../../../assets/logo.svg";

const UniversalBlank = ({Component, dataType}) => {
    return (
        <div className="universal-blank">
            <div className="universal-blank__container">
                <img className="universal-blank__logo" src={logo} alt="logo"/>

                <div className="universal-blank__box">
                        {/* <Route path="/registr" element={<RegistrLayout/>} />
                        <Route path="/login" element={<LoginLayout/>} /> */}
                        <Component/>
                </div>
            </div>
        </div>
    );
}
 
export default UniversalBlank;