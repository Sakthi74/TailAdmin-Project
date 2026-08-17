import { ThemeProvider } from "./components/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecom from "./pages/Ecom";
import Crm from "./pages/Crm";
import Product from "./pages/Product";
import AddProductPage from "./pages/AddProductPage";
import BillingPage from "../src/pages/BillingPage";
import InvoiceListPage from "./pages/InvoiceListPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import CalendarPage from "./pages/CalenderPage";
import ListPage from "./pages/ListPage";
import KanbanPage from "./pages/KanbanPage";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Ecom />} />
          <Route path="/ecommerce" element={<Ecom />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/products" element={<Product />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/add-products" element={<AddProductPage />} />
          <Route path="/invoices" element={<InvoiceListPage />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="/create-invoice" element={<CreateInvoicePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
