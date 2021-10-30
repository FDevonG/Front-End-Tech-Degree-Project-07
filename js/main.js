/*********************
MAIN JS
*********************/

/*************************
GRAPH VARIABLES
*************************/

const lineCanvas = document.querySelector('#line-graph').getContext('2d');
const barCanvas = document.querySelector('#bar-graph').getContext('2d');
const doughnutCanvas = document.querySelector('#doughnut-graph').getContext('2d');

let lineGraph;//this stores the line graph to be created for reference
let barGraph;//this stores the bar graph to be created for reference
let doughnutGraph;//this stores the doughnut graph to be created for reference

//the colors used in the graphs
const primaryColor = '#7477bf';
const primaryColorTransparent = 'rgba(116, 119, 191, 0.4)';
const secondaryColor = 'rgb(129,201,143)';
const thirdColor = 'rgb(116, 177, 191)';


const errorColor = '#ff7561';

/*************************
GENERAL GRAPH FUNCTIONS
*************************/

//this functions creates the graphs
function CreateGraph(type, data, canvas, option){
	const graph = new Chart(canvas, {
		type: type,
		data: data,
		options: option,
	});
	return graph;
}

//this destroys an existing graph so we may redraw a new one
function DestroyGraph(graph){
	graph.destroy();
}

/*************************
LINE GRAPH
*************************/

const hourlyLineGraphData = {
	labels: ['1-4', '4-8', '8-12', '12-16', '16-20', '20-24'],
	datasets:[{
		label:'Hourly visitors',
		data: ['33', '29', '37', '44', '32', '19'],
	}]
}

