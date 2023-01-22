import zIndex from "@mui/material/styles/zIndex";
import { useState } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Carousel from "react-material-ui-carousel";

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
        {/* <img className="stay-img" src={require(`../assets/img/${imgs[imgIdx]}.jpg`)}/>
        <div className="flex space-between">
        {imgIdx !== 0 && <div className="arrows left" onClick={(ev)=>prevImg(ev)}>{"<"}</div>}
        {imgIdx !== imgs.length - 1 && <div className="arrows right" onClick={(ev)=>nextImg(ev)}>{">"}</div>}
        </div>
        <div className="dots flex">
            {imgs.map((img,idx)=> <div className={idx===imgIdx && "white-dot"}key={idx}>•</div>)}
        </div> */}
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


// style={{backgroundImage: `url(${imgs[imgIdx]})`}}