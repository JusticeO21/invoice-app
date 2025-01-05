import { v4 as uuidv4 } from 'uuid';
import { format, parseISO, addDays } from 'date-fns';

export const generateRandomId = (): string => {
  const uuid: string = uuidv4().replace(/-/g, '');
  const randomLetters: string = Array.from(crypto.getRandomValues(new Uint8Array(2)))
    .map(value => String.fromCharCode(65 + (value % 26)))
    .join('');
  const randomNumbers: string = uuid.slice(0, 4);
  const randomId: string = `${randomLetters}${randomNumbers}`;
  return randomId;
};

export const calculateDueDate = (startDate: string, daysToAdd: number = 7): string => {
  const startDateObj: Date = parseISO(startDate);
  const dueDate: Date = addDays(startDateObj, daysToAdd);
  return format(dueDate, 'yyyy-MM-dd');
};
