import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

type Props = {
  setModal: () => void;
  setSearchedOrg: React.Dispatch<React.SetStateAction<string>>;
};
const SearchBox: React.FC<Props> = ({ setModal, setSearchedOrg }) => {
  const classes = useStyles();
  const [searchOrg, setSearchOrg] = useState('');

  const onSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSearchedOrg(searchOrg);
    setModal();
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search Group"
        inputProps={{ 'aria-label': 'search group' }}
        value={searchOrg}
        onChange={(e) => {
          setSearchOrg(e.target.value);
        }}
        // onClick={setModal}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        // onSubmit={fetchData}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
