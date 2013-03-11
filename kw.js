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

var sw = ["a", "about", "above", "across", "after", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "among", "an", "and", "another", "any", "anybody", "anyone", "anything", "anywhere", "are", "area", "areas", "around", "as", "ask", "asked", "asking", "asks", "at", "away", "b", "back", "backed", "backing", "backs", "be", "became", "because", "become", "becomes", "been", "before", "began", "behind", "being", "beings", "best", "better", "between", "big", "both", "but", "by", "c", "came", "can", "cannot", "case", "cases", "certain", "certainly", "clear", "clearly", "come", "could", "d", "did", "differ", "different", "differently", "do", "does", "done", "down", "down", "downed", "downing", "downs", "during", "e", "each", "early", "either", "end", "ended", "ending", "ends", "enough", "even", "evenly", "ever", "every", "everybody", "everyone", "everything", "everywhere", "f", "face", "faces", "fact", "facts", "far", "felt", "few", "find", "finds", "first", "for", "four", "from", "full", "fully", "further", "furthered", "furthering", "furthers", "g", "gave", "general", "generally", "get", "gets", "give", "given", "gives", "go", "going", "good", "goods", "got", "great", "greater", "greatest", "group", "grouped", "grouping", "groups", "h", "had", "has", "have", "having", "he", "her", "here", "herself", "high", "high", "high", "higher", "highest", "him", "himself", "his", "how", "however", "i", "if", "important", "in", "interest", "interested", "interesting", "interests", "into", "is", "it", "its", "itself", "j", "just", "k", "keep", "keeps", "kind", "knew", "know", "known", "knows", "l", "large", "largely", "last", "later", "latest", "least", "less", "let", "lets", "like", "likely", "long", "longer", "longest", "m", "made", "make", "making", "man", "many", "may", "me", "member", "members", "men", "might", "more", "most", "mostly", "mr", "mrs", "much", "must", "my", "myself", "n", "necessary", "need", "needed", "needing", "needs", "never", "new", "new", "newer", "newest", "next", "no", "nobody", "non", "noone", "not", "nothing", "now", "nowhere", "number", "numbers", "o", "of", "off", "often", "old", "older", "oldest", "on", "once", "one", "only", "open", "opened", "opening", "opens", "or", "order", "ordered", "ordering", "orders", "other", "others", "our", "out", "over", "p", "part", "parted", "parting", "parts", "per", "perhaps", "place", "places", "point", "pointed", "pointing", "points", "possible", "present", "presented", "presenting", "presents", "problem", "problems", "put", "puts", "q", "quite", "r", "rather", "really", "right", "right", "room", "rooms", "s", "said", "same", "saw", "say", "says", "second", "seconds", "see", "seem", "seemed", "seeming", "seems", "sees", "several", "shall", "she", "should", "show", "showed", "showing", "shows", "side", "sides", "since", "small", "smaller", "smallest", "so", "some", "somebody", "someone", "something", "somewhere", "state", "states", "still", "still", "such", "sure", "t", "take", "taken", "than", "that", "the", "their", "them", "then", "there", "therefore", "these", "they", "thing", "things", "think", "thinks", "this", "those", "though", "thought", "thoughts", "three", "through", "thus", "to", "today", "together", "too", "took", "toward", "turn", "turned", "turning", "turns", "two", "u", "under", "until", "up", "upon", "us", "use", "used", "uses", "v", "very", "w", "want", "wanted", "wanting", "wants", "was", "way", "ways", "we", "well", "wells", "went", "were", "what", "when", "where", "whether", "which", "while", "who", "whole", "whose", "why", "will", "with", "within", "without", "work", "worked", "working", "works", "would", "x", "y", "year", "years", "yet", "you", "young", "younger", "youngest", "your", "yours", "z"];

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