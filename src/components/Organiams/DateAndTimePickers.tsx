import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '../Atoms/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import api from '../../utils/fetch';

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (v, k) => k + start);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    textField: {
      width: 200,
      marginBottom: theme.spacing(2),
    },
    box: {
      width: 100,
      marginBottom: theme.spacing(2),
    },
    autoComplete: {
      marginBottom: theme.spacing(3),
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 100,
      marginBottom: theme.spacing(2),
    },
  }),
);

type Props = {
  startLabel: string;
  endLabel: string;
  startDate: string;
  endDate: string;
  users?: any[];
  isEdit: boolean;
  orgId: string | string[] | undefined;
  orgName?: string | string[] | undefined;
  reservationId?: number;
  spaces?: any[];
  rSpaceId?: number;
};

type Option = {
  id: number;
  name: string;
  kana: string;
};

const DateAndTimePickers: React.FC<Props> = ({
  startLabel,
  endLabel,
  startDate,
  endDate,
  users,
  orgId,
  orgName,
  reservationId,
  isEdit,
  spaces,
  rSpaceId,
}) => {
  const classes = useStyles();
  const [startTime, setStartTime] = useState<string>(startDate);
  const [endTime, setEndTime] = useState<string>(endDate);
  const [number, setNumber] = useState<number | string>(0);
  const [values, setValues] = useState<number[]>([]);
  const [spaceId, setSpaceId] = useState<string | number>('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSpaceId(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const registerDate = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post(`/api/organization/${orgId}/space/${spaceId}/reservation`, {
        numbers: number,
        start_time: startTime,
        end_time: endTime,
        users: values,
      })
      .then(() => alert('予定を追加しました'))
      .catch((err) => {
        alert(err);
      });
  };

  const editReservation = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api
      .put(`/api/organization/${orgId}/space/${rSpaceId}/reservation/${reservationId}`, {
        start_time: startTime,
        end_time: endTime,
      })
      .then(() => alert('予約を変更しました'))
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form
      className={classes.container}
      noValidate
      onSubmit={isEdit ? editReservation : registerDate}
    >
      {/* <form className={classes.container} noValidate> */}
      <TextField
        id="datetime-local"
        label={startLabel}
        type="datetime-local"
        // defaultValue="2017-05-24T10:30"
        defaultValue={startDate}
        value={startTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setStartTime(e.target.value);
        }}
        required
      />
      <br />
      <TextField
        id="datetime-local"
        label={endLabel}
        type="datetime-local"
        // defaultValue="2017-05-24T10:30"
        defaultValue={endDate}
        value={endTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setEndTime(e.target.value);
        }}
        required
      />
      {users && (
        <>
          <Box className={classes.box}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                人数
              </InputLabel>
              <NativeSelect
                inputProps={{
                  name: 'number',
                  id: 'uncontrolled-native',
                }}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                required
              >
                {range(0, 10).map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Box>
          {spaces && (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">スペース</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={spaceId}
                onChange={handleChange}
                required
              >
                {spaces.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Autocomplete
            className={classes.autoComplete}
            multiple
            id="tags-standard"
            // options={top100Films}
            options={users}
            getOptionLabel={(option: Option) => option.name}
            // getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="場所を使う人を選択" />
            )}
            onChange={(_, v) => {
              const ids: number[] = [];
              v.map(({ id }) => ids.push(id));
              setValues(ids);
            }}
          />
        </>
      )}
      {isEdit ? <Button>予定を変更する</Button> : <Button>予定を追加する</Button>}
    </form>
  );
};

export default DateAndTimePickers;
