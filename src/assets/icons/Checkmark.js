import * as React from 'react'

function SvgComponent(props) {
  return (
    <svg width={7.805} height={6.138} viewBox="0 0 7.805 6.138" {...props}>
      <path
        data-name="Path 1"
        d="M2.358 5.888a.53.53 0 01-.343-.147L.397 4.221a.474.474 0 010-.686.474.474 0 01.686 0l1.275 1.226L6.722.397a.474.474 0 01.686 0 .474.474 0 010 .686L2.701 5.741a.445.445 0 01-.343.147z"
        fill={props.fill}
        stroke={props.stoke}
        strokeWidth={0.5}
      />
    </svg>
  )
}

SvgComponent.defaultProps = {
  fill: '#FFFFFF',
  stroke: '#FFFFFF',
}

export default SvgComponent
