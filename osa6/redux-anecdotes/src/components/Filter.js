import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filter, setFilter }) => {
    const handleChange = (event) => {
        setFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} value={filter.value} />
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter
})
const mapDispatchToProps = { setFilter }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter
