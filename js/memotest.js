//letiables
let path = "img/";
arrayImagenes = new Array(36);
let first = true;
let turno = 0;
let j1 = 0;
let j2 = 0;
let pid;
let total = 0;	
let ganador = 0;

/* Crea el array con el path de la imagen */
function crearImagenes () {
	for (let i = 0; i <= 35; i++) {
		if (i <= 17){
			arrayImagenes[i] = path + i + '.png';
		} else {
			j = i - 18;
			arrayImagenes[i] = path + j + '.png';		
		}
	}
	shuffle(arrayImagenes);
}


/* Shuffle del array */
function shuffle (array) {
	let i = array.length;
	while (i--) {
		let j = Math.floor( Math.random() * (i + 1) );
		let tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
}

		
/* Ejecuta el juego */	
function jugar () {			
	crearImagenes();
	document.getElementById('memotest').style.display = "block";
	document.getElementById("jugador1").style.color = "#03BF35";
	document.getElementById("jugar").style.display = "none";
}

function imgcheck (imagen){
	id = imagen.id;
	imagen.src = arrayImagenes[id];

	//turno del jugador
	jugador = tratarjugador(turno);
						
	if (first) {	
		prim = imagen;
		first = false;
		pid = prim.id;
		pid.src = arrayImagenes[id];
		imagen.id = "si";
	} else {
		//Verifica si son iguales
		if (imagen.id != "si" && arrayImagenes[pid] == arrayImagenes[id]) {							
			
			total++;

			if (arrayImagenes[pid] === 'img/9.png' && arrayImagenes[id] === 'img/9.png') {
				document.getElementById("modal").style.display = "block";
			}

			if (jugador == 1){
				j1 = j1 + 1;
				document.getElementById("j1").innerHTML = j1;
			} else {
				j2++;
				document.getElementById("j2").innerHTML = j2;
			}
		
			//Si termina el juego
			if (total == 18){
				ganador = finjuego(j1, j2);
			}		
			//elimina el onclick si ya fueron encontrados
			imagen.onclick = "";
			prim.onclick = "";
		} else {
			if (prim.id == "si"){
				prim.id = pid;
				setTimeout(function() {changeimages(imagen)} , 800);
				setTimeout(function() {changeimages(prim)} , 800);							
			}
		}
	
		first = true;
		turno++;
	
		//si no hay ganador
		if(ganador == 0){
			jugador = tratarjugador(turno);
		}	
	}
}


let changeimages = function(imagen) {
	imagen.src = path + "LogoZurich.png";
}		
			
function tratarjugador(turno){
	let jugador = turno % 2 == 0 ? 1 : 2;
	if (jugador == 1) {
		document.getElementById("jugador1").style.color = "#03BF35";
		document.getElementById("jugador2").style.color = "black";
	} else {
		document.getElementById("jugador2").style.color = "#03BF35";
		document.getElementById("jugador1").style.color = "black";
	}
	return jugador;
}
	
function finjuego(j1, j2) {
	let ganador;
	if (j1 == j2) {
		document.getElementById("anotador").innerHTML = "ES UN EMPATE!"; 
	} else {
		if (j1 > j2) {
			ganador = "1";
		} else {
			ganador = "2";
		}
	}
	document.getElementById("anotador").innerHTML = "EL GANADOR ES EL JUGADOR " + ganador;
	return ganador;
}

function cerrarModal () {
	document.getElementById("modal").style.display = "none";
}
