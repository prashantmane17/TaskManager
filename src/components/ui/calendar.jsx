// @/components/ui/calendar.jsx
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function Calendar({ selected, onSelect }) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className="rounded-md shadow-sm border p-4"
    />
  );
}
