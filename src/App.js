import React,{useState,useEffect} from 'react';
import NotePage from './home/NotePage';
import LoginPage from "./login/login.js"
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

import './App.css';
const firebase = require('firebase');
function App() {
  const [user,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [hasAccount,setHasAccount] = useState(false);


  const clearInputs = () => {
    setEmail('');
    setPassword("");
  }

  const clearErrors =()=>{
    setEmailError("");
    setPasswordError("");
  }



  const handleLogin=()=>{
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disable" :
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
      }
    })
  }

  const handleSignup = () =>{
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email" :
         
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
      }
    })
  }

  const handleLogout = () =>{
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  const authListener = () =>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        setUser(user);
      }
      else{
        setUser("");
      }
    })
  }

  useEffect(()=>{
    authListener();
  },[])
  return(
  <div className="app-container">
   
   {user ?
    <NotePage handleLogout={handleLogout} user={user}/>
    :
    <LoginPage email={email} setEmail={setEmail} password={password}
    setPassword={setPassword}
    handleLogin={handleLogin}
    handleSignup={handleSignup}
    hasAccount={hasAccount}
    setHasAccount={setHasAccount}
    emailError={emailError}
    passwordError={passwordError}/>
  }
  
  </div>
  );
}
export default App;




/*
class App extends React.Component {

  
    constructor(props) {
      super(props)
    
      this.state = {
        user: '',
        email:'',
        password : '',
        emailError: '',
        passwordError :'',
        hasAccount: false,
        EmailError:'',
        PasswordError:''
      }
    }
    

  clearInputs = () => {
    this.setState({
      email:'',
      password:''
    })
    
    
  }

   clearErrors =()=>{
    this.setState({
      EmailError:'',
      PasswordError:''
    })
  }



   handleLogin=()=>{
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disable" :
          case "auth/user-not-found":
            this.setState({ EmailError: err.message})
            //setEmailError(err.message);
            break;
          case "auth/wrong-password":
            //setPasswordError(err.message);
            this.setState({ PasswordError: err.message})
            break;
      }
    })
  }

   handleSignup = () =>{
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email" :
          this.setState({ EmailError: err.message})
            //setEmailError(err.message);
            break;
          case "auth/weak-password":
            this.setState({ PasswordError: err.message})
            //setPasswordError(err.message);
            break;
      }
    })
  }

   handleLogout = () =>{
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

   authListener = () =>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        this.setState({
          user:user
        })
      }
      else{
        this.setState({
          user:''
        })
      }
    })
  }
  render(){

  useEffect(()=>{
    authListener();
  },[])

  const [user,setUser] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const [hasAccount,setHasAccount] = useState(false)
 
    return(
      <div className="app-container">
        <loginPage/>
      </div>
    )
  }/*

/*
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
      bin:false
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        bin:false,
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

  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          binNote={this.binNote}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}></EditorComponent> :
          null
        }
      </div>
    );
  }
}

export default App;*/
