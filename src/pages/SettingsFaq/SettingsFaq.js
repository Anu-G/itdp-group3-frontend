import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonComponent, ButtonComponentSm } from '../../shared/components/Button/Button'
import { Text32White, Title2White, Title3White } from '../../shared/components/Label/Label'
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen'
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen'
import { QA } from '../../shared/components/QA/QA'
import { UseDep } from '../../shared/context/ContextDep'
import { AuthSelector } from '../../shared/selectors/Selectors'
import AppError, { AppErrorAuth } from '../../utils/AppErrors'
import { AddFAQ } from '../AddFAQ/AddFAQ'
import './SettingsFaq.css'

export const SettingsFaq = ({}) => {
  const [faq,setFaq] = useState([]);
  const [question, setQuestion] = useState(0);
  const questionAmount = 20;
  const { faqService, profileService } = UseDep();
  const authRed = useSelector(AuthSelector);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });
  const [openCreate,setOpenCreate] = useState(false); 
  const [refresh,setRefresh] = useState(false)

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

  useEffect(()=>{
    getFAQ()
  },[refresh])

  const onClickSuccess = (value) => {
    setSuccess(current => value);
  }

  const getFAQ = async () => {
    setLoading(true);
    try {
      const response = await profileService.doGetBusinessProfile({
        account_id: `${authRed.account_id}`
      }) 
      try {
        const response2 = await faqService.doGetFaq({
          "account_id":`${response.data.data.business_profile.ID}`
        })
        if (response2.data.data !== null) {
          setFaq(response2.data.data)
          setQuestion(response2.data.data.length)
        }
      } catch (err) {
        if (AppErrorAuth(err)) {
          setPanic(prevState => ({
            ...prevState,
            isPanic: true, errMsg: AppErrorAuth(err)
          }));
        }
      }  
    } catch (err) {
      if (AppErrorAuth(err)) {
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppErrorAuth(err)
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  const delFAQ = async (id) => {
    setLoading(true)
    try{
      const response = await faqService.doDeleteFaq({
        "faq_id":`${id}`
      })
      if (response.data.data !== null) {
        setSuccess(true)
        setQuestion(prevState=>prevState-1)
      }
    } catch (err) {
      console.log(err);
      if (AppError(err)) {
        setPanic(prevState => ({
          ...prevState,
          isPanic: true, errMsg: AppError(err)
        }));
      }
    } finally {
      setLoading(false)
      setRefresh(prevState=>!prevState)
    }
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  const handleClick = () => {
    setOpenCreate(prevState=>!openCreate);
  }

  return (
    <div className='wrapper'>
      <div className='settings-faq-card'>
        <div className='button-add-faq-question-amount'>
            <ButtonComponentSm label={"Add Question"} onClick={handleClick}/>
            <Title3White title={`${question}/${questionAmount}`} />
        </div>

        <div className='QAs'>
        {
          faq.map((faq,faqi) => {
            return  (
              <div className='QAsContainer'>
                <QA num={faqi+1} question={faq.question} answer={faq.answer}/>
                <FontAwesomeIcon icon="fa-solid fa-xmark" className='QAsDeleteButton' onClick={()=>delFAQ(faq.ID)}/>
              </div>
            )
          })
        }
        </div>
      </div>
      <AddFAQ openCreate={openCreate} handleOpenCreate={handleClick} setRefresh={setRefresh}/>
      {isLoading && <LoadingScreen />}
      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </div>
  )
}
