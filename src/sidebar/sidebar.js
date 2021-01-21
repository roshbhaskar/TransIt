import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
      inbox:true
    };
  }
  
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }
  updateTitle = (txt) => {
    this.setState({ title: txt });
  }
  newNote = () => {
    this.setState({
      inbox:true
    })
    this.props.deSelectAll();

    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false});
  }
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (note) => this.props.deleteNote(note);
  binNote = (note) => this.props.binNote(note);

  Note=()=>{
    this.setState({
      inbox:true
    })
    this.props.deSelectAll();
  }

  Bin=()=>{
    this.setState({
      inbox:false
    })
    this.props.deSelectAll();
  }

  render() {
    const { notes, classes,user,selectedNoteIndex } = this.props;
    if(notes) {
      const userID = notes.filter(_note=> _note.user==user.uid);
    console.log('user is working',userID);
    const binednotes = userID.filter(_note => _note.bin == true);
    const realnotes = userID.filter(_note => _note.bin == false);
    
    
      return(
        
        <div className={classes.sidebarContainer} >
          
          <div >
          <Button onClick={this.Note} style={{padding:'15px'}} className={classes.Threebuttons} autoFocus >Notes</Button>
            <Button onClick={this.Bin} style={{padding:'15px'}}className={classes.Threebuttons}>Bin</Button>
            </div>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
            
            {
              this.state.addingNote ? 
              <div>
                <input type='text'
                  className={classes.newNoteInput}
                  placeholder='Enter note title'
                  onKeyUp={(e) => this.updateTitle(e.target.value)}>
                </input>
                <Button 
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}>Submit Note</Button>
              </div> :
              null
            }
            
            
            <List>
              { this.state.inbox ?
                realnotes.map((_note, _index) => {
                  return(
                    <div key={_index}>
                      <SidebarItemComponent
                        _note={_note}
                        _index={_index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.binNote}>
                      </SidebarItemComponent>
                      <Divider></Divider>
                    </div>
                  )
                }) :
                binednotes.map((_note, _index) => {
                  return(
                    <div key={_index}>
                      <SidebarItemComponent
                        _note={_note}
                        _index={_index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}>
                      </SidebarItemComponent>
                      <Divider></Divider>
                    </div>
                  )
                })
              }
            </List>
        </div>
      );
    } else {
      return(<div></div>);
    }
  }


}

export default withStyles(styles)(SidebarComponent);