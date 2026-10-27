
import Header from "./components/layout/Header"
import Hero from "./components/layout/Hero"
import Footer from "./components/layout/Footer"
import Order from "./pages/Order";
import Products from "./pages/Products";
  

function App() {
  return (
    <div className="container">
      <Header />
      <Products />
      <Footer />
    </div>
  );

}

export default App;
