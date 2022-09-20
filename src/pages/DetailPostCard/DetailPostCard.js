import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import { useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router"
import { LoadingScreen } from "../../shared/components/LoadingScreen/LoadingScreen"
import { UseDep } from "../../shared/context/ContextDep"
import { AuthSelector } from "../../shared/selectors/Selectors"
import { AppErrorAuth } from "../../utils/AppErrors"
import { TimelineCard } from "../TimelineCard/TimelineCard"
import './DetailPostCard.css'

export const DetailPostCard = ({postIdFeed,handleClosePicture}) => {
    const {postId} = useParams();
    const {postService} = UseDep();
    const [feedsOpen, setFeedsOpen] = useState({});
    const navigate = useNavigate();
    const authRed = useSelector(AuthSelector)

    const [refresh, setRefresh] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    const {timelineService} = UseDep();

    useEffect(()=>{
        handleOpen()
    },[refresh])

    const handleOpen = async () => {
        let useId = 0
        if (postId) {
           useId = postId 
        } else {
            useId = postIdFeed
        }
        try {
            const response = await postService.doGetDataById({
                "feed_id":parseInt(useId),
                "page":1,
                "page_lim":1,
            })
            console.log(response);
            setFeedsOpen(response.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = () => {
        if (handleClosePicture) {
            handleClosePicture()
        }
        navigate(-1)
    }

    const handleComment = async (detailComment) => {
        try {
            setLoading(true)
            const response = await timelineService.doPostComment({
                feed_id: detailComment.feedId,
                comment_fill: detailComment.comment
            })
            if (response.data.data !== null) {
                setRefresh(prevState=>!prevState)
            }
        } catch (err) {
            if (AppErrorAuth(err)) {
            setPanic(prevState => ({
                ...prevState,
                isPanic: true, errMsg: AppErrorAuth(err)
            }));
            }
        } finally {
            setLoading(false)
        }
    }

    const handleClickName = (accountId) => {
        if (accountId == authRed.account_id) {
          navigate('/profile')
        } else {
          navigate(`/feeds/${accountId}`)
        }
    }

    return(
        <div className={postId ? 'detail-feed-exopen' : 'detail-feed-bg'}>
            { !postId && <div className='detail-feed-bg' onClick={handleClick}/>}
            <div className='detail-feed-wrp'>
                { feedsOpen.avatar && 
                    <TimelineCard
                        avatar={feedsOpen.avatar}
                        caption={feedsOpen.caption_post}
                        comments={feedsOpen.detail_comment}
                        date={`${new Date(feedsOpen.created_at.replace(' ', 'T')).getDate()}/${new Date(feedsOpen.created_at.replace(' ', 'T')).getMonth() + 1}/${new Date(feedsOpen.created_at.replace(' ', 'T')).getFullYear()}`}
                        links={feedsOpen.detail_media_feed}
                        name={feedsOpen.display_name}
                        place={feedsOpen.place}
                        time={`${new Date(feedsOpen.created_at.replace(' ', 'T')).getHours() < 10 ? '0' + new Date(feedsOpen.created_at.replace(' ', 'T')).getHours() : new Date(feedsOpen.created_at.replace(' ', 'T')).getHours()}:${new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes() < 10 ? '0' + new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes() : new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes()}`}
                        key={feedsOpen.account_id}
                        postLikes={feedsOpen.total_like}
                        detailPostLikes={feedsOpen.detail_like}
                        accId={feedsOpen.account_id}
                        setRefresh={setRefresh}
                        handleClickName={handleClickName}
                        feedId={feedsOpen.post_id}
                        handleComment={handleComment}
                    />
                }
            </div>
            {isLoading && <LoadingScreen />}
        </div>
    )
}