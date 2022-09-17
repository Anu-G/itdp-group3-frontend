import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Title2White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import './FeedPage.css'
import { TimelineCard } from '../../TimelineCard/TimelineCard'
import { useNavigate, useParams } from 'react-router'
import { AppErrorAuth } from '../../../utils/AppErrors'



export const FeedPage = ({ }) => {
    // state
    const { accId } = useParams();
    const [feeds, setFeeds] = useState([])
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)

    // service
    const { timelineService } = UseDep();
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        handleLoad()
    }, [refresh])

    const handleLoad = async () => {
        let useId = 0
        if (accId) {
            useId = parseInt(accId)
        } else {
            useId = authRed.account_id
        }
        try {
            // set loading when hit backend
            setLoading(true);

            const response = await timelineService.doGetAccount({
                "account_id": useId
            })
            if (response.data.data !== null) {
                setFeeds(response.data.data)
            }
        } catch (err) {
            console.log(err);
        } finally {
            // remove loading screen
            setLoading(false);
        }
    }

    // screen
    const [isLoading, setLoading] = useState(true);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });


    const handleComment = async (detailComment) => {
        try {
            setLoading(true)
            const response = await timelineService.doPostComment({
                feed_id: detailComment.feedId,
                comment_fill: detailComment.comment
            })
            if (response.data.data !== null) {
                handleLoad()
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

    return (
        <>
            {feeds.length == 0 ?
                <div className='catalog-ctn empty'>
                    <Title2White title={'No Feeds Yet'} />
                </div> : <div className='catalog-ctn-f ctg'>
                    {feeds.length !== 0 && feeds.map((item) => {
                        let dt = new Date(item.created_at.replace(' ', 'T'));
                        let date = dt.getDate()
                        let month = dt.getMonth() + 1
                        let year = dt.getFullYear()
                        let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                        let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()

                        return (
                            <TimelineCard
                                avatar={item.avatar}
                                caption={item.caption_post}
                                comments={item.detail_comments}
                                date={`${date}/${month}/${year}`}
                                links={item.detail_media_feed}
                                name={item.display_name}
                                place={item.place}
                                time={`${hour}:${minutes}`}
                                key={item.i}
                                postLikes={item.total_like}
                                detailPostLikes={item.detail_like}
                                accId={item.account_id}
                                setRefresh={setRefresh}
                                handleClickName={handleClickName}
                                feedId={item.post_id}
                                handleComment={handleComment} />
                        )
                    })}
                </div>}
        </>
    )
}