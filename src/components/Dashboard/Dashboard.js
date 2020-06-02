import React from 'react';
import PieChart from '../PieChart'
import './Dashboard.css';

function Dashboard(props) {
    const {data} = props;
    const stats = data;

    const pieData = [
        {name: "Pass", value: stats.pass},
        {name: "Fail", value: stats.fail}
    ]

    const specs = Object.keys(stats).filter(e => !["tests", "pass", "fail"].includes(e));
console.log(specs)
    const suites = [pieData, pieData, pieData]

    return (
        <div>

            <div>Dashboard</div>
            <div className='DashboardWidgetContainer'>
                <div className='overallResults'>
                    <PieChart totalTests={stats.tests} data={pieData}/>
                </div>
                <div className='suites'>
                    specs
                    <ul>
                        {specs.map((spec, index) =>
                            (<li key={`suite-${index}`}>
                                <div>{spec}</div>
                                <div>Pass: {stats[spec].pass}</div>
                                <div>Fail: {stats[spec].fail}</div>
                                <div>Total: {stats[spec].total}</div>
                                {/*<PieChart totalTests={stats.tests} data={suite}/>*/}
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;