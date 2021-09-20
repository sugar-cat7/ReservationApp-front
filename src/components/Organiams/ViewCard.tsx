import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { useSpaceCondition } from '../../context/ReservationStateContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      width: 150,
    },
  }),
);

type Props = {
  spaces: {
    id: number;
    name: string;
    color: string;
  }[];
  orgName?: string | string[];
};

const ViewCard: React.FC<Props> = ({ spaces, orgName }) => {
  const { selectSpace } = useSpaceCondition();

  const classes = useStyles();
  const [space, setSpace] = React.useState<string | number>(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSpace(event.target.value as number);
    selectSpace(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Paper className="w-full grid grid-cols-2 justify-between items-center p-2 sm:w-96">
      <div>
        <div>
          グループ: <span className="text-indigo-500 font-semibold">{orgName}</span>
        </div>
        <div>表示スペースを選択→</div>
      </div>
      {spaces && (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">スペース</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={space}
            onChange={handleChange}
          >
            <MenuItem value={0}>
              <em>全て</em>
            </MenuItem>
            {spaces.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                <span
                  style={{
                    backgroundColor: `${s.color}`,
                  }}
                  className={`w-4 h-4 rounded-full  mr-2`}
                />
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Paper>
  );
};

export default ViewCard;
