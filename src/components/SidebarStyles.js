import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
  },
  drawer : {
    width: 200,
  },
  drawerPaper: {
    width: 200,
    boxShadow: '3px 5px 13px -3px rgba(153,151,153,1)',

  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: '#1c6644',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  btnRoot : {
    paddingLeft : "25px",
    justifyContent : "left !important"
  },
  subMenu : {
    paddingLeft : "50px !important",
  },
}));
export default useStyles;
