import React from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {increment , decrement} from './counterSlice'
export const Counter = () => {
    const counter = useSelector(state => state?.counter)
    const dispatch = useDispatch()
    return (
        <div className = 'flex flex-row'>
            <button className = 'p-1' onClick = {() =>dispatch(increment())}>+</button>
            <h1 className = 'p-1 px-5'>
                {counter?.count}
            </h1>
            <button className = 'p-1' onClick = {() => dispatch(decrement())} disabled = {counter?.count <=0}>-</button>
        </div>
    )
}
