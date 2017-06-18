const fs = require('fs');
const fetchNotes = () =>{
    try{
		 let noteString = fs.readFileSync('notes-data.json');
		  return JSON.parse(noteString);
	}catch(e){
		return [];
	}
}

const saveNotes = (notes) =>{
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}


const addNote = (title,body) =>{
   let notes = fetchNotes();
	let note ={
		title,
		body
	};
	
	   let duplicateNotes = notes.filter((note)=>note.title === title);
			   
	 if(duplicateNotes.length === 0){
		 notes.push(note);
		  saveNotes(notes);
		  return note;
	 }
}

const removeNote = (title) =>{
	 let notes = fetchNotes();
	 let sniffedNotes = notes.filter((note)=>note.title !== title);
	 saveNotes(sniffedNotes);
	 if(notes.length !== sniffedNotes.length){
		   console.log(`Note with title: ${title} deleted`);
	 }else{
		 console.log('No Notes deleted, try new title');
	 }
}

const getNote =(title)=>{
	let notes = fetchNotes();
	let notePicked = notes.filter(note => note.title === title);
	let note = notePicked[0];
	  return note;
}

const getAll = () =>{
	return fetchNotes();
}

const logNote = (note) =>{
	 debugger;
	console.log(`--------- \n title: ${note.title} \n content: ${note.body}`);
}

module.exports = {
	addNote,
	getNote,
	removeNote,
	getAll,
	logNote,
};