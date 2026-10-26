import Header from "./components/layout/Header"
import Hero from "./components/layout/Hero"
import Footer from "./components/layout/Footer"
import Customer from "./Customer"
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Footer />
        <Customer />
        <Home />
        <About />
    </div>
  );
}

export default App;
