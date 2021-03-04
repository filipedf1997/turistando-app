import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function Waves(props) {
  const svgMarkup = `<svg width="360" height="116" viewBox="0 0 360 116" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M444.94 54.1456C164.995 71.6766 179.429 10.5791 -118.426 78.7995C-129.336 81.3171 -138.942 118.712 -128.467 118.068C151.816 100.66 135.354 166.7 416.024 117.914C428.479 115.734 461.45 53.1017 444.94 54.1456Z" fill="#055CA4"/>
  <g opacity="0.79">
  <path opacity="0.79" d="M359.758 125.549C170.489 151.059 180.795 74.901 -9.23798 55.6889C-15.6907 55.0512 -16.547 22.4729 -9.91077 21.6226C186.239 -3.75443 180.795 36.9817 361.991 70.4368C378.382 73.5458 369.82 124.167 359.758 125.549Z" fill="#2790E7"/>
  </g>
  <path d="M377.966 113.888C399.497 107.107 448.4 39.1682 431.222 35.9968C258.691 4.17164 225.202 76.2032 14.152 144.78C-77.1529 175.454 68.187 189.742 140.432 205.628C227.237 224.674 263.004 150.615 377.966 113.888Z" fill="#79BAEF" fill-opacity="0.53"/>
  </svg>
  `
  const WavesSVG = () => <SvgXml xml={svgMarkup} {...props} />

  return <WavesSVG />
}
