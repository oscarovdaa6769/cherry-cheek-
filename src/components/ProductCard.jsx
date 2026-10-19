import "../App.css";

function ProductCard(props) {
    return (
        <div className="product-card">
            <h1>{props.name}</h1>
            <p>${props.price}</p>
        </div>
    )
}

export default ProductCard; 