import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import DnsIcon from "@material-ui/icons/Dns";
import "./DashboardBreadcrumbs.css";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container"

class DashboardBreadcrumbs extends Component {
  render() {
    if (this.props.pageType === "subtopics") {
      return (
        <Container className = "breadcrumb-container">
        <Breadcrumbs className = "breadcrumb-root" aria-label="breadcrumb">
          <Link className="breadcrumb-link" href={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Topics
          </Link>
          <Link
            className="breadcrumb-link"
            href={`/dashboard/${this.props.topicName}`}
            color="inherit"
          >
            <BookIcon className="breadcrumb-icon" />
            {this.props.topicName}
          </Link>
        </Breadcrumbs>
        </Container>
      );
    } else if (this.props.pageType === "video") {
      return (
        <Container className = "breadcrumb-container">
        <Breadcrumbs className = "breadcrumbs-root" aria-label="breadcrumb">
          <Link className="breadcrumb-link" href={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Topics
          </Link>
          <Link
            className="breadcrumb-link"
            href={`/dashboard/${this.props.topicName}`}
            color="inherit"
          >
            <BookIcon className="breadcrumb-icon" />
            {this.props.topicName}
          </Link>
          <Link
            className="breadcrumb-link"
            href={`/dashboard/${this.props.topicName}/${this.props.subtopicName}`}
            color="inherit"
          >
            <DnsIcon className="breadcrumb-icon" />
            {this.props.subtopicName}
          </Link>
        </Breadcrumbs>
        </Container>
      );
    } else {
      return (
        <Container className = "breadcrumb-container">
        <Breadcrumbs className = "breadcrumb-root" aria-label="breadcrumb">
          <Link className="breadcrumb-link" href={`/dashboard/`} color="inherit">
            <DashboardIcon className="breadcrumb-icon" />
            Topics
          </Link>
        </Breadcrumbs>
        </Container>
      );
    }
  }
}
DashboardBreadcrumbs.propTypes = {
  pageType: PropTypes.string.isRequired,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
};
export default DashboardBreadcrumbs;
