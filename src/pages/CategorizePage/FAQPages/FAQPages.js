import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Title2White } from '../../../shared/components/Label/Label'
import { QA } from '../../../shared/components/QA/QA'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppErrors'
import './FAQPages.css'

export const FAQPages = ({ bisID }) => {
  const { faqService } = UseDep();
  const [faq, setFaq] = useState([]);

  const getFAQ = async () => {
    try {
      const response = await faqService.doGetFaq({
        "account_id": `${bisID}`
      })
      if (response.data.data !== null) {
        setFaq(response.data.data)
      }
    } catch (err) {
      AppError(err)
    }
  }

  useEffect(() => {
    getFAQ()
  }, [])

  return (
    <>
      {faq.length == 0 ?
        <div className='catalog-ctn empty'>
          <Title2White title={'No Question(s) Yet'} />
        </div>
        :
        <div className='faq-ctn'>
          {
            faq.map((faq, faqi) => {
              return <div>
                <QA num={faqi + 1} question={faq.question} answer={faq.answer} />
              </div>
            })
          }
        </div>
      }
    </>
  )
}
