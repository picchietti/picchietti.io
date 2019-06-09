import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Point from './point';
import './index.scss';

function Timeline(props) {
  const maxShown = props.maxShown;
  const shownDifference = props.points.length - maxShown;

  const mapPoints = (points) => {
    return points.map((point, i) => (
      <Point key={i} {...point} />
    ));
  };

  const initialPoints = mapPoints(props.points.slice(0, maxShown));

  const [showingMore, setShowingMore] = useState(false);
  const [points, setPoints] = useState(initialPoints);

  const handleToggle = () => {
    const pointObjs = props.points.slice(0, (showingMore) ? maxShown : undefined);

    setShowingMore(!showingMore);
    setPoints(mapPoints(pointObjs));
  };

  return (
    <div>
      <div styleName="timeline">
        <div>
          {points}
        </div>
      </div>

      <button onClick={handleToggle}>
        ({shownDifference}) {showingMore ? 'Less' : 'More'}
      </button>
    </div>
  );
}

Timeline.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxShown: PropTypes.number
};

Timeline.defaultProps = {
  maxShown: 3
};

export default Timeline;
