import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import DnsIcon from "@material-ui/icons/Dns";
import "./DashboardBreadcrumbs.css";

class DashboardBreadcrumbs extends Component {
  componentDidMount() {
    this.topicName = this.props.match.params.topicName;
    this.subtopicName = this.props.match.params.subtopicName;
    this.videoId = this.props.match.params.videoId;
  }
  render() {
    if (this.topicName !== "" && this.subtopicName !== "") {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="breadcrumb-link" to={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Dashboard
          </Link>
          <Link
            className="breadcrumb-link"
            to={`/dashboard/${this.topicName}`}
            color="inherit"
          >
            <BookIcon className="breadcrumb-icon" />
            {this.topicName}
          </Link>
        </Breadcrumbs>
      );
    } else if (
      this.topicName !== "" &&
      this.subtopicName !== "" &&
      this.videoId !== ""
    ) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="breadcrumb-link" to={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Dashboard
          </Link>
          <Link
            className="breadcrumb-link"
            to={`/dashboard/${this.topicName}`}
            color="inherit"
          >
            <BookIcon className="breadcrumb-icon" />
            {this.topicName}
          </Link>
          <Link
            className="breadcrumb-link"
            to={`/dashboard/${this.topicName}/${this.subtopicName}`}
            color="inherit"
          >
            <DnsIcon className="breadcrumb-icon" />
            {this.subtopicName}
          </Link>
        </Breadcrumbs>
      );
    } else {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="breadcrumb-link" to={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Dashboard
          </Link>
        </Breadcrumbs>
      );
    }
  }
}
export default DashboardBreadcrumbs;
