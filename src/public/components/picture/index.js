import React from 'react';
import PropTypes from 'prop-types';

function Picture(props) {
  const { src, alt } = props;

  const sources = [
    <source srcSet={ src.replace('.png', '.webp') } type="image/webp" key="webp" />,
    <source srcSet={ src } type="image/png" key="png" />
  ];

  process.env.NODE_ENV === 'development' && sources.reverse();

  return (
    <picture>
      { sources }
      <img src={ src } alt={ alt } />
    </picture>
  );
}

Picture.propTypes = {
  // path to image file
  src: PropTypes.string.isRequired,
  // alternative text if img does not load and for accessibility
  alt: PropTypes.string.isRequired
};

export default Picture;
