import './ImageBasedPage.css'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Title2White } from '../../../shared/components/Label/Label'

export const ImageBasedPage = ({links=[]}) => {
  return (
    <>
        
        {links.length==0 ? 
              <div className='content-ctn empty'>
              <Title2White title={'No Image Yet'}/>
            </div>
              : ''}
        <div className='content-ctn'>
            {links.map(link => {
                return  (<div className='post-item-cell'>
                            <ImagesViewProfile link={link}/>
                        </div>)
            })}
        </div>
    </>
  )
}

const noImage = () => {
  return(
    <div className='empty'>
      <Title2White title={'No Image Yet'}/>
    </div>
  )
}
