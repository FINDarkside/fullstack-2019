import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => {
    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button name="Hyvä" onClick={() => props.increaseGood()} />
            <Button name="Neutraali" onClick={() => props.increaseNeutral()} />
            <Button name="Huono" onClick={() => props.increaseBad()} />
        </div>
    )
}

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>

const Statistics = (props) => {
    const total = props.bad + props.good + props.neutral;
    if (total > 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={props.good} />
                        <Statistic text="neutral" value={props.neutral} />
                        <Statistic text="bad" value={props.bad} />
                        <Statistic text="yhteensä" value={total} />
                        <Statistic text="keskiarvo" value={((props.good - props.bad) / total).toPrecision(3)} />
                        <Statistic text="positiivisia" value={((props.good) / total * 100).toPrecision(3) + ' %'} />
                    </tbody>
                </table>
            </div>
        )
    }
    return <div><h1>Statistiikka</h1>Ei yhtään palautetta annettu</div>

}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Feedback
                increaseGood={() => setGood(good + 1)}
                increaseNeutral={() => setNeutral(neutral + 1)}
                increaseBad={() => setBad(bad + 1)} />
            <Statistics {...{ good, bad, neutral }} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
