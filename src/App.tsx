import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage/InvoiceDetailsPage";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import NotFoundPage from "./pages/404Page/404Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/invoice" element={<Navigate to="/" replace />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetailsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
