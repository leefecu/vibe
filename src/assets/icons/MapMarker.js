import React from "react"

function SvgComponent(props) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 10 14" {...props}>
      <path
        fill={props.fill}
        d="M4.897 14l.504-.589c.427-.505.83-1.02 1.212-1.548a32.187 32.187 0 001.464-2.17c.516-.876.92-1.689 1.211-2.44.337-.887.505-1.672.505-2.356 0-.898-.218-1.722-.656-2.474A4.939 4.939 0 007.37.656 4.829 4.829 0 004.897 0c-.898 0-1.722.219-2.474.656A4.939 4.939 0 00.656 2.423 4.829 4.829 0 000 4.897c0 .684.168 1.47.505 2.355.291.752.695 1.565 1.211 2.44.427.696.915 1.42 1.464 2.171a26.21 26.21 0 001.212 1.548l.505.589zm0-7.37c-.483 0-.892-.168-1.229-.505a1.672 1.672 0 01-.505-1.228 1.768 1.768 0 01.867-1.514c.264-.158.553-.236.867-.236a1.748 1.748 0 011.75 1.75c0 .314-.079.603-.236.866a1.768 1.768 0 01-1.514.867z"
      />
    </svg>
  )
}

SvgComponent.defaultProps = {
  fill: '#A0A0A0',
  width: 10,
  height: 14,
}

export default SvgComponent