


const cells = document.querySelectorAll('.cell');
let Turn=true;
const resetbtn = document.querySelector('.reset');
const currentTurn= document.querySelector('.current-turn');
const player1score= document.querySelector('.score1');
const player2score= document.querySelector('.score2');
const nbrdraw=document.querySelector('.draw');
const messagecontent = document.querySelector('.content');
const closebtn = document.querySelector('.X');
const overlay = document.getElementById('overlay');

const winCombos = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
];
let usedCells= [];
let Winner= false;
let draw=0;
let player1 ={
	Symbol :'<i class="fa fa-close"> </i>',
	played :[],
	score  :0
}
let player2 ={
	Symbol :'<i class="fa-regular fa-circle"></i>',
	played :[],
	score  :0
}

chickTurn();

for(let i=0;i<9;i++){
	
	cells[i].addEventListener('click',() =>{
	if(!isempty(i)){
		if (Turn){
			addSymbol(player1,i);
			Turn=false;
			checkWin (player1);
			
			chickTurn();
		
		}else {
			addSymbol(player2,i);
			Turn=true;
			checkWin (player2);
	       		
			chickTurn();
	      	
	      	}}else{ alert('ATTENTION : Select empty case !!!');}
	})
}

function addSymbol(player,i) {
	
	cells[i].innerHTML=player.Symbol;
	player.played.push(i);
	usedCells.push(i);
}


function checkWin (player) {
	if(!Winner){
	winCombos.some(combo => {
		
	if(combo.every(index => player.played.includes(index))){
		Winner=true;
		player.score++;
		showscore();
		setTimeout(showMessage,250,player,Winner);
		reset();
	}   
		    
	} )} if(!Winner && usedCells.length ==9 ){
		draw++;
		showscore();
		setTimeout(showMessage,250,player,Winner);
	}
		
	
	
}

function isempty(i){
	
	if(usedCells.includes(i)){
		return true;
	}else {return false;}
}

function reset(){
	
	cells.forEach(cell => {
		cell.innerHTML='';
	})
	usedCells=[];
	player1.played=[];
	player2.played=[];
	Turn=true;
	Winner=false;
	chickTurn();
}
function chickTurn(){
	if(Turn){
		currentTurn.innerHTML = player1.Symbol;
	}else{currentTurn.innerHTML = player2.Symbol;}
}
function showscore(){
	player1score.innerHTML= player1.score;
	player2score.innerHTML= player2.score;
	nbrdraw.innerHTML=draw;
}

resetbtn.addEventListener('click',reset);

closebtn.addEventListener('click',() => {
	overlay.style.display='none';
})


function showMessage(player,winner){
	if(winner){
		overlay.style.display ='flex';
		messagecontent.innerHTML = player.Symbol +' is  THE <h2> WINNER</h2>';
		reset();
	}else {
		overlay.style.display ='flex';
		messagecontent.innerHTML = 'This is <h2>Draw</h2>';
		reset();
		
		
	}
}





