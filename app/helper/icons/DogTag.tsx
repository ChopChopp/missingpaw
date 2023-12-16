import * as React from "react"
import Svg, {Path} from "react-native-svg"

const DogTag = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 448 512"
        {...props}
    >
        <Path
            fill="#1E3050"
            d="M0 80v149.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0l133.5-133.5c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
        />
    </Svg>
)
export default DogTag
