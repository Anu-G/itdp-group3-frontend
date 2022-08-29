import React from 'react'
import { Title2White } from '../../../shared/components/Label/Label'
import { QA } from '../../../shared/components/QA/QA'
import './FAQPages.css'

export const FAQPages = ({FAQs=[]}) => {
  return (
    <>
      {FAQs.length==0 ? 
              <div className='catalog-ctn empty'>
              <Title2White title={'No Question(s) Yet'}/>
            </div>
              : ''}
        <div className='faq-ctn'>
            {
                FAQs.map(faq => {
                    return  <div>
                                <QA num={faq.key} question={faq.question} answer={faq.answer}/>
                            </div>
                })
            }
        </div>
    </>
  )
}
