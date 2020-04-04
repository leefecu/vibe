import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 32 32" {...props}>
      <title>{'icon 136 document edit'}</title>
      <path
        d="M26.443 12.15l-11.286 11.3-2.606-2.606L23.844 9.551l2.6 2.6zm.707-.707l1.73-1.731c.39-.39.386-1.025-.006-1.416l-1.18-1.177a1.001 1.001 0 00-1.416-.003L24.55 8.843l2.599 2.6zM11.904 21.61l-.64 3.113 3.135-.618-2.495-2.495zM22 10l-6-7H5.003A2.005 2.005 0 003 5.007v22.986A2 2 0 004.997 30h15.006A1.999 1.999 0 0022 28.01V18l7.58-7.58a2.003 2.003 0 00.01-2.83l-1.18-1.18a1.994 1.994 0 00-2.83.01L22 10zm-1 9v9.007A.997.997 0 0120 29H5c-.545 0-1-.446-1-.995V4.995c0-.54.446-.995.996-.995H15v4.994c0 1.12.894 2.006 1.998 2.006H21L11 21l-1 5 5-1 6-6zM16 4.5v4.491c0 .557.45 1.009.997 1.009H20.7L16 4.5z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  );
}

SvgComponent.defaultProps = {
  fill: '#FFFFFF',
  height: 32,
  width: 32,
}

export default SvgComponent;
