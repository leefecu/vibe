import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    samplePlaylists: PropTypes.array,
    fetchPlaylistsPending: PropTypes.bool,
  };

  render() {
    return (
      <div className={"vibePlaylists" + (this.props.fetchPlaylistsPending ? ' loading' : '')}>
        {!this.props.fetchPlaylistsPending &&
          <ul>
            {this.props.samplePlaylists && this.props.samplePlaylists.map(p => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        }
      </div>
    );
  }

  componentDidMount() {
    // fetch data from server
    this.props.actions.fetchPlaylists('test param');
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    samplePlaylists: state.playlists.samplePlaylists,
    fetchPlaylistsPending: state.playlists.fetchPlaylistsPending,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
