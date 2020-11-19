import { makeStyles } from '@material-ui/styles';


const mtStyles = makeStyles({
  pageActions: {
    margin: '1.5rem 0',
  },
  root:{
    backgroundColor: 'white',
    border: '1px solid lightGrey',
    borderRadius: '5px',
    padding: '30px'
  },
  columnContainer: {
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap' : 'wrap'
  },
  rowContainer: {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap' : 'wrap'
  },
  outlineButton: {
    border : '1.5px solid',
    "&:Hover": {
      border : '1.5px solid'
    }
  },
  link: {
    'cursor': 'pointer'
  },
  iconsRowContainer: {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap' : 'wrap',
    'align-items' : 'center',
    'justify-content' : 'space-around'
  },
});


export default mtStyles;
