import { Component } from 'react';
import React from 'react';

class Input extends Component {
	state = {
		text: '',
	};

	onChange(e) {
		this.setState({ text: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ text: '' });
		this.props.onSendMessage(this.state.text);
	}

	render() {
		return (
			<div className='Input'>
				<form className='Input-container' onSubmit={(e) => this.onSubmit(e)}>
					<input
						className='Input-field'
						onChange={(e) => this.onChange(e)}
						value={this.state.text}
						type='text'
						placeholder='Write something'
						autofocus='true'
					/>
					<button className='Send-button'>SEND</button>
				</form>
			</div>
		);
	}
}

export default Input;
