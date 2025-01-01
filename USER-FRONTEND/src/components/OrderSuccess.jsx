import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the order details from the state passed from Payment
    const { orderId, cartItems, totalAmount, shippingDetails } = location.state;

    // Handle Continue Shopping button click
    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
                <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Order Placed Successfully!</h2>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Order Details</h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium">Order ID:</h4>
                            <p className="text-gray-700">{orderId}</p>
                        </div>

                        <div>
                            <h4 className="font-medium">Shipping Address:</h4>
                            <p className="text-gray-700">
                                {shippingDetails.name}, {shippingDetails.address}, {shippingDetails.city}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium">Cart Items:</h4>
                            <ul className="space-y-2">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="flex justify-between border-b py-2">
                                        <span>{item.productName} (x{item.quantity})</span>
                                        <span>${item.total}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between mt-4 font-semibold">
                            <p>Total Amount:</p>
                            <p>${totalAmount}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleContinueShopping}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-[#905FF7] border-2 border-[#C250D2] text-lg rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#C250D2] hover:text-white ease-in-out"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
