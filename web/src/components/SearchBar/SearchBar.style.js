import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    searchBarContainer: {
      paddingTop: 20,
    },
    searchBarOptionContainer: {
      borderRadius: '0 0 10px 10px',
      boxShadow: '1px 1px 3px grey',
    },
    searchBarOption: {
      padding: 10,
    },
    searchBarOptionButton: {
      paddingTop: 1,
    },
  }));