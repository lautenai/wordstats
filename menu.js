$(document).ready(function(){
	//References
	var sections = $("#menu li");
	var loading = $("#loading");
	var content = $("#content");
	
	//Manage click events
	sections.click(function(){
		//show the loading bar
		showLoading();
		//load selected section
		switch(this.id){
			case "home":
				content.slideUp();
				content.load("sections.html #section_home", hideLoading);
				content.slideDown();
				break;
			case "monoconcordancer":
				content.slideUp();
				content.load("monoconcordancer.html", hideLoading);
				content.slideDown();
				break;
			case "parallelconcordancer":
				content.slideUp();
				content.load("parallelconcordancer.html", hideLoading);
				content.slideDown();
				break;
			case "wordlist":
				content.slideUp();
				content.load("wordlist.html", hideLoading);
				content.slideDown();
				break;
			case "keywords":
				content.slideUp();
				content.load("keywords.html", hideLoading);
				content.slideDown();
				break;
			default:
				//hide loading bar if there is no selected section
				hideLoading();
				break;
		}
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