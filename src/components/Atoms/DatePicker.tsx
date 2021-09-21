import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker';

// type DateTimePickerProps = {
//   onChange: (d: Date) => void;
// };
//https://next--material-ui.netlify.app/ja/components/date-time-picker/
export const BasicDateTimePicker: React.FC<DateTimePickerProps<Date>> = (props) => {
  //   const [value, setValue] = useState<Date | null>(new Date());
  const { ...inputProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        {...inputProps}
        // onChange={onChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};
