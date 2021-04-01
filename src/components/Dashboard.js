import React from 'react';
import { connect } from 'react-redux';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="temp-content">
        <h1>Hi, it's me Dashborad</h1>
        <p>More contents and features will be added in the future</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(Dashboard);
