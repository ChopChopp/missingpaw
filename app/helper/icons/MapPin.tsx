import * as React from "react"
import Svg, {Path} from "react-native-svg"

const MapPin = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={10}
        height={16}
        viewBox="0 0 320 512"
        {...props}
    >
        <Path
            fill="#1E3050"
            d="M16 144a144 144 0 1 1 288 0 144 144 0 1 1-288 0zm144-64c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96 0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zm-32 400V317.1a177.984 177.984 0 0 0 64 0V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"
        />
    </Svg>
)
export default MapPin
