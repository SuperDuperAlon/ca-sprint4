import zIndex from "@mui/material/styles/zIndex"
import { useState } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import Carousel from "react-material-ui-carousel"

export function ImgCarousel({ imgs }) {

    const [imgIdx, setImgIdx] = useState(0)

    function prevImg(ev) {
        ev.stopPropagation()
        const isFirstImg = imgIdx === 0
        const newIdx = isFirstImg ? imgs.length - 1 : imgIdx - 1
        setImgIdx(newIdx)
    }
    function nextImg(ev) {
        ev.stopPropagation()
        const isLastImg = imgIdx === imgs.length - 1
        const newIdx = isLastImg ? 0 : imgIdx + 1
        setImgIdx(newIdx)
    }

    return (<div className="img-container">
        <Carousel className="carousel" show={1.5} autoPlay={false} navButtonsAlwaysVisible={false} animation="slide" cycleNavigation={false} navButtonsProps={{ 
        className : 'nav-btn',
    }} indicatorContainerProps={{
        className :'indicators',
    }} indicatorIconButtonProps={{
        className : 'indicator',
    }}
    activeIndicatorIconButtonProps={{className :'active'}} >
            {imgs.map((img, index) => <img className="stay-img" src={require(`../assets/img/${img}.jpg`)} key={index} />
            )}
        </Carousel>
    </div>)
}
