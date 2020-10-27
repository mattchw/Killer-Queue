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
    '@media (min-width:300px)': {
      fontSize: '1.5rem',
    },
    '@media (min-width:400px)': {
      fontSize: '1.8rem',
    },
    '@media (min-width:600px)': {
      fontSize: '2rem',
    }
  },
  description:{
    '@media (min-width:300px)': {
      fontSize: '1rem',
    },
    '@media (min-width:400px)': {
      fontSize: '1.3rem',
    },
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    }
  },
  navTitle:{
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