// make sure error and submit button are not displayed
$('#error').css("display","none");
$('#submit').css("display","none");

//initalize what is necessary
var question_count = 0;
var qNum = 0;
var response;
var total;
var results = [0,0,0,0,0,0];
// each of the results, idx corresponds w/question idx
var resultText = ['Your fashion style is Casual <br/> You appreciate "comfort in style" looks. Comfortable outfits can easily be dressed up with statement jewelry and accessories. Style Cues: Simple shoes like slip-ons, sandals, or sneakers. Jeans, T-shirts, hoodies, loose or oversized pieces.', 'Your fashion style is Preppy <br/> You lean toward a more classic sense of style with a classy or academic twist. Even on a casual lunch date, you are a showstopper and attract the attention of everyone. Style Cues: Argyle, sweater vests, classic silhouettes, pleated skirts, peacoats, heels, loafers, berets, solid colors.', 'Your fashion style is Alternative <br/> You lean toward a more expressive and fun sense of style, which often links to a form of lifestyle that may represent beliefs or interests. Whether you identify with any of the alt labels, like goth or punk, or not is beside the point, as your style is just about expressing yourself. Style Cues: Lots of black, lace/velvet/leather, chains/pins/patches, bold makeup and hair, heavily customized, androgynous.', "Your fashion style is Sporty <br/> You most likely live an active lifestyle and dress to accommodate being constantly on the go. You might even choose clothing based on your favorite sports. For instance, if you're a tennis player, you may go for tennis skorts or dresses. Style Cues: Athletic sneakers, leggings, sports bras and tops, matching sets (i.e tracksuits), brand-centered including Nike, Adidas, and FILA."];
// each of the questions w/answer options
var questions = [
	["What range of SAT are you aiming for?",["below 1000<br/>", "1000-1200<br/>", "1200-1300<br/>", "1400-1500<br/>", "1500-1600<br/>", "no preference<br/>"]],
  	["What range of ACT are you aiming for?",["below 30<br/>", "30-31<br/>", "31-32<br/>", "33-34<br/>", "35-36<br/>", "no preference<br/>"]]
	["What region do you want to go to school in?",["North<br/>"," South <br/>", "East <br/>", "West<br/>"]], 
	["What percentage of men and woman do you prefer?",["All Women<br/>", "Mostly Women<br/>", "Even<br/>", "Mostly Men<br/>"]], 
	["How many schools do you want to apply to?",["less than 5<br/>", "5-10<br/>", "10-15<br/>", "15-20<br/>", "more than 20<br/>"]], 
	["What major category do you prefer?",["Education<br/>", "Engineering<br/>", "Biological Sciences<br/>", "Mathematics<br/>", "Physical Sciences<br/>", "Business Sciences and Administrative<br/>", "Services<br/>", "Law<br/>", "Dentistry<br/>", "Medicine<br/>"]],
	["How do you like to present yourself, or describe your personal style?",["Laidback<br/>", "Trendy or chic<br/>", "Edgy and fun<br/>", "Active<br/>"]]];


// create quiz in id=quiz div
// create separate divs labeled q0, q1, q2... until all questions have a div
// add radio buttons to each div
for(var j=0;j<questions.length;j++){
	$('#quiz').append('<div class="question" id="q' +j+ '"></div>');
	$('#q'+j).append('<div>'+ questions[j][0]+ '</div>');

	for(var i=0;i<4;i++){
	  $('#q'+j).append('<input type="radio" name="q'+j+ '" value="' + questions[j][1][i] +'">'+questions[j][1][i]);
	};
};

// click next question button
$('#next').on('click',next_question);

// make sure error is not displayed initally
// if no button is selected, reveal error and do not continue
// otherwise, increase question count and change which question is displayed
// if we are on the last question, reveal submit button
function next_question(){
	$('#error').css("display","none");
	if($("input[name='q"+qNum+"']").is(':checked') == false){
		$('#error').css("display","initial");
		$('#error').html("<br/>*Please select an option. </br>");
	} else {
		$('#q'+question_count).css("display","none");
		question_count++;
		$('#q'+question_count).css("display","initial");
		if(question_count==questions.length-1){
        	$('#next').css("display","none");
			$('#submit').css("display","initial");
			
		}
		qNum++;
	}
}

// when submit button is clicked
$('#submit').on('click',submit);

// check which answers were chosen and count them by index in the results array
function submit(){
	for(var i = 0; i < questions.length; i++){
		response = $("input[name='q"+i+"']:checked").val();
		for(var j = 0; j < question_count; j++){
			for(var c = 0; c < question_count; c++){
				if(response == questions[j][1][i]){
					results[i]++;
				}
			}
		}
		printAnswer();
	}
}

// hide the quiz and buttons and display the result in the answer div
function printAnswer(){
	$('#quiz').css("display","none");
	$('#submit').css("display","none");

	var idx = getMax();
	$('#answer').html(resultText[idx]);
}

// gets the maximum number in the results array
// if there are two with the same number of choices, it defaults to the one that was listed first
function getMax(){
	var max = results[0];
	var maxIdx = 0;
	for(var i = 0; i < results.length; i++){
		if(results[i] > max){
			max = results[i];
			maxIdx = i;
		}
	}
	return maxIdx;
}