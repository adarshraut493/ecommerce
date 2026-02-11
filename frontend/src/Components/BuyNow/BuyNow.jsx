import React from 'react'
function BuyNow() {
  const amount = 500;
  const currency = "INR";
  const receipt = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      "key": process.env.REACT_APP_RAZORPAY_KEY, // Replace with new key from dashboard.razorpay.com
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "Shopify",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        const body = {
          ...response,
        };
        const validateRes = await fetch(`${process.env.REACT_APP_API_URL}/order/validate`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      "prefill": {
        "name": "Adarsh Raut",
        "email": "adarshraut493@gmail.com",
        "contact": "7666914543"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();


  };
  return (
    <div>
      <button onClick={paymentHandler} className='w-full md:w-auto px-8 md:px-12 py-3 md:py-4 bg-orange text-white rounded hover:bg-orange-600 transition-all font-bold text-base md:text-lg shadow-md'>
        BUY NOW
      </button>
    </div>
  )
}

export default BuyNow