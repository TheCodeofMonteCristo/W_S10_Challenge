import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


import {
    setFilter
} from '../state/ordersSlice'
import { useGetHistoryQuery } from '../state/ordersApi' 







export default function OrderList() {


    //orders data 
    const { data: orders} = useGetHistoryQuery()  


    //pizzas size state (gloabal)
    const pizzaSize = useSelector((state) => state.orders.size);


    //gloabal functions
    const dispatch = useDispatch();  

  


 
    return (

        
    <div id="orderList">
            <h2>Pizza Orders</h2>
            <ol>
                {orders?.filter(ps => pizzaSize == 'All' ? true : ps.size === pizzaSize).map((order) => {

                  const { id, customer, size, toppings = []} = order
            return (
                <li key={id}>
                <div>
                        {customer} ordered a size {size.toUpperCase()} with {toppings.length == 0? 'no' : toppings.length} topping{toppings.length == 1? '' : 's'}
                    </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
                    ['All', 'S', 'M', 'L'].map(size => {
                        const className = `button-filter${size == pizzaSize ? ' active' : ''}`
              return <button
                  data-testid={`filterBtn${size}`}
                  className={className}
                  key={size}
                  onClick={() => dispatch(setFilter(size))}
            >{size}</button>
          })
        }
      </div>
    </div>
  )
}
