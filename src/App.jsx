import Header from "./components/Header"
import ProductCard from "./components/ProductCard";

function App() {
    return (
        <div>
            <Header />
            <ProductCard name="Ah Jo" price={12.00} />
            <ProductCard name="Ah Ach" price={18.00} />
            <ProductCard name="Tiki Tiki" price={94.00} />
        </div>
    );
}

export default App;