import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {
  return (
    <div>
      
     

      <Card
        image="/makeup.jpg"
        category="Face Essentials"
        title="Rose Glow Set"
        price={32}
        rating={0}
        outOfStock={true}
      />
    </div>
  );
}

export default App;
