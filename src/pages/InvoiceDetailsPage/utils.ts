import { Data, Invoice } from "../../types/AppDataType";

export function findItemById(data: Data, id: string): Invoice | undefined {
  return data.find((item) => item.id === id);
}
