import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    card:{
      margin: '10px 0',
      borderRadius: 10,
      boxShadow: '1px 1px 3px grey',
      // borderLeft: 'solid',
      // borderLeftWidth: 10,
      minHeight: 120,
      padding: '5px 5px 5px 0',
    },
    stance:{
      width: 10,
      borderRadius: '10px 0 0 10px',
    },
    image: {
      objectFit: 'cover',
      width: '100%',
      height: 250,
    },
    content: {
      paddingLeft: 10,
    },
    contentText: {
      paddingTop: 5,
      whiteSpace: 'nowrap',
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
    },
    contentAvatar: {
      border: '2px solid',
      zIndex: 0,
    },
    contentChip: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    avatarSizeSmall: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    avatarSizeLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    name:{
      padding: 5,
    },
    paper: {
      width: 400,
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButtonWrapper: { 
      padding: 5, 
      border: "solid 1px"
    },
}));