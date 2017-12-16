import React from 'react';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';

import Point from './point';

import './index.scss';

export default class Timeline extends React.Component {
  static propTypes = {
    points: PropTypes.array.isRequired // array of objects that will be used as timeline point props
  }

  constructor(props) {
    super(props);

    this.maxShown = 3;
    this.shownDifference = props.points.length - this.maxShown;

    var initialPoints = this.mapPoints(props.points.slice(0, this.maxShown));

    this.state = {
      showingMore: false,
      points: initialPoints
    }

    bindAll(this, ['handleToggle']);
  }

  handleToggle() {
    this.setState(prevState => {
      var point_objs = this.props.points.slice(0, (prevState.showingMore) ? this.maxShown : undefined);

      return {
        showingMore: !prevState.showingMore,
        points: this.mapPoints(point_objs)
      };
    });
  }

  mapPoints(points) {
    return points.map((point, i) => (
      <Point key={i} {...point} />
    ));
  }

  render() {
    return (
      <div>
        <div className="timeline">
          <div className="points">
            {this.state.points}
          </div>
        </div>

        <div className="alignc">
          <button onClick={this.handleToggle}>({this.shownDifference}) {this.state.showingMore ? 'Less' : 'More'}</button>
        </div>
      </div>
    );
  }
}
