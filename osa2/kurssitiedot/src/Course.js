import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part part={part} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    return (
        <p>
            yhteensä {props.parts.reduce((sum, p) => sum + p.exercises, 0)} tehtävää
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;
