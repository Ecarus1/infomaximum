import { useDispatch, useSelector } from "react-redux";

import { fetchProcess, clearState, processesSelector } from "./ProcessSlice";

import ProcessItem from "../processItem/ProcessItem";

import "./ProcessList.scss";
import { useEffect } from "react";

const ProcessList = () => {
    const dispatch = useDispatch();
    const {processes} = useSelector(processesSelector)

    useEffect(() => {
        dispatch(fetchProcess());
    }, []);
    return (
        <ul className="list-process">
            {
                processes.map(({id, ...props}) => {
                    return(
                        <ProcessItem key={id} {...props}/>
                    )
                })
            }
        </ul>
    );
}
 
export default ProcessList;