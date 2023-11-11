import React, { useEffect, useState } from 'react'
import {serverAddress} from '../../generalInfo.jsx'
import './NewBill.css'
var total = 0;
var pageLoaded = false;
var isOrdered = false;


class BillItem {
  constructor(productId, productName, mrp, quantity,price) {
    this.productId = productId;
    this.productName = productName;
    this.mrp = mrp;
    this.quantity = quantity;
    this.price = price;
  }
}

function addItem(productId, productName, mrp, quantity, setCart){
  
  var price = mrp*quantity;
  const cartItem = new BillItem(productId,productName,mrp,quantity,price);
  total = total+price;
  setCart((prevCart) => [...prevCart,cartItem]);
}

//function to import itemlist from api to the program
async function importItems(setListItems){
    try {
      const response = await fetch(serverAddress+'/getItems', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (response.ok) {
        const data = await response.json();
        setListItems((prev) => [...prev,...data.items]);

      } else {
          // Handle HTTP error responses here
          alert('HTTP Error: ' + response.status);
      }
  } catch (error) {
      // Handle network or other errors here
      console.error('Error:', error);
  }
  //setListItems((prev) => [...prev,responce.data.items]);
}

async function saveBill(cart,setCart,_id,total){
  try {
    const response = await fetch(serverAddress+'/savebill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ // Stringify the JSON object
          order_id : _id,
          isOrdered : isOrdered,
          'cart': cart,
          total: total,
        }),
    });

    if (response.ok) {
      const data = await response.json();
      if(data.sucess){
        //delete entry from orders

        alert(`Bill Saved \nBill No: ${data.billno}`);
        cart = [];
        total = 0;
        setCart([]);
      }

    } else {
        // Handle HTTP error responses here
        alert('HTTP Error: ' + response.status);
    }
} catch (error) {
    // Handle network or other errors here
    console.error('Error:', error);
}
//setListItems((prev) => [...prev,responce.data.items]);
}



function NewBill(props) {
  var slno = 0;
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [mrp, setMrp] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [_id, setId] = useState();
  const [isListVisible, setIsListVisible] = useState(false);
  const [listItems, setListItems] = useState(['Select']);
  const orderObject = props.orders;
  




  
  useEffect(() => {
    if(!pageLoaded){
      importItems(setListItems);
      pageLoaded = true;
    }
    console.log(orderObject);
    if(orderObject!==undefined){
      
      setCart([]);
      total = 0;
      setProductId('');
      setProductName('');
      setMrp(0);
      setQuantity(0);

      setCart(orderObject.cart);
      setId(orderObject._id);
      total = orderObject.total;
      isOrdered = true;
    }
  }, [orderObject]);
  

  const cartList = cart.map((item,index) => {
    slno++;
    return(
      <tr>
        <td>{slno}</td>
        <td>{item.productId}</td>
        <td>{item.productName}</td>
        <td>{item.mrp}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
      </tr>
    )
  });

  const itemList = listItems.map((item, index) => {
    const searchableName = item.productId + " - " + item.productName;
    if (searchableName.toLowerCase().includes(productId.toLowerCase())) {
      return (
        <div
          className="listelement"
          onClick={() => {
            setProductId(item.productId);
            setProductName(item.productName);
            setMrp(item.mrp);
            handleBlur();
          }}
          key={index}
        >
          {item.productId} - {item.productName}
        </div>
      );
    } else return null;
  });
  

  const handleBlur = () => {
    setIsListVisible(false);
  }

  return (
    <div className='container'>
      <h1>New Bill</h1>
        <div className='incontainerdiv'>
          
          <div className='addnewitemdiv'>
            <div className='formelement'>
              <p>Enter Product Id</p>
              <input type="text" className='iteminput' value={productId} onChange={(e) => {
                  setProductId(e.target.value);
                  if(e.target.value !== ''){
                    setIsListVisible(true);
                  }
                  else {
                    setIsListVisible(false);
                  }
                }} 
                />
              {
                isListVisible ? (
                  <div className='productlistdiv'>
                    {itemList}
                  </div>
                ) : (<br></br>)
              }
            </div>
            <div className='formcomponent'>
              <p>Product Name : &nbsp;&nbsp;&nbsp;</p>
              <p><b>{productName}</b></p>
            </div>
            <div className='formcomponent'>
              <p>MRP : &nbsp;&nbsp;&nbsp;</p>
              <p><b>{mrp}</b></p>
            </div>
            <div className='formelement'>
              <p>Quantity</p>
              <div className='formcomponent'>
                <input type="number" className='iteminput' min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <button className='incdecbtn' onClick={()=>{ if(quantity>0) setQuantity(quantity-1)}}>-</button>
                <button className='incdecbtn' onClick={()=>setQuantity(quantity+1)}>+</button>
              </div>
            </div>
            <div className='formcomponent'>
              <p>Price : &nbsp;&nbsp;&nbsp;</p>
              <p><b>{mrp*quantity}</b></p>
            </div>
            <div>
               <button className='addtobillbtn' onClick={()=>{
                if(productId !== ''){
                  addItem(productId,productName,mrp,quantity,setCart);
                  setProductId('');
                  setProductName('')
                  setQuantity(1);
                  setMrp(0);
                } else {
                  alert("No Products Selected");
                }
                }}>ADD TO BILL</button>
            </div>
          </div>


          <div className='cartlistdiv'>
            <table className='carttable'>
              <tr>
                <th>Sl No</th>
                <th>ID</th>
                <th>Item</th>
                <th>MRP</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {cartList}
              <tr>
                <td colSpan={4}></td>
                <th>Total :</th>
                <th>{total}</th>
              </tr>
              
            </table>
          </div>
        </div>
        <div className='savebtndiv'>
          <button className='savebillbtn' onClick={()=>{
            saveBill(cart,setCart,_id,total);
          }}>Save Bill</button>
        </div>
    </div>
  )
}

export default NewBill