import React, { useEffect, useState } from 'react'
import { serverAddress } from '../../generalInfo';
import './Orders.css'

import io from 'socket.io-client';
var socket;
function Orders(props) {

    const [orders, setOrders] = useState([]);
    var slno = 0;

    useEffect(() => {

      try {
        socket = io(serverAddress);
        //loaded = true;
        
      } catch (error) {
        console.log(error);
        alert(error);
      }


      // Listen for 'updatedOrders' event from the server
        socket.on('updatedOrders', (updatedOrders) => {
            setOrders(updatedOrders);
        });

        //Clean up on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);
    

    const orderTableContents = orders.map((item,index) => {
        slno++;
        const cartList = [];
        item.cart.map((cartItem,index)=>{
            cartList.push(
                <div>{cartItem.productId} - {cartItem.productName} : {cartItem.quantity}</div>
            )
            return(null);
        });
        return(
          <tr>
            <td>{slno}</td>
            <td>{item.orderNo}</td>
            <td>{item.name}</td>
            <td>{item.contact}</td>
            <td>{cartList}</td>
            <td>{item.total}</td>
            <td><button onClick={()=>{props.setWindow(1); props.setOrders(item);}} className='addtobillbutton'>Add to Bill</button></td>
          </tr>
          
        )
    });


  return (
    <div className='container'>
        <table className='ordertable'>
            <tr>
                <th>SlNo</th>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Items</th>
                <th>Total</th>
                <th>Add to Bill</th>
            </tr>
            {orderTableContents}
        </table>
    </div>
  )
}

export default Orders