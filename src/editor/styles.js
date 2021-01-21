const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  titleInput: {
    
    color:'white',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 300px)',
    backgroundColor: '#603bbb',
    borderRadius:'5px',
    paddingLeft: '50px'
  },
  editIcon: {
    position: 'absolute',
    left: '10px',
    top: '8px',
    color: 'white',
    width: '10',
    height: '10'
  },
  editorContainer: {
    position: 'absolute',
    height: '80%',
    width: '100%',
    //padding: '10px',
    top: '74px',
    left: '300px',
    boxSizing: 'border-box'
  },
  Signout:{
    position:'relative',
    padding:'17px',
    width: '120px',
    height: '5px',
    top:'20px',
    left: '1000px',
    borderBottom: '1px solid black',
    borderRadius: '6px',
    backgroundColor: '#603bbb',
    color: 'white',
    '&:hover': {
      backgroundColor: '#88a2ce'
    }
  }
});

export default styles;