import React, { useState, useEffect } from 'react';
import { omit } from 'lodash';
import PropTypes from 'prop-types';

import Loading from '../loading';

function Page(props) {
  const [component, setComponent] = useState(null);
  const { load } = props;
  const otherProps = omit(props, ['load']);

  useEffect(() => {
    load((component) => {
      setComponent(component);
    });
  }, []);

  return (
    (component)
      ? <component.default { ...otherProps } />
      : <Loading />
  );
}

Page.propTypes = {
  load: PropTypes.func.isRequired // used to load bundle
};

export default Page;
