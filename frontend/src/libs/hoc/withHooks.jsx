import React from 'react';

export default function withHooks(hookMapper) {
  return function (WrappedComponent) {
    return function (props) {
      const hookData = hookMapper(props);

      return <WrappedComponent {...props} {...hookData} />;
    };
  };
}
