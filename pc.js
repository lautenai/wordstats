function pc(n) {
	s = document.main;
	var intex = s.textin.value;
	var intex2 = s.text2in.value;
	var keyw = s.sword.value;
	var secondw = s.sdword.value;
	var outputdata = "";
	var textArray = [];
	var resultArray = [];
	var testArray = [];
	document.getElementById('output').innerHTML = "";
	if (intex === "" || keyw === "" || (intex2 === "" && s.inputchoice[0].checked)) {
		alert("Please provide text in the Search Word(s) and/or Text field(s)");
		return;
	}
	var start = new Date().getTime();
	intex = intex.replace(/\<[^\>]{1,10}\>/g, "");
	intex = removeHTMLTags(intex);
	intex2 = removeHTMLTags(intex2);
	intex1Array = intex.split(/\r?\n/);
	intex2Array = intex2.split(/\r?\n/);
	for (var i = 0; i < intex1Array.length; i++) {
		textArray.push([intex1Array[i], intex2Array[i]]);
	}
	if (s.sunit[0].checked) {
		var theword = new RegExp("\\b" + keyw + "\\b", "gi");
	} else if (s.sunit[1].checked) {
		var theword = new RegExp("\\b" + keyw + "\\w*", "gi");
	} else if (s.sunit[2].checked) {
		var theword = new RegExp("\\w*" + keyw + "\\b", "gi");
	} else if (s.sunit[3].checked) {
		var theword = new RegExp("\\w*" + keyw + "\\w*", "gi");
	} else {
		var theword = new RegExp(keyw, "gi");
	}
	if (s.sunit2[0].checked) {
		var theword2 = new RegExp("\\b" + secondw + "\\b", "gi");
	} else if (s.sunit2[1].checked) {
		var theword2 = new RegExp("\\b" + secondw + "\\w*", "gi");
	} else if (s.sunit2[2].checked) {
		var theword2 = new RegExp("\\w*" + secondw + "\\b", "gi");
	} else if (s.sunit2[3].checked) {
		var theword2 = new RegExp("\\w*" + secondw + "\\w*", "gi");
	} else {
		var theword2 = new RegExp(keyw, "gi");
	}
	for (var i = 0; i < textArray.length; i++) {
		if (textArray[i][0] != undefined && textArray[i][1] != undefined) {
			if (s.textchoice[0].checked) {
				if (textArray[i][0].match(theword)) {
					if (secondw === "") {
						resultArray.push([textArray[i][0].replace(theword, '<font color = "blue">$&</font>'), textArray[i][1]]);
					} else {
						resultArray.push([textArray[i][0].replace(theword, '<font color = "blue">$&</font>'), textArray[i][1].replace(theword2, '<font color = "blue">$&</font>')]);
					};
				};
			} else {
				if (secondw === "") {
					resultArray.push([textArray[i][0], textArray[i][1].replace(theword, '<font color = "blue">$&</font>')]);
				} else {
					resultArray.push([textArray[i][0].replace(theword2, '<font color = "blue">$&</font>'), textArray[i][1].replace(theword, '<font color = "blue">$&</font>')]);
				};
			}
		};
	};
	outputdata = '<b>' + resultArray.length + '</b> pairs found<br /><br />\n';
	outputdata += '<table id = "example" cellpadding = "0" cellspacing = "0" border = "0" class = "display">\n';
	outputdata += '<thead><tr><th>ID</th><th>TEXT 1</th><th>TEXT 2</th></tr></thead>\n';
	outputdata += '<tbody>\n';
	for (var i = 0; i < resultArray.length; i++) {
		outputdata += '<tr class = \"gradeA\">\n';
		outputdata += '<td></td>\n';
		outputdata += '<td>' + resultArray[i][0] + '</td>\n';
		outputdata += '<td>' + resultArray[i][1] + '</td>\n';
		outputdata += '</tr>\n';
	};
	outputdata += '</tbody>\n';
	outputdata += '</table>\n';
	var end = new Date().getTime();
	var time = end - start;
	alert('Execution Time: ' + time + ' ms\nTotal Pairs: ' + resultArray.length);
	document.getElementById('output').innerHTML = outputdata;
}
 