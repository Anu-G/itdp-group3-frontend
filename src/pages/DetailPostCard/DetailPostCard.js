import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import { useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router"
import SkeletonTimelineCard from "../../shared/components/Skeletons/SkeletonTimelineCard"
import { UseDep } from "../../shared/context/ContextDep"
import { AuthSelector } from "../../shared/selectors/Selectors"
import AppError, { AppErrorAuth } from "../../utils/AppErrors"
import { TimelineCard } from "../TimelineCard/TimelineCard"
import './DetailPostCard.css'

export const DetailPostCard = ({ postIdFeed, handleClosePicture }) => {
    const { postId } = useParams();
    const { postService } = UseDep();
    const [feedsOpen, setFeedsOpen] = useState({});
    const navigate = useNavigate();
    const authRed = useSelector(AuthSelector)

    const [isLoading, setLoading] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    useEffect(() => {
        handleOpen()
    }, [])

    const handleOpen = async () => {
        let useId = 0
        if (postId) {
            useId = postId
        } else {
            useId = postIdFeed
        }
        try {
            const response = await postService.doGetDataById({
                "feed_id": useId,
                "page": 1,
                "page_lim": 1,
            })
            setFeedsOpen(response.data.data)
        } catch (err) {
            AppError(err);
        }
    }

    const setRefresh = async (postId) => {
        try {
            const response = await postService.doGetDataById({
                "feed_id": postId,
                "page": 1,
                "page_lim": 1,
            })
            setFeedsOpen(response.data.data)
        } catch (err) {
            AppError(err);
        }
    }

    const handleClick = () => {
        if (handleClosePicture) {
            handleClosePicture()
        }
        navigate(-1)
    }

    const handleClickName = (accountId, accountType) => {
        if (accountId == authRed.account_id) {
            navigate('/profile')
        } else {
            navigate(`/account/${accountId}`, {
                state: {
                    accountType: accountType
                }
            })
        }
    }

    return (
        <div className={postId ? 'detail-feed-exopen' : 'detail-feed-bg'}>
            {!postId && <div className='detail-feed-bg' onClick={handleClick} />}
            <div className='detail-feed-wrp'>
                {feedsOpen.avatar &&
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
                        accountType={feedsOpen.account_type}
                    />
                }
                {isLoading && <SkeletonTimelineCard />}
            </div>
        </div>
    )
}