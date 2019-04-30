/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
import addChannel from '../actions';

const mapStateToProps = (state) => {
  const { channels } = state;
  const { allIds, byId } = channels;
  return {
    channels: allIds.map(id => byId[id]),
  };
};

const actionCreators = {
  addChannel,
};

class ChannelsList extends React.Component {
  handleClick = id => (e) => {
    e.preventDefault();
    const { channels } = this.props;
    const current = channels.filter(item => item.id === id)[0];
    console.log(current); // eslint-disable-line
  }

  render() {
    const { channels } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="channels">
        <ul className="list-group">
          {channels.map(({ id, name }) => (
            <React.Fragment key={id}>
              <li className="list-group-item">
                <a href="#" onClick={this.handleClick(id)}>{name}</a>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsList);
