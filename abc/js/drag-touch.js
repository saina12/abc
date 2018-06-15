// dreg drop touch drag-touch.js
		var touchDrag = (function(){
			var xT, yT, nametd1, inPlayFild;

			window.addEventListener("touchmove", function(e){

				xT = e.touches[0].pageX-70;
				yT = e.touches[0].pageY-70;
				nametd1 = e.target.id;
				if ( ( nametd1 in abcGame.matrix) ) {
					position.setPosition(nametd1,xT, yT);
				};
			});


		})();