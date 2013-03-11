$(document).ready(function(){
	//References
	var process = $("#button");
	var loading = $("#loading");
	
	//Manage click events
	process.click(function(){
		//show the loading bar
		showLoading();
		
	});

	//show loading bar
	function showLoading(){
		loading
			.css({visibility:"visible"})
			.css({opacity:"1"})
			.css({display:"block"})
		;
	}
	//hide loading bar
	function hideLoading(){
		loading.fadeTo(1000, 0);
	};
});