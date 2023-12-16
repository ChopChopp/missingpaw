import * as React from "react"
import Svg, {Path} from "react-native-svg"

const ArrowRight = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 448 512"
        {...props}
    >
        <Path
            fill="#000"
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        />
    </Svg>
)
export default ArrowRight