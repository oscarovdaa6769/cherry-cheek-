import "./Card.css";

function Card({
  image,
  category,
  title,
  price,
  rating = 0,
  outOfStock = false,
}) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />

        {outOfStock && <span className="card-badge">Out Stock</span>}
      </div>

      <div className="card-body">
        <p className="card-category">{category}</p>
        <h3 className="card-title">{title}</h3>

        <div className="card-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{n <= rating ? "★" : "☆"}</span>
          ))}
        </div>

        <div className="card-footer">
          <span className="card-price">${Number(price || 0).toFixed(2)}</span>
          <button className="card-add" type="button" aria-label="Add to cart">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;