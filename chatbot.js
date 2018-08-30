	var raids = [];
	const eventFire = (el, etype) => {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		el.dispatchEvent(evt);
	}
	
	function ayuda () {
			messageBox = document.querySelectorAll("[contenteditable='true']")[0];

			//add text into input field
			messageBox.innerHTML = "los comandos disponibles son\n@crear \n@join \n@lista";

			//Force refresh
			event = document.createEvent("UIEvents");
			event.initUIEvent("input", true, true, window, 1);
			messageBox.dispatchEvent(event);

			//Click at Send Button
			eventFire(document.querySelector('span[data-icon="send"]'), 'click');
		}
		
		
			function crearRaid() {
			messageBox = document.querySelectorAll("[contenteditable='true']")[0];
			
			var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
			
			var list = message[(message.length)-1].innerText.split("@crear ").pop();
			list = list.split(",");
			
			var raid = {
				pokemon: list[0],
				horario: list[1],
				lugar: list[2],
				organizador: list[3]
			};
			
			//add text into input field
			messageBox.innerHTML = raid.pokemon + " Se hace: " + raid.horario + " en " + raid.lugar + " organiza " + raid.organizador ;
			raids.push(raid);
			//Force refresh
			event = document.createEvent("UIEvents");
			event.initUIEvent("input", true, true, window, 1);
			messageBox.dispatchEvent(event);

			//Click at Send Button
			eventFire(document.querySelector('span[data-icon="send"]'), 'click');
		}
		
		
		function mostrarLista() {
			messageBox = document.querySelectorAll("[contenteditable='true']")[0];

			raids.forEach ( function(element) {
				//add text into input field
				messageBox.innerHTML = messageBox.innerHTML + element.pokemon + " Se hace: " + element.horario + " en " + element.lugar + " organiza " + element.organizador + "\n -" + element.user + "\n" ;
			});
			
			//Force refresh
			event = document.createEvent("UIEvents");
			event.initUIEvent("input", true, true, window, 1);
			messageBox.dispatchEvent(event);

			//Click at Send Button
			eventFire(document.querySelector('span[data-icon="send"]'), 'click');
		}
		
		function unirseRaid() {
			messageBox = document.querySelectorAll("[contenteditable='true']")[0];
			
			var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
			
			var user = message[(message.length)-1].innerText.split("@join ").pop();
			var nroRaid;
			user = user.split(",");
			nroRaid = user[1]-1;

			if ( raids[nroRaid].user != undefined) {
			raids[nroRaid].user = raids[nroRaid].user + user[0] + "\n- " ;
			}
			else {
				raids[nroRaid].user = user[0] + "\n- ";
			}

			//add text into input field
			messageBox.innerHTML = raids[nroRaid].pokemon + " Se hace: " + raids[nroRaid].horario + " en " + raids[nroRaid].lugar + " organiza " + raids[nroRaid].organizador + "\n - " + raids[nroRaid].user;

			//Force refresh
			event = document.createEvent("UIEvents");
			event.initUIEvent("input", true, true, window, 1);
			messageBox.dispatchEvent(event);

			//Click at Send Button
			eventFire(document.querySelector('span[data-icon="send"]'), 'click');
		}
		
		function leerMensaje() {
			var message = document.getElementsByClassName('selectable-text invisible-space copyable-text')
			var str = message[(message.length)-1].innerText.split(" ", 1);
		if (str[0] == '@ayuda') {
				ayuda();
			}
			else if (str[0] == '@crear') {
				
				crearRaid();
			}			
			else if (str[0] == '@lista') {
				mostrarLista();
			}
			else if (str[0] == '@join') {
				unirseRaid();
			}
		
		}
		
		
		var start = setInterval(leerMensaje, 500);