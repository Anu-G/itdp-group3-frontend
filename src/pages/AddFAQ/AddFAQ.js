import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonComponent } from "../../shared/components/Button/Button";
import { CommentColomn } from "../../shared/components/CommentColomn/CommentColomn";
import { Title3White } from "../../shared/components/Label/Label";
import { LoadingScreen } from "../../shared/components/LoadingScreen/LoadingScreen";
import { PanicPopUpScreen, SuccessPopUpScreen } from "../../shared/components/PopUpScreen/PopUpScreen";
import { UseDep } from "../../shared/context/ContextDep";
import { AuthSelector } from "../../shared/selectors/Selectors";
import AppError from "../../utils/AppErrors";
import './AddFAQ.css'

export const AddFAQ = ({openCreate,handleOpenCreate,setRefresh}) => {
    const [question,setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const maxLength = 280;
    const [questionLength,setQuestionLength] = useState(0);
    const [answerLength,setAnswerLength] = useState(0);

    const { faqService } = UseDep();
    const authRed = useSelector(AuthSelector);

    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });
    
    const handleQuestionLimit = (e) => {
        if (questionLength >= maxLength) {
            e.preventDefault();
        }
    }

    const handleAnswerLimit = (e) => {
        if (answerLength >= maxLength) {
            e.preventDefault();
        }
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
        setQuestionLength(e.target.value.length);
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
        setAnswerLength(e.target.value.length);
    }

    const onClickSuccess = (value) => {
        setSuccess(current => value);
    }

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await faqService.doCreateFaq({
                "account_id":`${authRed.account_id}`,
                "question":question,
                "answer":answer
            })
            console.log(response);
            if (response.status == 200) {
                setSuccess(true)
                handleOpenCreate()
                setRefresh(prevState=>!prevState)
            }
        } catch (err) {
            console.log(err);
            setPanic(prevState => ({
                ...prevState,
                isPanic: true, errMsg: AppError(err)
            }));
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            {openCreate && 
                <div className='wrapper'>
                    <div className="popup-box">
                        <div className="box-faq">
                            <div className='add-faq-title'>
                                <span className="close-icon" onClick={handleOpenCreate}><FontAwesomeIcon icon="fa-solid fa-xmark" style={{ width: '32px', height: '32px' }} /></span>
                            </div>
                            <div className='caption-form-faq'>
                                <Title3White title={"Question"} />
                                <CommentColomn placeholder={"Write question here ..."} handleChange={handleQuestionChange} maxLength={maxLength} value={question} charLength={questionLength} />
                            </div>
                            <div className='caption-form-faq'>
                                <Title3White title={"Answer"} />
                                <CommentColomn placeholder={"Write answer here ..."} handleChange={handleAnswerChange} maxLength={maxLength} value={answer} charLength={answerLength} />
                            </div>
                            <ButtonComponent label={"Add"} onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            }
            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}