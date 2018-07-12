/**
 * Libreria a utilizar para 
 */

exports.omapp = (function () {
	
	//----   Private methods ------ //
	var privateMethod = function() {return false;}
	
	
	//----   Public methods ------ //
	var isUserLoggedIn = function() {
		return false;
	}
	
	var sayClick = function() {
		return "click";
	}
	
	return {
		isUserLoggedIn : isUserLoggedIn,
		sayClick : sayClick
	};
	
}());