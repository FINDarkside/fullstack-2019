import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
    const topAnecdote = votes.indexOf(Math.max(...votes));

    const getRandomAnecdoteIndex = () => {
        return Math.floor(Math.random() * props.anecdotes.length);
    }

    const vote = (id) => {
        const tmp = [...votes];
        tmp[id]++;
        setVotes(tmp);
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{props.anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <button onClick={() => vote(selected)}>Vote</button>
            <button onClick={() => setSelected(getRandomAnecdoteIndex())}>Next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <div>{props.anecdotes[topAnecdote]}</div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
