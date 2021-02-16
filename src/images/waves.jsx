import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function Waves(props) {
  const svgMarkup = `<svg width="360" height="110" viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0)">
  <g opacity="0.79">
  <path opacity="0.79" d="M363.753 123.403C170.278 148.476 180.813 73.6207 -13.4433 54.737C-20.0394 54.1101 -20.9147 22.0888 -14.1311 21.253C186.377 -3.69026 180.813 36.3495 366.035 69.2328C382.791 72.2886 374.038 122.044 363.753 123.403Z" fill="#F15A24"/>
  </g>
  <g clip-path="url(#clip1)">
  <path d="M436.274 53.1491C150.108 70.3804 164.863 10.3273 -139.611 77.3816C-150.763 79.8562 -160.583 116.612 -149.875 115.979C136.637 98.8679 119.809 163.78 406.715 115.828C419.447 113.685 453.151 52.1231 436.274 53.1491Z" fill="#FFA500" fill-opacity="0.7"/>
  </g>
  <path d="M382.365 111.941C404.375 105.276 454.364 38.4987 436.804 35.3815C260.44 4.10034 226.207 74.9006 10.4665 142.305C-82.8674 172.455 65.7023 186.498 139.553 202.113C228.287 220.834 264.849 148.04 382.365 111.941Z" fill="#E7651D" fill-opacity="0.5"/>
  </g>
  <defs>
  <clipPath id="clip0">
  <rect width="368" height="115" fill="white" transform="translate(-4)"/>
  </clipPath>
  <clipPath id="clip1">
  <rect width="421.781" height="80.7447" fill="white" transform="translate(-18.3981 34.2553)"/>
  </clipPath>
  </defs>
  </svg>
  `
  const WavesSVG = () => <SvgXml xml={svgMarkup} {...props} />

  return <WavesSVG />
}
