const fs = require('fs');
const _ = require('lodash'); // provides utilities for formatting
const yargs = require('yargs'); 

const notes = require('./note.js');

const titleOptions = {
						describe:'title of note',
						demand:true,
						alias:'t'
					 }

const  bodyOptions = {
						describe:'content of note',
						demand:true,
						alias:'b'
					 }
	

let argv = yargs.command('add','Adds new note',{
	title:titleOptions,
	body:bodyOptions
}).command('remove','Remove note of specified title',{
	title:titleOptions
}).command('list','Lists all notes stored').command('read','reads stored note of specified title',{
	title:titleOptions
})
.help()
.argv;


let command = process.argv[2]; //argv._[0]


switch(command){
	case 'add':
	 let note = notes.addNote(argv.title,argv.body);
	   if(note){
		   console.log('\n  Note Added');
		   notes.logNote(note);
	   }else{
		   console.log('title name already exist');
	   } 
	break;
	case 'list':
		let allNotes =  notes.getAll();
		console.log(`displaying all notes, ${allNotes.length} note(s)`);
		allNotes.forEach((note)=>notes.logNote(note));
	break;	
	case 'remove':
	    notes.removeNote(argv.title);      
	break;
	case 'read':
	    let read = notes.getNote(argv.title);
		if(read){
			console.log('\n  Note');
			notes.logNote(read);
		}else{
			console.log('Note does not exist');
		}
	break;
	default:
	   console.log('error : Invalid command type --help for more info');
}
