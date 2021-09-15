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
      width: 280,
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
  loggedInUserId?: number;
  startDate: string;
  endDate: string;
  users?: any[];
  isEdit: boolean;
  orgId: string | string[] | undefined;
  orgName?: string | string[] | undefined;
  reservationId?: number;
  spaces?: {
    capacity: number;
    // description: null;
    id: number;
    // image_url: null;
    name: string;
    organization_id: number;
    // rule: null;
  }[];
  rSpaceId?: number;
};

type Option = {
  id: number;
  name: string;
  kana: string;
};

type SetProps = {
  title: string;
  startDate: string;
  endDate: string;
  number: string;
  spaceId: number;
  users: number[];
  memo: string;
};

const DateAndTimePickers: React.FC<Props> = ({
  startDate,
  endDate,
  users,
  orgId,
  orgName,
  reservationId,
  isEdit,
  spaces,
  rSpaceId,
  loggedInUserId,
}) => {
  const classes = useStyles();
  const [modalData, setModalData] = useState<SetProps>({
    title: '',
    startDate: startDate,
    endDate: endDate,
    number: '',
    spaceId: 0,
    users: [],
    memo: '',
  });

  const [changeCapacity, setChangeCapacity] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModalData({ ...modalData, spaceId: event.target.value as number });
    setChangeCapacity(true);
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
      .post(`/api/organization/${orgId}/space/${modalData.spaceId}/reservation`, {
        // title: modalData.title,
        numbers: modalData.number,
        start_time: modalData.startDate,
        end_time: modalData.endDate,
        users: modalData.users,
        memo: modalData.memo,
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
        memo: modalData.memo,
        start_time: modalData.startDate,
        end_time: modalData.endDate,
      })
      .then(() => alert('予約を変更しました'))
      .catch((err) => {
        alert(err);
      });
  };

  // かなり冗長なのでまとめた方が良さそう
  return (
    <form
      className={classes.container}
      noValidate
      onSubmit={isEdit ? editReservation : registerDate}
    >
      {/* <TextField
        id="title"
        label="タイトル"
        type="text"
        defaultValue={modalData.title}
        value={modalData.title}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setModalData({ ...modalData, title: e.target.value });
        }}
        required
      /> */}
      <br />
      <TextField
        id="datetime-local"
        label="開始時間"
        type="datetime-local"
        // defaultValue="2017-05-24T10:30"
        defaultValue={modalData.startDate}
        value={modalData.startDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setModalData({ ...modalData, startDate: e.target.value });
        }}
        required
      />
      <br />
      <TextField
        id="datetime-local"
        label="終了時間"
        type="datetime-local"
        // defaultValue="2017-05-24T10:30"
        defaultValue={modalData.endDate}
        value={modalData.endDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setModalData({ ...modalData, endDate: e.target.value });
        }}
        required
      />
      {users && (
        <>
          {spaces && (
            <>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">スペース</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={modalData.spaceId}
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
                      setModalData({ ...modalData, number: e.target.value });
                    }}
                    required
                  >
                    {range(
                      0,
                      changeCapacity
                        ? spaces.filter((s) => s.id === modalData.spaceId)[0].capacity
                        : 0,
                    ).map((i) => {
                      return (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </Box>
            </>
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
              setModalData({ ...modalData, users: ids });
            }}
          />
        </>
      )}
      <TextField
        id="title"
        label="メモ"
        type="text"
        multiline
        defaultValue={modalData.memo}
        value={modalData.memo}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setModalData({ ...modalData, memo: e.target.value });
        }}
      />
      {isEdit ? (
        <Button>予定を変更する</Button>
      ) : (
        <Button disabled={!modalData.users.includes(loggedInUserId!)}>予定を追加する</Button>
      )}
    </form>
  );
};

export default DateAndTimePickers;
