import { useState, useEffect } from "react";

export default function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/data/categories.json");
        if (!response.ok) throw new Error("Failed to load categories");
        const data = await response.json();

        console.log(data);        // shows in the Console tab
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  return (
    <div>
    
    </div>
  );
}