import React from 'react'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { Text32White, Title2White, Title3White } from '../../shared/components/Label/Label'
import { QA } from '../../shared/components/QA/QA'
import './SettingsFaq.css'

export const SettingsFaq = ({ question, questionAmount }) => {
  const FAQs = [
    [
        1, 
        'What is something that you learned from simply watching a stranger?', 
        `I haven't bailed on writing. Look, I'm generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again!`
    ],
    [
        2,
        `What is something that has had a big impact on your that you observed from afar?`,
        `It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.`
    ],
    [
        3,
        `What's your good luck charm?`,
        `Yes in but got you more nothing less good bubble word knock out balloon.`
    ]
]

  return (
    <div className='wrapper'>
      <div className='settings-faq-card'>
        <div className='button-add-faq-question-amount'>
            <ButtonComponentSm label={"Add Question"} />
            <Title3White title={`${question}/${questionAmount}`} />
        </div>

        <div className='QAs'>
        {
                FAQs.map(faq => {
                    return  <div>
                                <QA num={faq[0]} question={faq[1]} answer={faq[2]}/>
                            </div>
                }
                )
              }
        </div>
      </div>
    </div>
  )
}
