import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { HelmetProvider } from 'react-helmet-async';
import "@/App.css";
import "./i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
import TawkToChat from "./components/TawkToChat";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import FaqPage from "./pages/FaqPage";
import LeveringPage from "./pages/LeveringPage";
import ReturPage from "./pages/ReturPage";
import KontaktPage from "./pages/KontaktPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <CurrencyProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="App">
                    <Navbar />
                    <Breadcrumbs />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/kategori/:category" element={<CategoryPage />} />
                      <Route path="/produkt/:id" element={<ProductPage />} />
                      <Route path="/kurv" element={<CartPage />} />
                      <Route path="/onskeliste" element={<WishlistPage />} />
                      <Route path="/spor-din-ordre" element={<TrackOrderPage />} />
                      <Route path="/faq" element={<FaqPage />} />
                      <Route path="/levering" element={<LeveringPage />} />
                      <Route path="/retur" element={<ReturPage />} />
                      <Route path="/kontakt" element={<KontaktPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                    <BackToTop />
                    <TawkToChat />
                    <Toaster />
                    <Sonner />
                  </div>
                </BrowserRouter>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </CurrencyProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
