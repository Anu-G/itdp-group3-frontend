import './OurLinks.css'
import React from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Title2White } from '../../shared/components/Label/Label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const OurLinks = ({ handleX, links }) => {
    return (
        <div className='links-bg'>
            <div className='links-wrp'>
                <div className='links-hd'>
                    <div className='links-title'>
                        <Title2White title={'Our Link(s)'} />
                    </div>

                    <div className='x-btn-l' onClick={handleX}>

                        <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ height: '100%', color: '#FE5454' }} />

                    </div>
                </div>


                <div className='links-item'>
                    {
                        links.map((link) => {
                            const regexp = new RegExp('https://')
                            let linked = ''
                            if (!regexp.test(link.link)) {
                                linked = 'https://'+link.link;
                            } else {
                                linked = link.link
                            }
                            return (
                                <div>
                                    <a href={linked} target='_blank'><ButtonComponent label={link.label} key={link.key} /></a>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
