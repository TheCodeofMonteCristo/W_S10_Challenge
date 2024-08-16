import React from 'react'
import { useReducer } from "react"

import { useCreateOrderMutation } from '../state/ordersApi'





const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = {
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_INPUT: {
            const { name, value } = action.payload


            return { ...state, [name]: value }
        }
        case RESET_FORM:
            return { ...initialFormState }
        default:
            return state
    }
}





export default function PizzaForm() {

    const [state, dispatch] = useReducer(reducer, initialFormState)

    const [createOrder, { error: orderError, isLoading: creatingOrder }] = useCreateOrderMutation()

    const onChange = ({ target: { name, value, checked, type } }) => {

        value = (type === "checkbox") ? checked :
            value

        dispatch({ type: CHANGE_INPUT, payload: { name, value } })
    }

    const resetForm = () => {
        dispatch({ type: RESET_FORM })
    }

    const onNewOrder = evt => {
        evt.preventDefault()
        const { fullName, size } = state
        const toppings = ['1','2','3','4','5'].filter(topping => state[topping], []) 
        createOrder({ fullName, size, toppings })
            .unwrap()
            .then(data => {
                console.log(data);
                resetForm()
            })
            .catch(err => {
                console.log(err.message);
            })
    }


    return (
        <form onSubmit={onNewOrder}>
            <h2>Pizza Form</h2>
            {creatingOrder && <div className='pending'>Order in progress</div>}
            {orderError && <div className='failure'>{orderError.data.message}</div>}

            <div className="input-group">
                <div>
                    <label htmlFor="fullName">Full Name</label><br />
                    <input
                        data-testid="fullNameInput"
                        id="fullName"
                        name="fullName"
                        placeholder="Type full name"
                        type="text"
                        onChange={onChange}
                        value={state.fullName}
                    />
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label htmlFor="size">Size</label><br />
                    <select data-testid="sizeSelect" id="size" name="size"
                        onChange={onChange}
                        value={state.size}                  >
                        <option value="">----Choose size----</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label>
                    <input
                        data-testid="checkPepperoni"
                        name="1"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['1'] == true} />
                    Pepperoni<br />
                </label>
                <label>
                    <input
                        data-testid="checkGreenpeppers"
                        name="2" type="checkbox"
                        onChange={onChange}
                        checked={state['2'] == true} />
                    Green Peppers<br />
                </label>
                <label>
                    <input
                        data-testid="checkPineapple"
                        name="3" type="checkbox"
                        onChange={onChange}
                        checked={state['3'] == true} />
                    Pineapple<br />
                </label>
                <label>
                    <input
                        data-testid="checkMushrooms"
                        name="4" type="checkbox"
                        onChange={onChange}
                        checked={state['4'] == true} />
                    Mushrooms<br />
                </label>
                <label>
                    <input
                        data-testid="checkHam"
                        name="5" type="checkbox"
                        onChange={onChange}
                        checked={state['5'] == true} />
                    Ham<br />
                </label>
            </div>
            <input data-testid="submit" type="submit" />
        </form>
    )
}
