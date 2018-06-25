import { h, app } from "hyperapp"

function calculate(exercise){
    var result = 0, i = 0;
    var parseExercise= exercise.match(/[+-]*(\d+)/g) || [];
    while(i < parseExercise.length){
    		result += parseInt(parseExercise[i]);
    		i++;
    }
    return result;
}

function getAct(exercise){
	return (['+','-'].indexOf(exercise.slice(-1)) > -1) ? exercise.slice(-1) : '';
}

const state = {
	exercise: '0',
 	result: false,
 	act: ''
}

const actions = {
	equals: value => state => {
		if(state.result) return '';
		const toCalc = state.exercise;
		if(['+', '-'].indexOf(toCalc.slice(-1)) > -1)
			toCalc = state.exercise.slice(0, -1);
		state.result = true;
		return state.exercise = state.exercise + "=" + calculate(toCalc);
	},
	addNum: value => state => {
		if(state.result){
			state.result = false;
			state.act = '';
			var newExercise = state.exercise.split("=")[1];
			return state.exercise = newExercise + value;
			return newExercise == '0' ? state.exercise = value : state.exercise = state.exercise + value;
		}
		state.act = '';
		return state.exercise = "" + state.exercise + value;
	},
	updateState: value => state => {
		if(state.result){
			state.act = value;
			state.result = false;
			return state.exercise = state.exercise.split('=')[1] + value;
		}
		switch(state.act){
			case '+':
			case '-':
				return state.exercise = state.exercise.slice(0,-1) + value;
				break;
			default:
				state.act = value;
				return state.exercise = state.exercise + value; 
		}
	},
	rmv: value => state => { 
		if(state.exercise.length == 1) {
			return state.exercise = '0';
		}
		var newExercise = (state.result?state.exercise.split('=')[0]:state.exercise.slice(0, -1));
		state.result = false;
		state.act = getAct(newExercise.trim());
		return state.exercise = newExercise;
	},
	clear: value => state => {
		state.result = false;
		state.act = '';
		return state.exercise = '0';
	}
}

const view = (state, actions) =>
  h("div", { id: "main" }, [
    h("h1", {}, state.exercise),
    h("button", { onclick: () => actions.addNum(1) }, "1"),
    h("button", { onclick: () => actions.addNum(2) }, "2"),
    h("button", { onclick: () => actions.addNum(3) }, "3"),
    h("button", { onclick: () => actions.addNum(4) }, "4"),
    h("button", { onclick: () => actions.addNum(5) }, "5"),
    h("button", { onclick: () => actions.addNum(6) }, "6"),
    h("button", { onclick: () => actions.addNum(7) }, "7"),
    h("button", { onclick: () => actions.addNum(8) }, "8"),
    h("button", { onclick: () => actions.addNum(9) }, "9"),
    h("button", { onclick: () => actions.addNum(0) }, "0"),
    h("button", { onclick: () => actions.updateState("-") }, "-"),
    h("button", { onclick: () => actions.updateState("+") }, "+"),
    h("button", { onclick: () => actions.equals('=') }, "="),
    h("button", { onclick: () => actions.rmv('-') }, "<-"),
    h("button", { onclick: () => actions.clear('c') }, "Clear")
  ]);

app(state, actions, view, document.body);