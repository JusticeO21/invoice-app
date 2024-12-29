import { useState, useEffect } from "react";
import { Text } from "../text/Text"; 
import { Heading } from "../heading/Heading";
import styles from "./Table.module.css"
import data from "../../assets/data.json";
import { formatCurrency } from "../InvoiceCard/utils";
interface TableProps {
  headers?: ["Name", "QTY", "Price", "Total"]; 
}

function Table ({ headers = ["Name", "QTY", "Price", "Total"] }: TableProps){
  const mediaQuery = window.matchMedia("(max-width:600px)");
  const usableData = data[4];
  const InvoiceItems = usableData.items;
  
     const [isMobile, setIsMobile] = useState(mediaQuery.matches);
      useEffect(() => {
        const handleResize = (e: MediaQueryListEvent) => {
          setIsMobile(e.matches);
      };
    
        mediaQuery.addEventListener("change", handleResize);
        return () => {
          mediaQuery.removeEventListener("change", handleResize);
        };
      }, []);

  return (
    <table className={styles.table}>
      {!isMobile && (
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                <Text>{header}</Text>
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {!isMobile &&
          InvoiceItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
              <td>{formatCurrency(row.price)}</td>
              <td>{formatCurrency(row.total)}</td>
            </tr>
          ))}

        {isMobile &&
          InvoiceItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <Heading variant="h5" className={styles.mobile_heading}>
                  {row.name}
                </Heading>
                <Text>{row.quantity} * { formatCurrency(row.price)}</Text>
              </td>
              <td>
                <Text>{formatCurrency(row.total)} </Text>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
