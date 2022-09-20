import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { ButtonComponent } from "../../shared/components/Button/Button";
import { PanicPopUpScreen } from "../../shared/components/PopUpScreen/PopUpScreen";
import { UseDep } from "../../shared/context/ContextDep";
import AppError from "../../utils/AppErrors";
import { EditPost } from "../EditPost/EditPost";
import './PostOption.css'

export const PostOption = ({ feedId, prevCaption, prevImage, openPostOption, handleOpenOptions, setRefresh }) => {
    const [openEditPost, setOpenEditPost] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    const { postService } = UseDep();

    const onClickSuccess = (value) => {
        setSuccess(current => value);
    }

    const onClickPanic = (value) => {
        setPanic(prevState => ({
            ...prevState,
            isPanic: value, errMsg: ''
        }));
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            await postService.doDeleteData({
                "feed_id": feedId
            })
        } catch (err) {
            setPanic(prevState => ({
                ...prevState,
                isPanic: true, errMsg: AppError(err)
            }));
        } finally {
            setLoading(false)
            setRefresh()
        }
    }

    const handleOpenEditPost = () => {
        setOpenEditPost(prevState => !prevState)
    }

    return (
        <>
            {openPostOption &&
                <div className={`option-wrapper ${isLoading && 'loading-div'}`}>
                    <div className="popup-box-post-option">
                        <OutsideClickHandler onOutsideClick={() => !isLoading && handleOpenOptions()}>
                            <div className="box">
                                <ButtonComponent label={"Delete"} onClick={handleDelete} isLoading={isLoading} />
                                <ButtonComponent label={"Edit"} onClick={() => {
                                    handleOpenEditPost();
                                    handleOpenOptions();
                                }} />
                            </div>
                        </OutsideClickHandler>
                    </div>
                </div>
            }
            {openEditPost && <EditPost feedId={feedId} prevCaption={prevCaption} prevImage={prevImage} openEditPost={openEditPost} handleOpenEditPost={handleOpenEditPost} setRefresh={setRefresh} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </>
    )
}