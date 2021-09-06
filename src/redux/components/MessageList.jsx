import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { actions } from "../actions";
import ListItemDetails from "./ListItemDetails";

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.onShowRowDetails = this.onShowRowDetails.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);

    this.state = {
      message: undefined,
    };
  }

  // with this functionality the scroll is not user-friendly. 
  // It's hard to scroll it up (while messages are loading) 
  // and the user just is seeing the changing messages on the bottom of the list quite a long time
  // so I commented it out
  // componentDidUpdate() {
  //   if (!this.state.message) {
  //     this.list.scrollToRow(this.props.messages.length);
  //   }
  // }

  onShowRowDetails = (d) => {
    this.setState({ message: d });
  };

  rowRenderer =
    (messages) =>
    ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }) => {
      return (
        <div
          key={key}
          style={style}
          className="message-row"
          onClick={this.onShowRowDetails.bind(this, messages[index])}
        >
          <MessageListItem label="Key:" value={messages[index].key} />
          <MessageListItem label="Value:" value={messages[index].value} />
        </div>
      );
    };

  render() {
    const { messages, onCommitMessage } = this.props;
    const { onShowRowDetails } = this;
    const { message } = this.state;

    return (
      <div>
        <ListItemDetails
          message={message}
          onCommitMessage={onCommitMessage}
          onShowRowDetails={onShowRowDetails}
        />
        <nav className="panel">
          <div className="panel-block">
            <AutoSizer className="autosizer-bulma-fix">
              {({ height, width, disableHeight = true }) => (
                <List
                  ref={(list) => {
                    this.list = list;
                  }}
                  width={width}
                  height={290}
                  rowCount={messages.length}
                  rowHeight={120}
                  rowRenderer={this.rowRenderer(messages)}
                />
              )}
            </AutoSizer>
          </div>
        </nav>
      </div>
    );
  }
}

class MessageListItem extends React.Component {
  render() {
    return (
      <div className="message-row__item">
        <div className="message-row__label">{this.props.label}</div>
        {JSON.stringify(this.props.value)}
      </div>
    );
  }
}

MessageList.defaultProps = {};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  message: PropTypes.object,
};

const mapDispatchToProps = {
  ...actions,
};

export default connect(null, mapDispatchToProps)(MessageList);
