import React from 'react'
import { ButtonComponent } from '../../shared/components/Button/Button'
import { Text32White } from '../../shared/components/Label/Label'
import { QA } from '../../shared/components/QA/QA'
import './SettingsFaq.css'

export const SettingsFaq = ({ question, questionAmount }) => {
  return (
    <div className='wrapper'>
      <div className='settings-faq-card'>
        <div className='button-add-faq-question-amount'>
          <div className='button-add-question'>
            <ButtonComponent label={"Add Question"} />
          </div>
          <Text32White text={`${question}. ${questionAmount}`} />
        </div>

        <div className='QA'>
          <QA />
          <QA />
          <QA />
        </div>
      </div>
    </div>
  )
}
