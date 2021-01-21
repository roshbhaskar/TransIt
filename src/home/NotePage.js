import React from 'react';
import SidebarComponent from '../sidebar/sidebar.js';
import EditorComponent from '../editor/editor.js';
import { Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const firebase = require('firebase');

class NotePage extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      bin:false,
      user:this.props.user.uid
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        bin:false,
        user:this.props.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  binNote = async(note) =>{
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    await firebase.firestore().collection('notes').doc(note.id)
        .update({
            bin : true
        });
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  deSelectAll =async ()=>{
    this.setState({
      selectedNote:null
    })
    console.log('deselected all')
  }

  render() {
    const { classes } = this.props;
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          binNote={this.binNote}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
          deSelectAll={this.deSelectAll}

          user={this.props.user}></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}
          handleLogout={this.props.handleLogout}
          ></EditorComponent> :
          <div className="main-heading">
            <p style={{position:'absolute', left:'660px',marginTop:'18px',fontFamily:'cursive',color:'purple'}}><h1>TransIt</h1></p>
            <div >
            <Button onClick={this.props.handleLogout} className={classes.Signout} >Sign Out</Button></div></div>
          
        }
      </div>
    );
  }
}

export default withStyles(styles)(NotePage);
