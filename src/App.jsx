import Header from "./components/layout/Header"
import Hero from "./components/layout/Hero"
import Footer from "./components/layout/Footer"
import Dashboard from"./Dashboard";
import AddProduct from "./AddProduct";
import Checkout from "./Checkout";



function App() {
  return (
    <div className="container">
      <Header/>
      <Hero/>
      <Dashboard/>
      <AddProduct/>
      <Checkout/>
      <Footer/>
    </div>
  );
}

export default App;


