import Header from "./components/layout/Header"
import Hero from "./components/layout/Hero"
import Footer from "./components/layout/Footer"
import Customer from "./Customer"

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Footer />
        <Customer />
    </div>
  );
}

export default App;
