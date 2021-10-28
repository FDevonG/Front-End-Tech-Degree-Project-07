/*********************
MAIN JS
*********************/

/*************************
VARIABLES
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
//		maintainAspectRatio: true,
		plugins: {

		}
	}

	if(type === 'line'){
		graphOptions.elements = {
			line : {
						backgroundColor : primaryColorTransparent,
						borderWidth : 1,
						borderColor : primaryColor,
						tension : 0,
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

const email = localStorage.getItem('email');

if(email === 'on'){
	emailInput.checked = true;
	emailOffText.textContent = '';
	emailOnText.textContent = 'On';
} else {
	emailInput.checked = false;
	emailOffText.textContent = 'Off';
	emailOnText.textContent = '';
}

emailInput.addEventListener('change', () => {
	if(emailInput.checked){
		localStorage.setItem('email', 'on');
		emailOffText.textContent = '';
		emailOnText.textContent = 'On';
	} else{
		localStorage.setItem('email', 'off');
		emailOffText.textContent = 'Off';
		emailOnText.textContent = '';
	}
	emailInput.blur();
});

const profileInput = document.querySelector('#profile-public');
const profileOnText = document.querySelector('#profile-text-on');
const profileOffText = document.querySelector('#profile-text-off');

const profile = localStorage.getItem('profile');

if(profile === 'on'){
	profileInput.checked = true;
	profileOffText.textContent = '';
	profileOnText.textContent = 'On';
} else {
	profileInput.checked = false;
	profileOffText.textContent = 'Off';
	profileOnText.textContent = '';
}

profileInput.addEventListener('change', () => {
	if(profileInput.checked){
		localStorage.setItem('profile', 'on');
		profileOffText.textContent = '';
		profileOnText.textContent = 'On';
	} else{
		localStorage.setItem('profile', 'off');
		profileOffText.textContent = 'Off';
		profileOnText.textContent = '';
	}
	profileInput.blur();
});


/*************************
NOTIFICATIONS
*************************/

document.querySelector('#close-alert-box').addEventListener('click', () => {
	document.querySelector('#alert-box').remove();
	document.querySelector('.notifcation-circle').remove();
});





