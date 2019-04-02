var raids = [];
const eventFire = (el, etype) => {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
	el.dispatchEvent(evt);
}

function sendMessage(messageBox) {
		//Force refresh
		event = document.createEvent("UIEvents");
		event.initUIEvent("input", true, true, window, 1);
		messageBox.dispatchEvent(event);

		//Click at Send Button
		eventFire(document.querySelector('span[data-icon="send"]'), 'click');
}

function ayuda () {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];

		//add text into input field
		messageBox.innerHTML = 'los comandos disponibles son\n@reglas \n@crear Pokemon, Hora, Lugar, Organizador \n@join Nombre, Nro Raid \n@lista \n@cancelar Nro Raid';

		sendMessage(messageBox);
	}


		function crearRaid() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];

		var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')

		var list = message[(message.length)-1].innerText.split("@crear").pop();
		
		var seCrea = true;
		
		list = list.split(",");
		
		if (list.length == 4) {
			list.forEach(function (element) {
				if(element == "") {
					seCrea = false;
				}				
			});
			if(seCrea) {
				var raid = {
					pokemon: list[0],
					horario: list[1],
					lugar: list[2],
					organizador: list[3],
					user: list[3] + "\n- "
				};

				//add text into input field
				messageBox.innerHTML = raid.pokemon + " | Se hace: " + raid.horario + " | en " + raid.lugar + " | organiza " + raid.organizador + "\n- " + raid.user;
				raids.push(raid);
			}
			else {
				messageBox.innerHTML = 'el formato para crear raids es "Pokemon,Hora,Lugar,Organizador"';
			}
		}
		else {
			messageBox.innerHTML = 'el formato para crear raids es "Pokemon,Hora,Lugar,Organizador"';
		}
		sendMessage(messageBox);
	}
	
	function mostrarReglas() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];
		
		messageBox.innerHTML = "Anarquia";
		sendMessage(messageBox);
	}


	function mostrarLista() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];

		if (raids.length > 0) {
				raids.forEach ( function(element) {
				//add text into input field
				messageBox.innerHTML = messageBox.innerHTML + element.pokemon + " | Se hace: " + element.horario + " | en " + element.lugar + " | Organiza " + element.organizador + "\n- " + element.user + "\n\n";
			});
		}
		else {
			messageBox.innerHTML = "No hay raids disponibles";
		}
		
		sendMessage(messageBox);

	}

	function unirseRaid() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];

		var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
		var user = message[(message.length)-1].innerText.split("@join").pop();
		var nroRaid;
		
		if (user != "") {
			user = user.split(",");
			if (user.length == 2) {
				nroRaid = user[1]-1;
				if (raids.length > 0 && raids[nroRaid] != undefined) {
					if ( raids[nroRaid].user != undefined) {
						raids[nroRaid].user = raids[nroRaid].user + user[0] + "\n- " ;
					}

					messageBox.innerHTML = raids[nroRaid].pokemon + " | Se hace: " + raids[nroRaid].horario + " | en " + raids[nroRaid].lugar + " | Organiza " + raids[nroRaid].organizador + "\n- " + raids[nroRaid].user;
				}
				else {
					messageBox.innerHTML = "no existe la raid seleccionada";
				}
			}
			else {
				messageBox.innerHTML = 'para unirse el formato es "Nombre, Nro Raid"';
			}
		}
		else {
			messageBox.innerHTML = 'para unirse el formato es "Nombre, Nro Raid"';
		}

		sendMessage(messageBox);
	}

	function cancelarRaid() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];
		var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
		var nroRaid = message[(message.length)-1].innerText.split("@cancelar ").pop();
		nroRaid = nroRaid - 1;

		if (nroRaid <= raids.length && raids[nroRaid] != undefined) {
			raids.splice(nroRaid,1);
			messageBox.innerHTML = "la raid " + nroRaid + 1 + " se cancelo";
		}
		else {
			messageBox.innerHTML = "no existe la raid seleccionada";
		}
		
		sendMessage(messageBox);
	}
	
	function borrarTodo() {
		var messageBox = document.querySelectorAll("[contenteditable='true']")[0];
		raids = []
		
		messageBox.innerHTML = "se borraron todas las raids activas";
		
		sendMessage(messageBox);
	}

	function leerMensaje() {
		var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
		var str = message[(message.length)-1].innerText.split(" ", 1);

		switch (str[0]) {
			case '@ayuda':
					ayuda();
				break;
			case '@crear':
					crearRaid();
				break;
			case '@lista':
					mostrarLista();
				break;
			case '@join':
				unirseRaid();
				break;
			case '@cancelar':
				cancelarRaid();
				break;
			case '@reglas':
				mostrarReglas();
				break;
			case '@clear':
				borrarTodo();
				break;
		}

	}
	var start = setInterval(leerMensaje, 500);
