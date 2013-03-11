function toggleFormVisibility(a,a) {
	var frm_element = document.getElementById('frm' + a);
	var sub_link_element = document.getElementById('sub' + a);
	var nosub_link_element = document.getElementById('nosub' + a);
	var vis = frm_element.style;
	if (vis.display == '' || vis.display == 'none') {
		vis.display = 'block';
		sub_link_element.style.display = 'none';
		nosub_link_element.style.display = '';
	} else {
		vis.display = 'none';
		sub_link_element.style.display = 'block';
		nosub_link_element.style.display = 'none';
	}
}

function txt1show() {
	$('#txt1').show('slow');
	return false;
};

function txt2show() {
	$('#txt2').show('slow');
	return false;
};

function txt1hide() {
	$('#txt1').hide('fast');
	return false;
};

function txt2hide() {
	$('#txt2').hide('fast');
	return false;
};

function removeElement(){
	var div = document.getElementById("txt2");
	div.parentNode.removeChild(div);
}
