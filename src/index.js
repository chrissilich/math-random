import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';


class MathRandom extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleRandomize = this.handleRandomize.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleMultChange = this.handleMultChange.bind(this);
		this.handleAddChange = this.handleAddChange.bind(this);
		this.state = {
			items: [],
			randoms: [], 
			addNumber: 0,
			multNumber: 1,
		};
	}

	render() {
		return (
			<div>
				<h1>Math.random() Visualizer</h1>
				<form onSubmit={this.handleSubmit}>
					<p>Add to Math.random() to move the range up. This number is sort of like a minimum.</p>
					<input onChange={this.handleAddChange} value={this.state.addNumber} />
					<p>Multiply by Math.random() to expand the range.</p>
					<input onChange={this.handleMultChange} value={this.state.multNumber} />
					<button onClick={this.handleRandomize}>Generate ten new random numbers!</button>
					<button onClick={this.handleClear}>Clear!</button>
				</form>
				<Code addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
				<NumberLine items={this.state.randoms} addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
				<EquationList items={this.state.randoms} addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
			</div>
		);
	}

	handleRandomize(e) {
		e.preventDefault();
		this.setState({randoms: this.state.randoms.concat([
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random(),
		])});
	}
	handleClear(e) {
		e.preventDefault();
		this.setState({randoms: []});
	}
	handleMultChange(e) {
		console.log("new mutliplier:", e.target.value);
		this.setState({multNumber: e.target.value});
	}
	handleAddChange(e) {
		this.setState({addNumber: e.target.value});
	}
}




class Code extends React.Component {
	render() {
		return (
			<h2>
				{this.props.addNumber} + Math.random() * {this.props.multNumber}
			</h2>
		);
	}
}




class EquationList extends React.Component {
	render() {
		return (
			<ul className="equations">
				{this.props.items.map(item => (
					<li>
						<span class="add">{this.props.addNumber} + </span>
						<span class="rand">{item}  * </span>
						<span class="mult">{this.props.multNumber} = </span>
						<span class="total">{parseFloat(this.props.addNumber) + parseFloat(item) * parseFloat(this.props.multNumber)}</span>
					</li>
				))}
			</ul>
		);
	}
}


class NumberLine extends React.Component {
	render() {

		var min = parseFloat(this.props.addNumber),
			max = min + parseFloat(this.props.multNumber),
			range = max - min,
			mid = min + range / 2,
			// fullRange = range * 2,
			fullMin = min - range / 2,
			fullMax = max + range / 2;

		console.log(min, max, range, fullMin, fullMax);

		return (
			<ul className="numberline" data-add={this.props.addNumber}  data-mult={this.props.multNumber}>
				<div className="marker full-min"><span>{fullMin}</span></div>
				<div className="marker min"><span>{min}</span></div>
				<div className="marker mid"><span>{mid}</span></div>
				<div className="marker max"><span>{max}</span></div>
				<div className="marker full-max"><span>{fullMax}</span></div>
				{this.props.items.map(item => {
					//console.log("test");
					var total = parseFloat(this.props.addNumber) + parseFloat(item) * parseFloat(this.props.multNumber);
					//console.log(total, range);
					const style = {
						left: (25 + ((total - min) / range) * 50) + "%"
					}
					return (
						<li style={style} data-total={(parseFloat(this.props.addNumber) + parseFloat(item) * parseFloat(this.props.multNumber))}>
							<span>{parseFloat(this.props.addNumber) + parseFloat(item) * parseFloat(this.props.multNumber) }</span>
						</li>
					)
				})}
			</ul>
		);


	}
}




ReactDOM.render(<MathRandom />, document.querySelector("#root"));