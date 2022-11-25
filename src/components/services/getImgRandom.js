import img1 from '../../assets/imgs/headBg1.jpg'
import img2 from '../../assets/imgs/headBg2.jpg'
import img3 from '../../assets/imgs/headBg3.jpg'
import img4 from '../../assets/imgs/headBg4.jpg'
import img5 from '../../assets/imgs/headBg5.jpg'
let i=0
export const getImgRandom = async(setImg) => {
    const imgs=[img1,img2,img3,img4,img5]
    setImg(imgs[i])
    
    
    setInterval(()=>{
        i++
        if(i===5){
            i=0
        }
        setImg(imgs[i])
    },3000)

}
