import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LocationForm from './forms/LocationForm/LocationForm'

import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import EditIcon from '../../assets/icons/Edit';
import LinkIcon from '../../assets/icons/Link';
import MapMarker from '../../assets/icons/MapMarker';

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

  componentDidMount() {
    // fetch data from server
    this.props.actions.fetchLocations();
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  render() {
    const {
      locationData: {
        latitude,
        longitude,
        useLatLng,
        locations,
      },
    } = this.props;
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
              <TabList className="tab-list">
                <Tab className="tab" selectedClassName="selected-tab">
                  <EditIcon width={24} height={24} />
                </Tab>
                <Tab className="tab" selectedClassName="selected-tab">
                  <MapMarker fill="white" width={15} height={21} />
                </Tab>
                <Tab className="tab" selectedClassName="selected-tab">
                  <LinkIcon width={24} height={24} />
                </Tab>
              </TabList>

              <TabPanel>
                <div>Content</div>
              </TabPanel>
              <TabPanel>
                <LocationForm
                  latitude={latitude}
                  longitude={longitude}
                  useLatLng={useLatLng}
                  locationOptions={locations}
                />
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
    locationData: state.home.locationData,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
