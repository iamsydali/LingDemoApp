import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}
function SortIcon({size = 50, color = '#000'}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 18V6m0 0l4 4.125M16 6l-4 4.125M8 6v12m0 0l4-4.125M8 18l-4-4.125"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SortIcon;
