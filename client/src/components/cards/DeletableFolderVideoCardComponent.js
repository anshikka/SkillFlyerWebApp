import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const Container = styled.div`
  border-radius: 8px;
  font-family: FontAwesome, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  background-color: ${(props) => props.bgColor};
  background-image: ${(props) =>
    `linear-gradient(${props.overlayColor}, ${props.overlayColor}), url(${props.bgPhoto})`};
  background-repeat: no-repeat;
  background-size: 100%;
  padding-bottom: 2vh;
  margin-bottom: 1vh;
  padding-left: 1vw;
  padding-top: 0.75vh;
  padding-right: 0.5vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
`;

const RankContainer = styled.div`
  background-color: ${(props) => props.bgColor};
  font-size: 0.75vw;
  font-weight: 500;
  text-transform: uppercase;
  width: 20%;
  border-radius: 100px;
  text-align: center;
  color: ${(props) => props.tagColor};
`;

const Content = styled.div`
  width: 100%;
  display: inline;
  justify-content: space-between;
  align-items: center;
`;

const WatchButton = styled.span`
  cursor: pointer;
  padding: 1vh 1vw;
  border-radius: 25px;
  width: 25%;
  z-index: 9;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
`;

const WatchButtonText = styled.span`
  font-weight: 500;
  font-size: 1vw;
`;

const Title = styled.span`
  display: block;
  font-size: 1.3vw;
  font-weight: 700;
  margin-bottom: 1.5vh;
  padding-bottom: 2.5vh;
  color: ${(props) => props.color};
  height: 12vh;
  overflow-y: auto;
`;

const PreTitle = styled.span`
  font-size: small;
  color: ${(props) => props.color};
`;

var DeletableVideoCardComponent = ({
  preTitle,
  preTitleColor = "white",
  title,
  topicName,
  subtopicName,
  videoId,
  folderId,
  subtopicId,
  titleColor = "white",
  overlayColor = "rgba(46, 49, 49, 0.8)",
  watchButton,
  watchButtonColor = "white",
  watchButtonBg = "red",
  rank,
  remove,
  rankColor = "#1F2126",
  rankBg = "white",
  bgPhoto,
  bgColor = "#DBE0E6",
}) => (
  <Container bgPhoto={bgPhoto} bgColor={bgColor} overlayColor={overlayColor}>
    {rank && (
      <RankContainer
        onClick={(e) => remove(videoId, folderId)}
        bgColor={rankBg}
        color={rankColor}
      >
        <i>
          <DeleteOutlineIcon />
        </i>
      </RankContainer>
    )}
    {(preTitle || title) && (
      <Content>
        <span>
          {preTitle && <PreTitle color={preTitleColor}>{preTitle}</PreTitle>}
          {title && <Title color={titleColor}>{title}</Title>}
        </span>
        {watchButton && (
          <Link
            to={{
              pathname: `/dashboard/${topicName}/${subtopicName}/videos/${videoId}`,
              state: { subtopicId: subtopicId },
            }}
          >
            <WatchButton bgColor={watchButtonBg} color={watchButtonColor}>
              <WatchButtonText>{watchButton}</WatchButtonText>
            </WatchButton>
          </Link>
        )}
      </Content>
    )}
  </Container>
);

DeletableVideoCardComponent.propTypes = {
  preTitle: PropTypes.string,
  preTitleColor: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  overlayColor: PropTypes.string,
  cta: PropTypes.string,
  ctaColor: PropTypes.string,
  ctaBg: PropTypes.string,
  tag: PropTypes.string,
  tagColor: PropTypes.string,
  tagBg: PropTypes.string,
  bgPhoto: PropTypes.string,
  bgColor: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default DeletableVideoCardComponent;
