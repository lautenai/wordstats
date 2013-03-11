function keywords(n) {
    var s = document.main;
    var ltype = s.wltype;
    var ktype = s.kytype;
    var tokniz = s.tok;
    var lfreq = s.listfreq.value;
    var outputdata = "";
    var intex = s.textin.value.toLowerCase();
    document.getElementById('output').innerHTML = "";
    if (intex == "") {
        alert("Please provide text in the CORPUS field!");
        return;
    }
    var start = new Date().getTime();
    intex = intex.replace(/\n/g, " ");
    intex = intex.replace(/\r/g, "");
    intex = intex.replace(/  /g, " ");
    intex = removeHTMLTags(intex);
    if (s.numdeal.checked) {
        intex = intex.replace(/\d+.\d+/g, "00");
    }
    if (tokniz[0].checked) {
        intex = intex.replace(/n\'t/gi, " n\'t");
        intex = intex.replace(/it\'s/gi, "it \'s");
        intex = intex.replace(/that\'s/gi, "that \'s");
        intex = intex.replace(/i\'m/gi, "i \'m");
        intex = intex.replace(/he\'s/gi, "he \'s");
        intex = intex.replace(/she\'s/gi, "she \'s");
        intex = intex.replace(/.\'re/gi, ". \'re");
        intex = intex.replace(/.\'d/gi, ". \'d");
        intex = intex.replace(/.\'ll/gi, ". \'ll");
        intex = intex.replace(/.\'ve/gi, ". \'ve");
        intex = intex.replace(/there\'s/gi, "there \'s");
        intex = intex.replace(/cannot/gi, "can not");
    }
    var words = [];
    var lword = [];
    var wcount = [];
    var wpt = [];
    var wtag = [];
    var fline = [];
    var fwline = [];
    var llline = [];
    var x2line = [];
    var yx2line = [];
    var rcwline = [];
    var freqorder = [];
    var neworder = [];
    var wordering = [];

    var stop_words = 1;

    if (n == 0) {
        if (ktype[0].checked) {
            var kw = words = intex.match(/\b[A-Za-z1-9_]+\b/gi);
        }
        else if (ktype[1].checked) {
            var kw = words = intex.match(/\b\S+\b/gi);
        }
        else if (ktype[2].checked) {
            var kw = words = intex.match(/\b[a-z\u00C0-\u00ffA-Z]+\b/gi);
        }
    }
    else if (n == 1) {
        intex = intex.replace(/\s+/g, "");
        var kw = words = intex.match(/./gi);
    }
    if (s.numdeal.checked) {
        wordering = new Array;
        for (i = 0; i < words.length; i++) {
            words[i] = words[i].replace(/\d+/g, "#");
            if (words[i] != null && words[i] != "") {
                if (wordering[words[i]] > 0) {
                    wordering[words[i]]++;
                }
                else {
                    wordering[words[i]] = 1;
                }
            }
        }
    }
    else {
        wordering = new Array;
        for (i = 0; i < words.length; i++) {
            if (words[i] != null && words[i] != "") {
                if (wordering[words[i]] > 0) {
                    wordering[words[i]]++;
                }
                else {
                    wordering[words[i]] = 1;
                }
            }
        }
    }
    var tor = new Array;
    ii = 0;
    for (i in wordering) {
        tor[ii] = new Array;
        tor[ii][0] = wordering[i];
        tor[ii][1] = i.replace(/\b_/, "");
        ii++;
    }
    if (ltype[1].checked) {
        tor.sort(function (a, b) {
            var ac = a[0];
            var bc = b[0];
            var ad = a[1];
            var bd = b[1];
            if (ac == bc && ad > bd) return 0;
            return (ac < bc) ? 1 : -1;
        });
    }
    else if (ltype[0].checked) {
        tor.sort(function (a, b) {
            var ad = a[1];
            var bd = b[1];
            if (ad == bd) return 0;
            return (ad > bd) ? 1 : -1;
        });
    }
    var totaltoken = words.length;
    if (ltype[0].checked) {
        for (k = 0; k < tor.length; k++) {
            var wordlist_word_freq = parseInt(tor[k][0]);
            var wordlist_total_words = parseInt(totaltoken);
            var ref_corpus_word_freq = parseInt(_swf(tor[k][1]));
            var ref_corpus_total_words = parseInt(totaltokenrefcorpus);
            x2line[k] = x2(wordlist_word_freq, wordlist_total_words, ref_corpus_word_freq, ref_corpus_total_words);
            yx2line[k] = yx2(wordlist_word_freq, wordlist_total_words, ref_corpus_word_freq, ref_corpus_total_words);
            fline[k] = "<td>" + (k + 1) + "</td><td>" + tor[k][1] + "</td>\n<td>" + tor[k][0] + "</td>\n<td>" + _swf(tor[k][1]) + "</td>\n<td>" + x2line[k] + "</td>\n<td>" + yx2line[k] + "</td>\n<td>" + llline[k] + "</td>\n";
        }
    }
    else if (ltype[1].checked) {
        for (k = 0; k < tor.length; k++) {
            if (tor[k][0] < lfreq) {
                break;
            }

            if (stop_words === 1 ) {
	            //remove stop words
	            for (var i = 0; i < sw.length; i++) {
	                if (sw[i] === tor[k][1]) {
	                    delete tor[k][1];
	                }
	            }
            }
            if (tor[k][1] != null) {
                var wordlist_word_freq = parseInt(tor[k][0]);
                var wordlist_total_words = parseInt(totaltoken);
                var ref_corpus_word_freq = parseInt(_swf(tor[k][1]));
                var ref_corpus_total_words = parseInt(totaltokenrefcorpus);

                wtag[k] = pos_tagger(tor[k][1]);

                x2line[k] = _x2(wordlist_word_freq, wordlist_total_words, ref_corpus_word_freq, ref_corpus_total_words);
                yx2line[k] = _yx2(wordlist_word_freq, wordlist_total_words, ref_corpus_word_freq, ref_corpus_total_words);
                llline[k] = _ll(wordlist_word_freq, wordlist_total_words, ref_corpus_word_freq, ref_corpus_total_words);
                fline[k] = "<td>" + (k + 1) + "</td><td>" + tor[k][1] + "</td>\n<td>" + wtag[k] + "</td>\n<td>" + tor[k][0] + "</td>\n<td>" + _swf(tor[k][1]) + "</td>\n<td>" + x2line[k] + "</td>\n<td>" + yx2line[k] + "</td>\n<td>" + llline[k] + "</td>\n";
            }
        }
    }
    outputdata = "<p><b>Total Token</b>: " + words.length + " <b>Total Word Types</b>: " + tor.length + " <b>Ref Total</b>:" + totaltokenrefcorpus + "\n";
    outputdata += "<table id=\"example\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\">\n";
    outputdata += "<thead><tr><th>ID</th><th>Word</th><th>POS</th><th>Frequency</th><th>Frequency RC</th><th>Pearson Uncorrected</th><th>Yates Corrected</th><th>Log-likelihood Ratio</th></tr></thead>\n";
    outputdata += "<tbody>\n";
    for (k in fline) {
        if (yx2line[k] >= 3.8) {
            outputdata += "<tr class=\"gradeA\">\n";
        }
        else {
            outputdata += "<tr>\n";
        }
        outputdata += fline[k];
        outputdata += "</tr>\n";
    }
    outputdata += "</tbody>\n";
    outputdata += "</table>\n";
    var end = new Date().getTime();
    var time = end - start;
    alert('Execution Time: ' + time + ' ms\nTotal Word Types: ' + tor.length + '\nTotal Token: ' + words.length + '\nTotal RC Token: ' + totaltokenrefcorpus);
    outputdata += 'Execution Time: ' + time + 'ms\nTotal Token: ' + words.length + '\nTotal RC Token: ' + totaltokenrefcorpus + '\n';
    document.getElementById('output').innerHTML = outputdata;
    //run();
}

var sw = ["about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function _swf(palavra) {
    for (var i = 0; i < palavras.length; i++) {
        if (palavras[i] == palavra) {
            return frequencias[i];
        }
    }
    return 0;
}

function _x2(a, b, c, d) {
    x2 = ((Math.pow(a - (b * (a + c)) / (b + d), 2)) / ((b * (a + c)) / (b + d))) + ((Math.pow(c - ((d * (a + c)) / (b + d)), 2)) / ((d * (a + c)) / (b + d)));
    return x2;
}

function _yx2(a, b, c, d) {
    yx2 = ((Math.pow((a - (b * (a + c)) / (b + d) - 0.5), 2)) / ((b * (a + c)) / (b + d))) + ((Math.pow((c - ((d * (a + c)) / (b + d)) - 0.5), 2)) / ((d * (a + c)) / (b + d)));
    return yx2;
}

function _ll(a, b, c, d) {
    var ca;
    var cc;
    if (a != 0) {
        ca = a * Math.log(a);
    }
    else {
        ca = 0;
    }
    if (c != 0) {
        cc = c * Math.log(c);
    }
    else {
        cc = 0;
    }
    ll = 2 * (ca + b * Math.log(b) + cc + d * Math.log(d) - (a + b) * Math.log(a + b) - (a + c) * Math.log(a + c) - (b + d) * Math.log(b + d) - (c + d) * Math.log(c + d) + (a + b + c + d) * Math.log(a + b + c + d));
    return ll;
}

function pos_tagger(palavra) {
	var word = new Lexer().lex(palavra);
	var taggedWords = new POSTagger().tag(word);
	for (i in taggedWords) {
		var taggedWord = taggedWords[i];
		var word = taggedWord[0];
		var tag = taggedWord[1];
		return tag;
	}	
}

function run () {
	console.log(sw.sort());
}