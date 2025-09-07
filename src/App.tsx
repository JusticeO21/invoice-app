import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import SkipLink from "./components/SkipLink/SkipLink";

// Lazy load components for better performance
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const InvoiceDetailsPage = lazy(
  () => import("./pages/InvoiceDetailsPage/InvoiceDetailsPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/404Page/404Page"));

// Component to handle scroll restoration and focus management
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Focus management for accessibility
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [pathname]);

  return null;
}

// Component to handle dynamic title updates
function DocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname: string) => {
      switch (pathname) {
        case "/":
          return "Invoice App - Dashboard";
        case "/login":
          return "Invoice App - Login";
        default:
          if (pathname.startsWith("/invoice/")) {
            return "Invoice App - Invoice Details";
          }
          return "Invoice App - Page Not Found";
      }
    };

    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SkipLink />
        <ScrollToTop />
        <DocumentTitle />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path="/invoice" element={<Navigate to="/" replace />} />
              <Route
                path="/invoice/:invoiceId"
                element={<InvoiceDetailsPage />}
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
