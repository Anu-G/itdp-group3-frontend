import React from 'react'
import { QA } from '../../../shared/components/QA/QA'
import './FAQPages.css'

export const FAQPages = ({FAQs}) => {
  return (
    <>
        <div className='faq-ctn'>
            {
                FAQs.map(faq => {
                    return  <div>
                                <QA num={faq[0]} question={faq[1]} answer={faq[2]}/>
                            </div>
                })
            }
        </div>
    </>
  )
}
