import { ThemeProvider } from "./components/ThemeProvider";
import DashboardLayout from "./components/reusable/DashboardLayout";
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <DashboardLayout />
      </div>
    </ThemeProvider>
  );
};

export default App;
