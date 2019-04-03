import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course';

const App = () => {
    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            parts: [
                {
                    name: 'Reactin perusteet',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Tiedonvälitys propseilla',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'Komponenttien tila',
                    exercises: 14,
                    id: 3
                }
            ]
        },
        {
            name: 'Full Stack -sovelluskehitys',
            parts: [
                {
                    name: 'Webscale pöhinä',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Serverless pöhinä',
                    exercises: 15,
                    id: 2
                },
                {
                    name: 'AWS',
                    exercises: 5,
                    id: 3
                },
                {
                    name: 'mongodb',
                    exercises: 5,
                    id: 4
                },
                {
                    name: 'redis',
                    exercises: 8,
                    id: 5
                }
            ]
        }
    ];

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {courses.map(c => <Course course={c} />)}
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'))
