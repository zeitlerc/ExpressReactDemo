import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class LaunchResult extends Component {
    render() {
      const {mission_name, launch_success, launch_date_utc, rocket, links, details} = this.props;
      let video;
      if(links.video_link){
        video = <a href={links.video_link} target="_blank">View the launch</a> ;
      }
      return (
        <div className="row border justify-content-center launchResult">
          <img className="col-auto missionPatch" src={links.mission_patch_small} />
          <div className="col-10">
            <h5>{mission_name}</h5>
            <div className="missionDetails">
              <div>Launch {launch_success ? "successful" : "failed"} at {new Date(launch_date_utc).toLocaleString("en-us")}</div>
              <div>Rocket {rocket.rocket_name} ({rocket.rocket_type})</div>
              <ResponsiveEllipsis maxLine='2' text={details || ''} />
              {video}
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default LaunchResult;