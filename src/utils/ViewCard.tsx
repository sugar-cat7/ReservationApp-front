import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { useSpaceCondition } from '../context/ ReservationStateContext';

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
  }[];
  color: {
    spaceId: number;
    bgColor: string;
  }[];
};

const ViewCard: React.FC<Props> = ({ spaces, color }) => {
  const { selectSpace } = useSpaceCondition();

  const classes = useStyles();
  const [space, setSpace] = React.useState<string | number>(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSpace(event.target.value as number);
    selectSpace(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Paper className="w-full flex justify-between items-center p-2 lg:w-96">
      <div className="w-2/4">表示スペースを選択</div>
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
                    backgroundColor: `${color.filter((c) => c.spaceId === s.id)[0].bgColor}`,
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
