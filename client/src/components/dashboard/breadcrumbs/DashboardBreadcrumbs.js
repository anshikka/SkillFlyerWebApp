import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as LinkTo } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import DnsIcon from "@material-ui/icons/Dns";
import "./DashboardBreadcrumbs.css";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

class DashboardBreadcrumbs extends Component {
  render() {
    if (this.props.pageType === "subtopics") {
      return (
        <Container className="breadcrumb-container">
          <Breadcrumbs className="breadcrumb-root" aria-label="breadcrumb">
            <Link
              href={`/dashboard/`}
              className="breadcrumb-link"
              color="inherit"
            >
              <LinkTo to={{ pathname: `/dashboard/` }} />
              <DashboardIcon className="breadcrumb-icon" />
              Topics
            </Link>
            <Link
              className="breadcrumb-link"
              href={`/dashboard/${this.props.topicName}`}
              color="inherit"
            >
              <LinkTo
                to={{
                  pathname: `/dashboard/${this.props.topicName}`,
                  state: { topicId: this.props.topicId },
                }}
              />
              <BookIcon className="breadcrumb-icon" />
              {this.props.topicName}
            </Link>
          </Breadcrumbs>
        </Container>
      );
    } else if (this.props.pageType === "video") {
      return (
        <Container className="breadcrumb-container">
          <Breadcrumbs className="breadcrumbs-root" aria-label="breadcrumb">
            <Link
              href={`/dashboard/`}
              className="breadcrumb-link"
              color="inherit"
            >
              <LinkTo to={{ pathname: `/dashboard/` }} />
              <DashboardIcon className="breadcrumb-icon" />
              Topics
            </Link>
            <Link
              className="breadcrumb-link"
              href={`/dashboard/${this.props.topicName}`}
              color="inherit"
            >
              <LinkTo
                to={{
                  pathname: `/dashboard/${this.props.topicName}`,
                  state: { topicId: this.props.topicId },
                }}
              />
              <BookIcon className="breadcrumb-icon" />
              {this.props.topicName}
            </Link>
            <Link
              className="breadcrumb-link"
              href={`/dashboard/${this.props.topicName}/${this.props.subtopicName}`}
              color="inherit"
            >
              <LinkTo
                to={{
                  pathname: `/dashboard/${this.props.topicName}/${this.props.subtopicName}`,
                  state: {
                    topicId: this.props.topicId,
                    subtopicId: this.props.subtopicId,
                  },
                }}
              />
              <DnsIcon className="breadcrumb-icon" />
              {this.props.subtopicName}
            </Link>
          </Breadcrumbs>
        </Container>
      );
    } else {
      return (
        <Container className="breadcrumb-container">
          <Breadcrumbs className="breadcrumb-root" aria-label="breadcrumb">
            <Link
              href={`/dashboard/`}
              className="breadcrumb-link"
              color="inherit"
            >
              <LinkTo to={{ pathname: `/dashboard/` }} />
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
