function concordance(n) {
	s = document.main;
	var cspan = s.contextspan.value;
	var intex = s.textin.value;
	var keyw = s.sword.value;
	var sorting1 = s.sorting1.value;
	var sorting2 = s.sorting2.value;
	var sorting3 = s.sorting3.value;
	var outputdata;
	document.getElementById('output').innerHTML = "";
	if (intex == "" || keyw == "") {
		alert("Please provide text in the Search Word(s) and/or Text field(s)");
		return;
	}
	var start = new Date().getTime();
	intex = intex.replace(/\<[^\>]+?\>/g, "");
	if (s.langc[1].checked) {
		intex = intex.replace(/\n\r/g, "");
		intex = intex.replace(/\n/g, "");
		intex = intex.replace(/\r/g, "");
		intex = intex.replace(/\s\s*/g, "");
	} else {
		intex = intex.replace(/\n/g, " ");
		intex = intex.replace(/\r/g, "");
		intex = intex.replace(/  /g, " ")
	}
	if (s.sunit[0].checked && s.langc[0].checked) {
		var theword = new RegExp("\\b" + keyw + "\\b", "gi");
	} else if (s.sunit[1].checked && s.langc[0].checked) {
		var theword = new RegExp("\\b" + keyw + "\\w*", "gi");
	} else if (s.sunit[2].checked && s.langc[0].checked) {
		var theword = new RegExp("\\w*" + keyw + "\\b", "gi");
	} else if (s.sunit[3].checked && s.langc[0].checked) {
		var theword = new RegExp("\\w*" + keyw + "\\w*", "gi");
	} else {
		var theword = new RegExp(keyw, "gi");
	}
	var leftc = [];
	var leftcc = [];
	var leftcc1 = [];
	var leftcc2 = [];
	var rightc = [];
	var rightcc = [];
	var rightcc1 = [];
	var rightcc2 = [];
	var concline = [];
	var frword = [];
	var wordline = [];
	var wordord = [];
	var kword = [];
	var skword;
	intex = intex.replace(/ +/g, " ");
	kword = intex.match(theword, "gi");
	i = 0;
	while ((skword = theword.exec(intex)) != null) {
		if (skword.index < cspan) {
			leftc[i] = intex.substr(0, skword.index);
		} else {
			leftc[i] = intex.substr(skword.index - cspan, cspan);
		}
		rightc[i] = intex.substr(skword.index + skword.toString().length, cspan);
		if (leftc[i].length < cspan) {
			var addspace = "";
			for (j = 1; j <= cspan - leftc[i].length; j++) {
				addspace += " "
			}
			leftc[i] = addspace + leftc[i]
		}
		leftcc[i] = leftc[i];
		rightcc[i] = rightc[i];
		wordline[0] = "";
		if (sorting1 != 4 && sorting2 != 4 && sorting3 != 4) {
			wordline[4] = "<font color=\"red\"><b>" + skword + "</b></font>";
		}
		var leftword = new Array;
		var leftblank = new Array;
		if (leftc[i].match(/(\w+)(\W+)(\w+)(\W+)(\w+)(\W+)$/) != null) {
			wordline[1] = RegExp.$1;
			wordline[2] = RegExp.$3;
			wordline[3] = RegExp.$5;
			leftblank[0] = RegExp.$2;
			leftblank[1] = RegExp.$4;
			leftblank[2] = RegExp.$6;
		} else if (leftc[i].match(/(\w+)(\W+)(\w+)(\W+)$/) != null) {
			wordline[1] = RegExp.$1;
			wordline[2] = RegExp.$3;
			leftblank[0] = RegExp.$2;
			leftblank[1] = RegExp.$4;
		} else if (leftc[i].match(/(\w+)(\W+)$/) != null) {
			wordline[1] = RegExp.$1;
			leftblank[0] = RegExp.$2;
		} else {
			wordline[0] = wordline[1] = wordline[2] = " "
		}
		var rightword = new Array;
		var rightblank = new Array;
		if (rightc[i].match(/(\w+)(\W+)(\w+)(\W+)(\w+)/) != null) {
			wordline[5] = RegExp.$1;
			wordline[6] = RegExp.$3;
			wordline[7] = RegExp.$5;
			rightblank[0] = RegExp.$2;
			rightblank[1] = RegExp.$4;
		} else if (rightc[i].match(/(\w+)(\W+)(\w+)/) != null) {
			wordline[5] = RegExp.$1;
			wordline[6] = RegExp.$3;
			rightblank[0] = RegExp.$2;
		} else if (rightc[i].match(/(\w+)/) != null) {
			wordline[5] = RegExp.$1;
		} else {
			rightword[0] = rightword[1] = rightword[2] = rightword[3] = "zzzzzz";
		}
		wordord[0] = wordline[sorting1];
		wordord[1] = wordline[sorting2];
		wordord[2] = wordline[sorting3];
		wordline[sorting1] = "<font color=\"blue\"><b>" + wordline[sorting1] + "</b></font>";
		wordline[sorting2] = "<font color=\"green\"><b>" + wordline[sorting2] + "</b></font>";
		wordline[sorting3] = "<font color=\"purple\"><b>" + wordline[sorting3] + "</b></font>";
		if (rightc[i].match(/(\w+)(\W+)(\w+)(\W+)(\w+)/) != null) {
			rightcc[i] = rightc[i].replace(/(\w+)(\W+)(\w+)(\W+)(\w+)/, wordline[5] + rightblank[0] + wordline[6] + rightblank[1] + wordline[7]);
		} else if (rightc[i].match(/(\w+)(\W+)(\w+)/) != null) {
			rightcc[i] = rightc[i].replace(/(\w+)(\W+)(\w+)/, wordline[5] + rightblank[0] + wordline[6]);
		} else if (rightc[i].match(/(\w+)/) != null) {
			rightcc[i] = rightc[i].replace(/(\w+)/, wordline[5]);
		} else {
			rightcc[i] = rightc[i];
		}
		if (leftc[i].match(/(\w+)(\W+)(\w+)(\W+)(\w+)(\W+)$/) != null) {
			leftcc[i] = leftc[i].replace(/(\w+)(\W+)(\w+)(\W+)(\w+)(\W+)$/, wordline[1] + leftblank[0] + wordline[2] + leftblank[1] + wordline[3] + leftblank[2]);
		} else if (leftc[i].match(/(\w+)(\W+)(\w+)(\W+)$/) != null) {
			leftcc[i] = leftc[i].replace(/(\w+)(\W+)(\w+)(\W+)$/, wordline[1] + leftblank[0] + wordline[2] + leftblank[1]);
		} else if (leftc[i].match(/(\w+)(\W+)$/) != null) {
			leftcc[i] = leftc[i].replace(/(\w+)(\W+)$/, wordline[1] + leftblank[0]);
		} else {
			leftcc[i] = leftc[i];
		}
		if (sorting1 == 0) {
			wordord[0] = skword;
			wordline[4] = "<font color=\"red\"><b>" + skword + "</b></font>"
		}
		if (sorting2 == 0) {
			wordord[1] = skword;
		}
		if (sorting3 == 0) {
			wordord[2] = skword;
		}
		frword[i] = wordord[0] + " " + wordord[1] + " " + wordord[2];
		concline[i] = new Array;
		if (leftcc[i].charAt(0) == " ") {
			leftcc[i] = leftcc[i].replace(/^(\ +)/, "");
			leftblanklength = "";
			for (var l = 0; l < RegExp.$1.length; l++) {
				leftblanklength += "&nbsp;";
			};
			leftcc[i] = leftblanklength + leftcc[i];
		}
		concline[i][0] = leftcc[i] + wordline[4] + rightcc[i] + "<br />\n";
		concline[i][1] = frword[i];
		i++;
	}
	if (sorting1 != 0) {
		concline.sort(function (a, b) {
				ac = a[1];
				bc = b[1];
				if (ac.toLowerCase() == bc.toLowerCase())
					return 0;
				return (ac.toLowerCase() > bc.toLowerCase()) ? 1 : -1;
			});
	}
	outputdata = "<b>" + concline.length + "</b> instances found<br /><br />\n";
	outputdata += '<table id = "example" cellpadding = "0" cellspacing = "0" border = "0" class = "display">\n';
	outputdata += '<thead><tr><th>ID</th><th>LEFT</th><th>KWIC</th><th>RIGHT</th></tr></thead>\n';
	outputdata += '<tbody>\n';
	if (n == 1 || s.langc[1].checked) {}
	
	for (i = 0; i < concline.length; i++) {
		outputdata += '<tr class = \"gradeA\">\n';
		outputdata += '<td></td>\n';
		outputdata += '<td>' + leftcc[i] + '</td>\n';
		outputdata += '<td>' + wordline[4] + '</td>\n';
		outputdata += '<td>' + rightcc[i] + '</td>\n';
		outputdata += '</tr>\n';
	}
	if (n == 1 || s.langc[1].checked) {
		outputdata += '</tbody>\n';
		outputdata += '</table>\n';
	}
	var end = new Date().getTime();
	var time = end - start;
	alert('Execution Time: ' + time + ' ms\nTotal KWIC Lines: ' + concline.length + '\n');
	document.getElementById('output').innerHTML = outputdata;
}
 