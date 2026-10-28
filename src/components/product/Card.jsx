import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Card.css';

function Card({
  id,
  image,
  category,
  title,
  price,
  oldPrice,
  rating = 5,
  outOfStock = false,
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart
}) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      return savedWishlist.includes(id) || isWishlisted;
    } catch {
      return isWishlisted;
    }
  });

  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setLiked(savedWishlist.includes(id) || isWishlisted);
    } catch {
      setLiked(isWishlisted);
    }
  }, [id, isWishlisted]);

  const handleCardClick = () => {
    if (id) {
      navigate(`/product-detail?id=${id}`);
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Prevents navigating when toggling wishlist
    const nextLiked = !liked;
    setLiked(nextLiked);

    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      let updatedWishlist;
      if (nextLiked) {
        updatedWishlist = savedWishlist.includes(id) ? savedWishlist : [...savedWishlist, id];
      } else {
        updatedWishlist = savedWishlist.filter(itemId => itemId !== id);
      }
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (err) {
      console.error("Error updating wishlist in localStorage", err);
    }

    if (onWishlistToggle) onWishlistToggle(id, nextLiked);
  };

  const handleCartClick = (e) => {
    e.stopPropagation(); // Prevents navigating when adding to cart
    if (!outOfStock) {
      try {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = savedCart.findIndex(item => item.id === id);

        if (existingIndex > -1) {
          savedCart[existingIndex].quantity += 1;
        } else {
          savedCart.push({
            id,
            title,
            category,
            price,
            image,
            quantity: 1
          });
        }
        localStorage.setItem('cart', JSON.stringify(savedCart));

        // Dispatch custom event to show the toast notification
        window.dispatchEvent(
          new CustomEvent('cart-added', { detail: `Added "${title}" to your cart!` })
        );
        // Dispatch storage event so header cart counters update
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error("Error adding to cart", err);
      }
      if (onAddToCart) onAddToCart(id);
    }
  };

  return (
    <div 
      className={`card ${outOfStock ? 'card-disabled' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image-box">
        <img src={image} alt={title} loading="lazy" />

        {/* Wishlist Heart Button */}
        <button 
          className={`card-heart ${liked ? 'is-liked' : ''}`} 
          onClick={handleHeartClick}
          aria-label="Toggle Wishlist"
          type="button"
        >
          <Icon icon={liked ? "solar:heart-bold" : "solar:heart-linear"} />
        </button>

        {/* Out of Stock Badge */}
        {outOfStock && <span className="card-badge">Out of Stock</span>}
      </div>

      <div className="card-body">
        <span className="card-category">{category}</span>
        <h3 className="card-title" title={title}>{title}</h3>

        {/* Rating Stars */}
        <div className="card-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon 
              key={star} 
              icon="solar:star-bold" 
              className={star <= rating ? "star-active" : "star-inactive"} 
            />
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="card-footer">
          <div className="card-price-group">
            <span className="card-price">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</span>
            {oldPrice && <span className="card-old-price">{typeof oldPrice === 'number' ? `$${oldPrice.toFixed(2)}` : oldPrice}</span>}
          </div>

          <button 
            className="card-add-btn" 
            type="button" 
            onClick={handleCartClick}
            disabled={outOfStock}
            aria-label="Add to cart"
          >
            <Icon icon="solar:alt-arrow-right-linear" className="add-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;