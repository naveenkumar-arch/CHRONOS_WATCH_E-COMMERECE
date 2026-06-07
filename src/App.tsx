import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Craftsmanship from "./pages/Craftsmanship";
import Boutiques from "./pages/Boutiques";
import Careers from "./pages/Careers";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/craftsmanship" element={<Craftsmanship />} />
                <Route path="/boutiques" element={<Boutiques />} />
                <Route path="/careers" element={<Careers />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
