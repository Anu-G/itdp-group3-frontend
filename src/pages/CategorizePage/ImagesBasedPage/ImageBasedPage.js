import './ImageBasedPage.css'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'

export const ImageBasedPage = ({links}) => {
  return (
    <>
        <div className='content-ctn'>
            {links.map(link => {
                return  <div>
                            <ImagesViewProfile link={link}/>
                        </div>
            })}
        </div>
    </>
  )
}
