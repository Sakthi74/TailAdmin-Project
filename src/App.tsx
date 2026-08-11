import { ThemeProvider } from "./components/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecom from "./pages/Ecom";
import Crm from "./pages/Crm";
import Sidebar from "./components/reusable/Sidebar";
import ProductHeader from "./components/product/ProductHeader";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/ecommerce" element={<Ecom />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/products" element={<ProductHeader />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
