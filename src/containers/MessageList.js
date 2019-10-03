import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchMessages, removeMessage} from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
    // use componentDidMount for loading dynamic message data
    componentWillMount(){
        // use fetch messages to make a get request to the back end to retrieve all the messages in the DB
        // available as props from mapDispatchToProps
        this.props.fetchMessages();
    }
    
    render(){
        // get all the messages from the redux state, available from mapStateToProps
        const {messages, removeMessage, currentUser} = this.props;
        // for each of the messages in the redux state, create a messageItem component
        // with a key of the ID coming from the generated ID from mongoDB
        // date prop - createAt, coming from timeStamps: true, in the mongoose message model
        // and other data
        
        let messageList = messages.map(m => 
            <MessageItem key={m._id}  
            date={m.createAt} 
            text={m.text}
            username={m.user.userName} 
            profileImageUrl={m.user.profileImageUrl}
            // remove message being passed as a prop to be used as an on click
            // bound to each specific component & uses user id & message id
            // in order to use this, you must import it from the file & pass in to mapDispatchToProps
            removeMessage={removeMessage.bind(this, m.user._id, m._id)}
            // is correct user, used to display messages only to the owners of that message
            isCorrectUser={currentUser === m.user._id}
            />
        )

        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10 ">
                    <ul className="list-group" id="message">
                      {messageList}
                    </ul>
                </div>
            </div>
        )
    }
}

// make messages held in state available as props
function mapStateToProps(state){
    return {
        messages: state.messages,
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);
