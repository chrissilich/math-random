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
		this.instructionsPrev = this.instructionsPrev.bind(this);
		this.instructionsNext = this.instructionsNext.bind(this);
		this.state = {
			step: 1,
			randoms: [], 
			addNumber: 0,
			multNumber: 1,
		};
		this.handleRandomize();
	}

	render() {
		return (
			<div className={"step"+this.state.step}>
				<h1>Math.random() Visualizer</h1>
				<Instructions step={this.state.step} prev={this.instructionsPrev} next={this.instructionsNext} />
				
				<form onSubmit={this.handleSubmit}>
					<Code addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
					<p className="colourable sometimes-hidden step2 step4">
						Added number: <input id="addNumber" onChange={this.handleAddChange} value={this.state.addNumber} />
					</p>
					<p className="colourable sometimes-hidden step3 step4">
						Multiplier: <input onChange={this.handleMultChange} value={this.state.multNumber} />
					</p>
					<button className="button button-more" onClick={this.handleRandomize}>Generate ten more random numbers!</button>
					<button className="button button-clear" onClick={this.handleClear}>Clear!</button>
				</form>
				<div className="clearfix"></div>
				<NumberLine items={this.state.randoms} addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
				<EquationList items={this.state.randoms} addNumber={this.state.addNumber} multNumber={this.state.multNumber} />
			</div>
		);
	}

	handleRandomize(e) {
		try {e.preventDefault();} catch(e) {}
		for (var i = 0; i < 1000; i += 100) {
			setTimeout(function(that) { 
				that.setState({randoms: that.state.randoms.concat([Math.random()])}); 
			}, i, this);
		};		
	}

	handleClear(e) {
		try {e.preventDefault();} catch(e) {}
		this.setState({randoms: []});
	}
	handleMultChange(e) {
		this.setState({multNumber: e.target.value});
		// this.handleClear();
		// this.handleRandomize();
	}
	handleAddChange(e) {
		this.setState({addNumber: e.target.value});
		// this.handleClear();
		// this.handleRandomize();
	}
	instructionsPrev(e) {
		e.preventDefault();
		this.setState({addNumber: 0, multNumber: 1});
		this.setState({step: this.state.step-1});
	}
	instructionsNext(e) {
		e.preventDefault();
		this.setState({addNumber: 0, multNumber: 1});
		this.setState({step: this.state.step+1});
	}
}



class Instructions extends React.Component {
	render() {
		const prev = (
			<button className="button button-back" onClick={this.props.prev}>&lt; Back</button>
		);
		const next = (
			<button className="button button-next" onClick={this.props.next}>Next &gt;</button>
		);
		
		if (this.props.step === 1) {

			return (
				<div className="instructions">
					<h2>
						1. Introduction
					</h2>
					<p>
						<pre>Math</pre> is a class in Javascript full of useful methods that help with math related things.
					</p>
					<p>
						<pre>random</pre> is a method of the <pre>Math</pre> class for generating random numbers.
					</p>
					<p>
						So <pre>Math.random()</pre> generates a random number between 0 and 1. That's all it does.
					</p>
					{next}
				</div>
			);
		} else if (this.props.step === 2) {
			return (
				<div className="instructions">
					<h2>
						2. What about not starting at zero?
					</h2>
					<p>Add to <pre>Math.random()</pre> to move the range up. This number is sort of like a minimum.</p>
					{prev}
					{next}
				</div>
			);			
		} else if (this.props.step === 3) {
			return (
				<div className="instructions">
					<h2>
						3. What about a bigger range?
					</h2>
					<p>Multiply <pre>Math.random()</pre> by another number to increase the range.</p>
					{prev}
					{next}
				</div>
			);			
		} else if (this.props.step === 4) {
			return (
				<div className="instructions">
					<h2>
						4. Put it all together.
					</h2>
					<p>
						Use the added number to set the minimum, and the multiplied number to set the range of the randomly generated numbers.
					</p>
					<p>
						Together, they should allow you to request a random number in any range you want.
					</p>
					{prev}
				</div>
			);			
		}
		return (
			<div className="instructions"></div>
		);
	}
}




class Code extends React.Component {
	render() {
		return (
			<h2>
				<span className="colourable sometimes-hidden step2 step4">{this.props.addNumber} + </span> Math.random() <span className="sometimes-hidden step3 step4"> * {this.props.multNumber}</span>
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
						<span className="colourable sometimes-hidden step2">{this.props.addNumber} + </span>
						<span> {item} </span>
						<span className="colourable sometimes-hidden step3"> * {this.props.multNumber}</span>
						<span className="sometimes-hidden step2 step3 step4"> = {parseFloat(this.props.addNumber) + parseFloat(item) * parseFloat(this.props.multNumber)}</span>
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