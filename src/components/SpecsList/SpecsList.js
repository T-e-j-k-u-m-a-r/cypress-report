import React from 'react';
import './SpecsList.css';

const SpecsList = (props) => {
    const {specs, stats} = props;

    const getTestListForSpec = (spec, tests = []) => {
        if (spec.tests && spec.tests.length > 0) tests = [...tests, spec.tests.map(test => ({
            title: test.fullTitle,
            passed: test.passed
        }))]

        const suites = Object.keys(spec).filter(key => !["tests", "pass", "fail", "total", "title", "fullTitle"].includes(key));
        if (suites.length > 0) {
            suites.forEach(suite => {
                const testsForSuite = getTestListForSpec(spec[suite]);
                tests = [...tests, ...testsForSuite];
            })
        }

        return tests.flat();
    }

    return (
        <ul className='SpecsList'>
            {specs.map((spec, index) =>
                    (<li key={`suite-${index}`}
                         className={['SpecsList__Spec', stats[spec].fail > 0 ? 'error' : ''].join(" ")}>
                        <div className={'SpecsList__Spec__Header'}>
                            <div>{spec}</div>
                            <div>Passed: {stats[spec].pass}/{stats[spec].total}</div>
                        </div>
                        <ul className='SpecsList__Spec__TestList'>
                            {getTestListForSpec(stats[spec]).map(
                                test => (
                                    <li className={['SpecsList__Spec__TestList__Test', test.passed ? '' : 'error'].join(" ")}>
                                    <span className={["material-icons", test.passed ? '' : 'error'].join(' ')}>
                                        {test.passed ? 'check' : 'close'}
                                        </span>{test.title}
                                    </li>)
                            )}
                        </ul>
                    </li>)
            )}
        </ul>
    )
}

export default SpecsList;