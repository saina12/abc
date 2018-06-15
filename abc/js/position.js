//lib
var position = {
	getCurrentPosition : function(name){
		var coordinates = {},
		element = document.getElementById(name);
		coordinates["x"] = element.offsetLeft;
		coordinates["y"] = element.offsetTop;

		return coordinates
	},
	 setPosition : function(name,toX, toY){
		element = document.getElementById(name);
		element.style.top = toY + "px";
		element.style.left = toX + "px";		
	}
}