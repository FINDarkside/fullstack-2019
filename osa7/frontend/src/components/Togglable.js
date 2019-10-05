import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  useImperativeHandle(ref, () => {
    return { setVisible };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="button is-link" onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}  className="button">cancel</button>
      </div>
    </div >
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
