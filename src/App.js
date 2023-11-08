import React, { Component } from 'react';
import './App.css';
import Messages from './Components/Messages';
import Input from './Components/Input';

function randomColor() {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			member: {
				username: '',
				color: randomColor(),
			},
		};

		this.openChatConnection();
	}

	openChatConnection = () => {
		fetch('https://random-data-api.com/api/v2/users?size=2&is_xml=true')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				const member = {
					username: data[0].first_name + ' ' + data[0].last_name,
					color: randomColor(),
					avatar: data[0].avatar,
				};
				this.drone = new window.Scaledrone('6BrgGdthScnd096P', {
					data: member,
				});
				this.drone.on('open', (error) => {
					if (error) {
						return console.error(error);
					}
					member.id = this.drone.clientId;
				});
				const room = this.drone.subscribe('observable-room');
				room.on('data', (data, member) => {
					const messages = this.state.messages;
					messages.push({ member, text: data });
					this.setState({ messages });
				});
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	};

	render() {
		return (
			<div className='App'>
				<div className='Header'>
					<h1>MAJA'S CHAT</h1>
				</div>
				<Messages
					messages={this.state.messages}
					currentMember={this.state.member}
				/>
				<Input onSendMessage={this.onSendMessage} />
			</div>
		);
	}

	onSendMessage = (message) => {
		console.log(message);
		this.drone.publish({
			room: 'observable-room',
			message,
		});
	};
}

export default App;
