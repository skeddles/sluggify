/** @module slugify*/

var letters = {
	'a': 'áàâǎăãảȧạäåḁāąⱥȁấầẫẩậắằẵẳặǻǡǟȁȃａ',
	'A': 'ÁÀÂǍĂÃẢȦẠÄÅḀĀĄȺȀẤẦẪẨẬẮẰẴẲẶǺǠǞȀȂＡ',
	'b': 'ḃḅḇƀᵬᶀｂ',
	'B': 'ḂḄḆɃƁʙＢ',
	'c': 'ćĉčċçḉȼɕｃƇ',
	'C': 'ĆĈČĊÇḈȻＣƈ',
	'd': 'ďḋḑḍḓḏđɗƌｄᵭᶁᶑȡ',
	'D': 'ĎḊḐḌḒḎĐƉƊƋＤᴅᶑȡ',
	'e': 'éèêḙěĕẽḛẻėëēȩęɇȅếềễểḝḗḕȇẹệｅᶒⱸ',
	'E': 'ÉÈÊḘĚĔẼḚẺĖËĒȨĘɆȄẾỀỄỂḜḖḔȆẸỆＥᴇ',
	'f': 'ḟƒｆᵮᶂ',
	'F': 'ḞƑＦ',
	'g': 'ǵğĝǧġģḡǥɠｇᶃ',
	'G': 'ǴĞĜǦĠĢḠǤƓＧɢ',
	'h': 'ĥȟḧḣḩḥḫ̱ẖħⱨｈ',
	'H': 'ĤȞḦḢḨḤḪĦⱧＨʜ',
	'i': 'íìĭîǐïḯĩįīỉȉȋịḭɨiıｉ',
	'I': 'ÍÌĬÎǏÏḮĨĮĪỈȈȊỊḬƗİIＩ',
	'j': 'ĵɉｊʝɟʄǰ',
	'J': 'ĴɈＪᴊ',
	'k': 'ḱǩķḳḵƙⱪꝁｋᶄ',
	'K': 'ḰǨĶḲḴƘⱩꝀＫᴋ',
	'l': 'ĺľļḷḹḽḻłŀƚⱡɫｌɬᶅɭȴ',
	'L': 'ĹĽĻḶḸḼḺŁĿȽⱠⱢＬʟ',
	'm': 'ḿṁṃɱｍᵯᶆ',
	'M': 'ḾṀṂⱮＭᴍ',
	'n': 'ńǹňñṅņṇṋṉɲƞｎŋᵰᶇɳȵ',
	'N': 'ŃǸŇÑṄŅṆṊṈṉƝȠＮŊɴ',
	'o': 'óòŏôốồỗổǒöȫőõṍṏȭȯȱøǿǫǭōṓṑỏȍȏơớờỡởợọộɵｏⱺᴏ',
	'O': 'ÓÒŎÔỐỒỖỔǑÖȪŐÕṌṎȬȮȰØǾǪǬŌṒṐỎȌȎƠỚỜỠỞỢỌỘƟＯ',
	'p': 'ṕṗᵽƥｐᵱᶈᴘ',
	'P': 'ṔṖⱣƤＰ',
	'q': 'ɋʠｑ',
	'Q': 'ɊＱ',
	'r': 'ŕřṙŗȑȓṛṝṟɍɽｒᵲᶉɼɾᵳ',
	'R': 'ŔŘṘŖȐȒṚṜṞɌⱤＲʀ',
	's': 'śṥŝšṧṡşṣṩșｓßẛᵴᶊʂȿſ',
	'S': 'ŚṤŜŠṦṠŞṢṨȘＳẞ',
	't': 'ťṫţṭțṱṯŧⱦƭʈｔẗᵵƫȶ',
	'T': 'ŤṪŢṬȚṰṮŦȾƬƮＴᴛ',
	'u': 'úùŭûǔůüǘǜǚǖűũṹųūṻủȕȗưứừữửựụṳṷṵʉᶙ',
	'U': 'ÚÙŬÛǓŮÜǗǛǙǕŰŨṸŲŪṺỦȔȖƯỨỪỮỬỰỤṲṶṴɄ',
	'v': 'ṽṿʋｖⱱⱴᴠᶌ',
	'V': 'ṼṾƲＶ',
	'w': 'ẃẁŵẅẇẉⱳｗẘ',
	'W': 'ẂẀŴẄẆẈⱲＷ',
	'x': 'ẍẋｘᶍ',
	'X': 'ẌẊＸ',
	'y': 'ýỳŷÿỹẏȳỷỵɏƴｙẙ',
	'Y': 'ÝỲŶŸỸẎȲỶỴɎƳＹʏ',
	'z': 'źẑžżẓẕƶȥⱬｚᵶᶎʐʑɀᴢ',
	'Z': 'ŹẐŽŻẒẔƵȤⱫＺ',
};

function lookup (m) { return translate[m] || m; }

//a string of every character we want to replace
var matchCharacters = '';

//create an object to hold all translations
var translate = {};
Object.keys(letters).forEach(l => {
	//add all the letters variations to the string
	matchCharacters += letters[l];

	//loop through each char in the set
	for (var i=0; i<letters[l].length; i++) {
		translate[ letters[l][i] ] = l;
	}
});

var accentRegex = new RegExp('[' + matchCharacters + ']', 'g');

/**Generates a slug with only lowercase letters and dashes, from any text string.
 * @param {string} text - the unformatted text
*/
function slugify (text) {
  return String(text)
		.toLowerCase()					//make all lowercase
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/\//g, '-')            // Replace slashes with -
        .replace(accentRegex, lookup)	//replace accented letters with normal
        .replace(/[^a-z0-9-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = slugify;