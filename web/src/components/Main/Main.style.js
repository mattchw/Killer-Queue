import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	container: {
    backgroundColor: '#282c34',
  },
  containerItem: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '5%'
  },
  appBarIcon: {
    width: 50,
    userSelect: 'none',
  },
  title:{
    userSelect: 'none',
    fontFamily: 'Abang',
  },
  navItem:{
    padding: 10
  },
	link:{
		textDecoration: 'none',
	}
}));