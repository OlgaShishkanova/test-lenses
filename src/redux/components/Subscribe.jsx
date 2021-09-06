import React from "react";
import { connect } from "react-redux";

import classnames from "classnames";
import { actions } from "../actions";
import Button from "./Button";
import connectToWebsocket from "../services/websocket";

class Subscribe extends React.Component {
  constructor(props) {
    super(props);

    this.onSqlChange = this.onSqlChange.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);
    this.onClearMessages = this.onClearMessages.bind(this);

    this.state = {
      sql: "",
    };
  }

  onSqlChange(event) {
    this.setState({ sql: event.target.value });
  }

  onSubscribe() {
    connectToWebsocket({
      path: "/api/ws/v2/sql/execute",
      stats: 2,
      sql: this.state.sql,
      live: false,
      messagesLimit: 10000,
      getOnMessage: (parsedData) => {
          this.props.messageReceived(parsedData.data);
      },
    });
  }

  onClearMessages() {
    this.props.clearMessages();
  }

  onUnsubscribe(topic) {}

  render() {
    const { messages } = this.props;
    const { sql } = this.state;

    const btnStyle = classnames("button is-small is-info");

    return (
      <nav className="ws-subscribe panel">
        <div className="panel-heading">
          <div className="field has-addons">
            <p className="control is-expanded">
              <textarea
                rows="3"
                className="textarea is-small is-info"
                placeholder="SQLS"
                value={sql}
                onChange={this.onSqlChange}
              />
            </p>
          </div>
        </div>
        <div className="panel-block">
          <div className="control">
            <Button
              style={{ marginRight: "10px" }}
              onClick={this.onSubscribe}
              className={btnStyle}
              disabled={!this.state.sql}
            >
              Subscribe
            </Button>
            <Button
              onClick={this.onClearMessages}
              className="button is-small is-danger"
            >
              Clear Messages
            </Button>
          </div>
        </div>
        <div className="panel-block">
          <div className="control">Number of messages: {messages.length}</div>
        </div>
      </nav>
    );
  }
}

Subscribe.defaultProps = {};

Subscribe.propTypes = {};

const mapStateToProps = (state) => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
