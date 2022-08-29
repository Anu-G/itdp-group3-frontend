import './OurLinks.css'

import React from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White } from '../../shared/components/Label/Label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const OurLinks = ({}) => {
    /*
        Expected links:
            - Array or Links {
                key,
                label : label link nya
                links : link yang ditujunya.
            }
            
    */
    const links = [
        {
            key: 1,
            label: 'link 1',
            link: 'https://www.google.com/'
        },
        {
            key: 2,
            label: 'link 2',
            link: 'https://www.google.com/'
        },
        {
            key: 3,
            label: 'link 3',
            link: 'https://www.google.com/'
        },
        {
            key: 4,
            label: 'link 4',
            link: 'https://www.google.com/'
        },
        {
            key: 5,
            label: 'link 5',
            link: 'https://www.google.com/'
        },
    ]

    const handleX = () => {

    }
  return (
    <div className='links-bg'>
        <div className='links-wrp'>
            <div className='links-hd'>
                <div className='links-title'>
                    <Title2White title={'Our Link(s)'}/>
                </div>

                <div className='x-btn-l' onClick={handleX}>
                
                <FontAwesomeIcon icon="fa-solid fa-xmark" style={{height: '100%', color:'#FE5454'}}/>
                
                </div>
            </div>

            
            <div className='links-item'>
                {
                    links.map((link)=>{
                        return(
                            <div>
                                <a href={link.link}><ButtonComponent label={link.label} key={link.key}/></a>
                                
                            </div>
                        )
                    })
                }

            </div>
        </div>
    </div>
  )
}
