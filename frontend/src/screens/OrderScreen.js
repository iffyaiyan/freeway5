

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { createOrder } from '../actions/orderActions';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

// export default function OrderScreen(props) {
//   const cart = useSelector((state) => state.cart);
//   // const orderCreate = useSelector((state) => state.orderCreate);
//   // const { loading, success, error, order } = orderCreate;
//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { loading, success, error, order } = orderCreate;
//   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   cart.itemsPrice = toPrice(
//     cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
//   );
//   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
//   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//   const dispatch = useDispatch();
//   const placeOrderHandler = () => {
//     dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
//   };
//   useEffect(() => {
//     if (success) {
//       props.history.push(`/order/${order._id}`);
//       dispatch({ type: ORDER_CREATE_RESET });
//     }
//   }, [dispatch, order, props.history, success]);
//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
//       <div className="row top">
//         <div className="col-2">
//           <ul>
//             <li>
//               <div className="card card-body">
//                 <h2>Shipping</h2>
//                 <p>
//                   <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
//                   <strong>Address: </strong> {cart.shippingAddress.address},
//                   {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
//                   ,{cart.shippingAddress.country}
//                 </p>
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Payment</h2>
//                 <p>
//                   <strong>Method:</strong> {cart.paymentMethod}
//                 </p>
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Order Items</h2>
//                 <ul>
//                   {cart.cartItems.map((item) => (
//                     <li key={item.product}>
//                       <div className="row">
//                         <div>
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="small"
//                           ></img>
//                         </div>
//                         <div className="min-30">
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </div>

//                         <div>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2>Order Summary</h2>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Items</div>
//                   <div>${cart.itemsPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Shipping</div>
//                   <div>${cart.shippingPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Tax</div>
//                   <div>${cart.taxPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>
//                     <strong> Order Total</strong>
//                   </div>
//                   <div>
//                     <strong>${cart.totalPrice.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   onClick={placeOrderHandler}
//                   className="primary block"
//                   disabled={cart.cartItems.length === 0}
//                 >
//                   Place Order
//                 </button>
//               </li>
//               {loading && <LoadingBox></LoadingBox>}
//               {error && <MessageBox variant="danger">{error}</MessageBox>}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                    {errorPay && 
                      (<MessageBox variant="danger">{errorPay}</MessageBox>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}