// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      {/* This main div stacks the header, main content, and footer vertically */}
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        <Header />
        
        {/* This <main> tag is the container for all your pages. */}
        {/* It grows to fill the space and centers its content horizontally. */}
        <main className="flex-grow container mx-auto p-4">
          <Outlet /> {/* This renders the current page (e.g., HomePage or CartPage) */}
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App;