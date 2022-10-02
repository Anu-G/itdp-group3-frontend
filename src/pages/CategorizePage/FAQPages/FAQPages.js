import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Title2White } from '../../../shared/components/Label/Label'
import { QA } from '../../../shared/components/QA/QA'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import AppError from '../../../utils/AppErrors'
import './FAQPages.css'

export const FAQPages = () => {
  const { faqService } = UseDep();
  const [faq, setFaq] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { accId } = useParams();
  const authRed = useSelector(AuthSelector)

  const getFAQ = async () => {
    let useId = 0
    if (accId) {
      useId = accId
    } else {
      useId = authRed.account_id
    }
    try {
      setLoading(true)
      const response = await faqService.doGetFaq({
        "account_id": `${useId}`
      })
      if (response.data.data !== null) {
        setFaq(response.data.data)
      }
    } catch (err) {
      AppError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFAQ()
  }, [])

  return (
    <>
      {faq.length == 0 && !isLoading ?
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
