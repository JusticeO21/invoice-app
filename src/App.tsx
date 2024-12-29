import {useEffect} from "react"
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import {useAppDispatch, useAppSelector } from "./Hooks/useRedux";
import { useFetchDataQuery } from "./Redux/dataApi";
import { loadInvoiceData } from "./Redux/invoiceReducer";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage/Invoice";
import Dialog from "./pages/DeleteDialog/DeleteDialog";

function App() {
  const { invoiceList, invoiceDataHasAlreadyBeenLoaded } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();
  const { data } = useFetchDataQuery();

  useEffect(() => {
    if (data &&  !invoiceDataHasAlreadyBeenLoaded && invoiceList.length === 0) {
      dispatch(loadInvoiceData(data));
    }
  }, [data]);
  
  return (
    <Router>
      <div className={styles.app}>
        <header>
          <Navbar />
        </header>

        <main className={styles.main}>
          { <Routes>
              <Route index element={<HomePage />} />
              <Route path="/invoice" element={<Navigate to="/" />} />
              <Route path="/invoice/:invoiceId" element={<InvoiceDetailsPage />}/>
            </Routes> 
          }
        </main>
          <Dialog />
      </div>
    </Router>
  );
}

export default App;
