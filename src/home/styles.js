const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 35px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
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