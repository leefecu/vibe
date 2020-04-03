import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';

import * as actions from './redux/actions';

import 'react-tabs/style/react-tabs.css';
export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    modalIsOpen: false,
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  render() {
    const { modalIsOpen } = this.state
    return (
      <div className="home-default-page">
        <header className="app-header">
          <img src={reactLogo} className="app-logo" alt="logo" />
          <img src={rekitLogo} className="rekit-logo" alt="logo" />
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <div className="app-intro">
          <h3>To get started:</h3>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <Tabs>
              <TabList>
                <Tab>Content</Tab>
                <Tab>Location</Tab>
                <Tab>Link</Tab>
              </TabList>

              <TabPanel>
                <div>Content</div>
              </TabPanel>
              <TabPanel>
                <div>Location</div>
              </TabPanel>
              <TabPanel>
                <div>Link</div>
              </TabPanel>
            </Tabs>
          </Modal>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
