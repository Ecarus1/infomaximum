import { Link } from "react-router-dom";
import moment from "moment";
import plural from "plural-ru";

import 'moment/locale/ru';

import {ReactComponent as Arrow} from "../../assets/kredit/icon-arrow.svg";
import {ReactComponent as Repeats} from "../../assets/kredit/icon-revers.svg";
import {ReactComponent as Time} from "../../assets/kredit/icon-time.svg";
import {ReactComponent as TimeSpeed} from "../../assets/kredit/icon-time-speed.svg";
import {ReactComponent as Humans} from "../../assets/kredit/icon-humans.svg";
import {ReactComponent as Graf} from "../../assets/kredit/icon-graf.svg";

import "./ProcessItem.scss"

function ProcessItem({name, numberOfExecutions, averageLeadTime, averageActiveTime, employeesInvolvedProcess, numberOfScenarios, start, end, loading}) {

    const HourseAndMinutes = (ms) => {
        let d = moment.duration(ms, 'milliseconds');
        let hours = Math.floor(d.asHours());
        let mins = Math.floor(d.asMinutes()) - hours * 60;
        return(`${hours}ч` + ` ${mins} мин`)
    }

    const AverageActiveTime = (lms, ams) => {
        let percent = (ams / lms) * 100;
        let hoursMins = HourseAndMinutes(ams);
        return(`${hoursMins} ` + `(${percent.toFixed(1)}%)`)
    }

    return (
        <li className="list-process__item">
            <div className="list-process__box">
                <header className="process-header">
                    <h3 className="process-header__title">{name}</h3>
                    <div className="process-header__box">
                        {/* <h5 className="process-header__nav">На карту процесса</h5> */}
                        <Link className="process-header__nav" to="/dawdawdawdawdawfefs" style={{pointerEvents: 'none'}}>На карту процесса</Link>
                        <Arrow />
                    </div>
                </header>
                <div className="process-metrics">
                    <div className="repeats size">
                            <div className="repeats__box repeats__ident">
                                <Repeats/>

                                <h1 className="repeats__number">{numberOfExecutions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
                            </div>

                            <h5 className="repeats__title">выполнено раз</h5>
                    </div>

                    <div className="average-time size">
                        <div className="average-time__time">
                            <div className="repeats__box">
                                <Time/>

                                <h3 className="average-time__number">{HourseAndMinutes(averageLeadTime)}</h3>
                            </div>

                            <h5 className="repeats__title">среднее время выполнения</h5>
                        </div>

                        <div className="average-time__time-speed">
                            <div className="repeats__box">
                                <TimeSpeed/>

                                {/* <h3 className="average-time__number">1ч 7 мин (10,5%)</h3> */}
                                <h3 className="average-time__number">{AverageActiveTime(averageLeadTime, averageActiveTime)}</h3>
                            </div>

                            <h5 className="repeats__title">среднее активное время</h5>
                        </div>
                    </div>

                    <div className="average-time size">
                        <div className="average-time__time">
                            <div className="repeats__box">
                                <Humans/>

                                <h3 className="average-time__number">{employeesInvolvedProcess} {plural(employeesInvolvedProcess, "сотрудник", "сотрудника", "сотрудников")}</h3>
                            </div>

                            <h5 className="repeats__title">участвуют в процессе</h5>
                        </div>

                        <div className="average-time__time-speed">
                            <div className="repeats__box">
                                <Graf/>

                                <h3 className="average-time__number">{numberOfScenarios} {plural(numberOfScenarios, "сценарий", "сценария", "сценариев")}</h3>
                            </div>

                            <h5 className="repeats__title">в процессе</h5>
                        </div>
                    </div>

                    <div className="stats size">
                        <div className="stats__titles">
                            <h5 className="stats__title">Начало</h5>
                            <h5 className="stats__title">Окончание</h5>
                            <h5 className="stats__title">Загрузка</h5>
                        </div>

                        <div className="stats__titles">
                            <h5 className="stats__title stats__date">{moment.unix(start).locale('ru').format("DD MMMM YYYY")}</h5>
                            <h5 className="stats__title stats__date">{moment.unix(end).locale('ru').format("DD MMMM YYYY")}</h5>
                            <h5 className="stats__title stats__date">{moment.unix(loading).locale('ru').format("DD MMMM YYYY")}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ProcessItem;