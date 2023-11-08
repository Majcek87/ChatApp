import { Component } from 'react';
import React from 'react';

class Messages extends Component {
	render() {
		const { messages } = this.props;
		return (
			<ul className='MsgWrapper2'>
				{messages.map((m) => this.renderMessage(m))}
			</ul>
		);
	}

	renderMessage(message) {
		const { member, text } = message;
		const { currentMember } = this.props;
		const messageFromMe = member.id === currentMember.id;
		const className = messageFromMe
			? 'Messages-message currentMember'
			: 'Messages-message';
		return (
			<li
				className={className}
				style={{ backgroundColor: member.clientData.color }}
			>
				<img style={{ width: 70 }} src={member.clientData.avatar} alt='User' />
				<div className='MsgContainer'>
					<div className='User'>{member.clientData.username}</div>
					<div className='MsgContent'>{text}</div>
				</div>
			</li>
		);
	}
}

export default Messages;
