import { useState } from 'react';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button';
import './OrderHistory.css';
import '../../App.css'
import { useNavigate } from 'react-router-dom';

export default function OrderHistory({ setCart}) {
    const [orders] = useState(initialOrders);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleReorder = (orderItems) => {
        if (setCart) {
            setCart((prevCart) => [...prevCart, ...orderItems]);
        }

        setNotification("Item added to your cart!");
        setTimeout(() => setNotification(""), 3000);
    }

    return (
        <main className="orders-page">
            <div className="orders-container">
                {notification && (
                    <div className="reorder-toast">
                        <Icon icon="solar:check-circle-bold" />
                        <span>{notification}</span>
                    </div>
                )}
                <div className="orders-header">
                    <Button name="Back" />
                    <h1 className="orders-title">Order History</h1>
                    <span className="orders-count">{orders.length} Total Orders</span>
                </div>

                {orders.length === 0 ? (
                    <div className="empty-orders">
                        <Icon icon="solar:box-linear" className="empty-icon" />
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <div className="order-meta">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">{order.date}</span>
                                    </div>
                                    <div className="order-status-wrapper">
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                        <span className="order-total">{order.total}</span>
                                    </div>
                                </div>

                                <div className="order-items-divider" />

                                <div className="order-items-list">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item-row">
                                            <div className="order-item-img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="order-item-info">
                                                <h4 className="item-name">{item.name}</h4>
                                                <span className="item-details">Size: {item.size} • Qty: {item.qty}</span>
                                            </div>
                                            <span className="item-price">{item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-card-footer">
                                    <button type="button" className="reorder-btn" onClick={() => handleReorder(order.items)}>
                                        <Icon icon="solar:restart-bold" />
                                        <span>Reorder Items</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}