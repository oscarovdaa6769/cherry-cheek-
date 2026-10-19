import Header from "./components/Header"
import ProductCard from "./components/ProductCard";
import "./App.css"

function App() {
    return (
        <div className="container">
            <Header />
            <ProductCard name="Ah Jo" price={12.00} />
            <ProductCard name="Ah Ach" price={18.00} />
            <ProductCard name="Tiki Tiki" price={94.00} />
        </div>
    );
}

export default App;