const dailyLineGraphData = {
	labels:['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
	datasets:[{
		label:'Daily Visitors',
		data: ['205', '195', '213', '224', '189', '177', '201'],
	}],
}

const weeklyLineGraphData = {
	labels:['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
	datasets:[{
		label:'Weekly Visitors',
		data:['1240', '1302', '1132', '1025', '1304', '1351', '1232'],
	}],
}

const monthlyLineGraphData = {
	labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	datasets:[{
		label:'Monthly Visitors',
		data:['15034', '11202', '14032', '15032', '12034', '11032', '14032', '14320', '14032', '13542', '15430', '12503'],
	}],
}

//this makes the initial call on the line graph to create the default
lineGraph = CreateGraph('line', hourlyLineGraphData, lineCanvas, GenerateGraphOptions('line'));

//adds a evvent listen on the line graph buttons container to change the line graph
document.querySelector('.graph__wrapper__buttons').addEventListener('click', (event) => {
	if(event.target.tagName === 'BUTTON'){
		let graphData;
		if(event.target.textContent.toLowerCase() === 'hourly'){
			graphData = hourlyLineGraphData;
		}
		if(event.target.textContent.toLowerCase() === 'daily'){
			graphData = dailyLineGraphData;
		}
		if(event.target.textContent.toLowerCase() === 'weekly'){
			graphData = weeklyLineGraphData;
		}
		if(event.target.textContent.toLowerCase() === 'monthly'){
			graphData = monthlyLineGraphData;
		}
		document.querySelector('.graph__wrapper__buttons__button--current').className = 'graph__wrapper__buttons__button';
		event.target.className = 'graph__wrapper__buttons__button--current';
		event.target.blur();
		DestroyGraph(lineGraph);
		lineGraph = CreateGraph('line', graphData, lineCanvas, GenerateGraphOptions('line'));
	}
});

function GenerateGraphOptions(type){
	
	let graphOptions = {
		
		responsive : true,
//		maintainAspectRatio: false,
		
		plugins: {

		}
	}

	if(type === 'line'){
		graphOptions.elements = {
			line : {
						backgroundColor : primaryColorTransparent,
						borderWidth : 1,
						borderColor : primaryColor,
						tension : .1,
						fill: true,
					},

			point : {
				radius : 6,
				borderWidth : 2,
				backgroundColor : '#fff',
				borderColor : primaryColor,
			},
		}
		graphOptions.plugins.legend = {display: false};
	}
	
	if(type === 'bar'){
		graphOptions.plugins.legend = {display : false};
	}
	
	if(type === 'doughnut'){
		graphOptions.plugins.legend = {align : 'center', position:'right'};
		graphOptions.elements = {arc : {borderWidth : 0}};
	}
	
	return graphOptions;
}


/*************************
BAR GRAPH
*************************/

const barGraphData = {
	labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	datasets:[{
		label:'Daily Traffic',
		data:['70', '105', '163', '144', '218', '197', '99'],
		backgroundColor:primaryColor,
	}],
}

barGraph = CreateGraph('bar', barGraphData, barCanvas, GenerateGraphOptions('bar'));

/*************************
DOUGHNUT GRAPH
*************************/

const doughnutGraphData = {
	labels:['Desktop', 'Tablet', 'Phone'],
	datasets:[{
		label:'Mobile Traffic',
		data:['1034', '854', '543'],
		backgroundColor:[
			primaryColor,
			secondaryColor,
			thirdColor,
		],
	}],
}

doughnutGraph = CreateGraph('doughnut', doughnutGraphData, doughnutCanvas, GenerateGraphOptions('doughnut'));


/*************************
SETTINGS
*************************/

const emailInput = document.querySelector('#email-notifications');
const emailOnText = document.querySelector('#email-text-on');
const emailOffText = document.querySelector('#email-text-off');
let email;

const profileInput = document.querySelector('#profile-public');
const profileOnText = document.querySelector('#profile-text-on');
const profileOffText = document.querySelector('#profile-text-off');
let profile;

const timezoneSelect = document.querySelector("#time-zone");
let timeZone;

buildSettings();

emailInput.addEventListener('change', () => {
	if(emailInput.checked){
		emailOffText.textContent = '';
		emailOnText.textContent = 'On';
	} else{
		emailOffText.textContent = 'Off';
		emailOnText.textContent = '';
	}
	emailInput.blur();
});

profileInput.addEventListener('change', () => {
	if(profileInput.checked){
		profileOffText.textContent = '';
		profileOnText.textContent = 'On';
	} else{
		profileOffText.textContent = 'Off';
		profileOnText.textContent = '';
	}
	profileInput.blur();
});

document.querySelector('.settings').addEventListener('click', (event) => {
	if(event.target.matches('#save-settings')){
		event.target.blur();
		localStorage.setItem('timezone', timezoneSelect.value);
		localStorage.setItem('profile', profileInput.checked);
		localStorage.setItem('email', emailInput.checked);
	} else if(event.target.matches('#clear-settings')){
		buildSettings();
		event.target.blur();
	}
});

//builds the settings upon page load
function buildSettings(){
	email = localStorage.getItem('email');
	profile = localStorage.getItem('profile');
	timeZone = localStorage.getItem('timezone');
	
	if(email === 'true'){
		emailInput.checked = true;
		emailOffText.textContent = '';
		emailOnText.textContent = 'On';
	} else {
		emailInput.checked = false;
		emailOffText.textContent = 'Off';
		emailOnText.textContent = '';
	}
	
	if(profile === 'true'){
		profileInput.checked = true;
		profileOffText.textContent = '';
		profileOnText.textContent = 'On';
	} else {
		profileInput.checked = false;
		profileOffText.textContent = 'Off';
		profileOnText.textContent = '';
	}
	
	if(timeZone !== '' && timeZone !== null){
		const options = timezoneSelect.children;
		for(let i = 0; i < options.length; i++){
			if (options[i].value.toLowerCase() === timeZone.toLowerCase()){
				options[i].selected = true;
				break;
			}
		}
	}
}


/*************************
Alert Box
*************************/

document.querySelector('#close-alert-box').addEventListener('click', () => {
	showNotificationPanel();
	removeNotificationCircle();
	document.querySelector('#alert-box').remove();
});

/*************************
NOTIFICATIONS
*************************/

document.querySelector('#notification-bell').addEventListener('click', () => {
	removeNotificationCircle();
	if(document.querySelector('#alert-box')){
		document.querySelector('#alert-box').remove();
	}
	
	document.querySelector('#notification-bell').blur();
	if(document.querySelector('.dropdown').style.height === ''){
		showNotificationPanel();
	} else {
		removeNotificationStyles();
	}
});

window.onclick = (event) => {
	if(!event.target.matches('svg') && !event.target.matches('#alert-box') && !event.target.matches('#close-alert-box')){
		if(document.querySelector('.dropdown').style.height === 'auto'){
			removeNotificationStyles();
		}
	}
}

function removeNotificationCircle(){
	if(document.querySelector('.user__notification__circle'))
		document.querySelector('.user__notification__circle').remove();
}

function showNotificationPanel(){
	document.querySelector('.dropdown').style.width = '200px';
	document.querySelector('.dropdown').style.height = 'auto';
	document.querySelector('.dropdown__content').style.display = 'block';
}

function removeNotificationStyles(){
	document.querySelector('.dropdown').style.removeProperty('width');
	document.querySelector('.dropdown').style.removeProperty('height');
	document.querySelector('.dropdown__content').style.removeProperty('display');
}

/*************************
MESSAGES
*************************/

const users = [
	'Victoria Chambers',
	'Dale Byrd',
	'Dawn Wood',
	'Dan Oliver',
];

//used to find the user
const searchInput = document.querySelector('.message__form__input');
//used to display the results of the search
const searchResults = document.querySelector('.search-results');
//used to store the user message
const message = document.querySelector('.message__form__textarea');

changeResultsWidth();

searchResults.parentNode.addEventListener('resize', () =>{
	changeResultsWidth();
})

//this resizes the search results to the same size as the input 
function changeResultsWidth(){
	searchResults.setAttribute('style', 'width:' + searchResults.parentNode.offsetWidth.toString() + 'px');
}

searchInput.addEventListener('keyup', () => {
	let input = searchInput.value.toLowerCase();
	let results = [];
	if(input.length){
		results = users.filter((item) => {
			return item.toLowerCase().includes(input);
		})
	}
	if(showSearchResults(results) !== null) {
		searchResults.innerHTML = showSearchResults(results);
	} else{
		searchResults.innerHTML = '';
	}
});

//filters and returns a string to be displayed with the matching names
function showSearchResults(results){
	if(results.length){
		let content = results.map((item) => {
			return `<li>${item}</li>`
		}).join('');
		return `<ul>${content}</ul>`;
	}else {
		return null;
	}
}

document.querySelector('.message').addEventListener('click', (event) => {
	if(event.target.tagName === 'LI'){
		searchInput.value = event.target.textContent;
		searchResults.innerHTML = '';
	} else if(event.target.id === 'message-button'){
		sendMessage();
		event.target.blur();
	}
})

function sendMessage(){
	if(searchInput.value === ''){
		searchInput.setAttribute('style', `border: 1px solid ${errorColor}`);
		searchInput.setAttribute('style', `background-color: ${errorColor}`);
		searchInput.setAttribute('placeholder', 'Please select user!');
		if(message.value === ''){
			message.setAttribute('style', `border: 1px solid ${errorColor}`);
			message.setAttribute('style', `background-color: ${errorColor}`);
			message.setAttribute('placeholder', 'Please enter a message!');
		}
	} else if(searchInput.value !== '' && message.value !== ''){
		searchInput.value = '';
		message.value = '';
	}
}

searchInput.addEventListener('focus', () => {
	searchInput.removeAttribute('style');
})

message.addEventListener('focus', () => {
	message.removeAttribute('style');
});






