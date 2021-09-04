import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

type Props = {
  spaces: {
    id: number;
    name: string;
  }[];
};

const ViewCard: React.FC<Props> = ({ spaces }) => {
  //TODO spaceの切り替えを発火に、現状の選択されているスペースのidをdispatch
  const classes = useStyles();
  const [space, setSpace] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSpace(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Paper className="w-full flex justify-between items-center p-2">
      スペースを選択
      {spaces && (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Space</InputLabel>
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
