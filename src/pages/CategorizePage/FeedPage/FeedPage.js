import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Title2White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import './FeedPage.css'
import { LoadingScreen } from '../../../shared/components/LoadingScreen/LoadingScreen'
import { TimelineCard } from '../../TimelineCard/TimelineCard'
import { useNavigate, useParams } from 'react-router'
import { AppErrorAuth } from '../../../utils/AppErrors'



export const FeedPage = ({ }) => {
    // state
    const [isActive, setIsActive] = useState(false)
    const {accId} = useParams();
    const [feeds, setFeeds] = useState([])
    const [feedsOpen, setFeedsOpen] = useState({})
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setFeedsOpen(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setFeedsOpen(prevState => value)
    }

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
            console.log(err);;
        } finally {
            // remove loading screen
            setLoading(false);
        }
    }

    // screen
    const [isLoading, setLoading] = useState(false);
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
                </div> : null}

            {/* <div className='catalog-ctn'>
                {feeds.length !== 0 && feeds.map(item => {
                    return (
                        <div key={item.post_id}>
                            {item.detail_media_feed == null ? 'no post' :
                                <div className='item-cell'>
                                    <ImagesViewProfile link={item.detail_media_feed[0]} handleClick={_ => handleFormOpen(item)} item={item} />
                                </div>
                            }
                        </div>
                    )
                })}
            </div> */}

            <div className='catalog-ctn-f ctg'>
                {feeds.length !== 0 && feeds.map((item) => {
                    let dt = new Date(item.created_at.replace(' ', 'T'));
                    let date = dt.getDate()
                    let month = dt.getMonth() + 1
                    let year = dt.getFullYear()
                    let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                    let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                    
                    return(
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
                            handleComment={handleComment}/>
                    )
                })}
            </div>

            {isActive &&
                <div className='detail-feed-bg'>
                    <div className='detail-feed-wrp'>
                        <TimelineCard
                            avatar={feedsOpen.avatar}
                            caption={feedsOpen.caption_post}
                            comments={feedsOpen.detail_comments}
                            date={`${new Date(feedsOpen.created_at.replace(' ', 'T')).getDate()}/${new Date(feedsOpen.created_at.replace(' ', 'T')).getMonth() + 1}/${new Date(feedsOpen.created_at.replace(' ', 'T')).getFullYear()}`}
                            links={feedsOpen.detail_media_feed}
                            name={feedsOpen.display_name}
                            place={feedsOpen.place}
                            time={`${new Date(feedsOpen.created_at.replace(' ', 'T')).getHours() < 10 ? '0' + new Date(feedsOpen.created_at.replace(' ', 'T')).getHours() : new Date(feedsOpen.created_at.replace(' ', 'T')).getHours()}:${new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes() < 10 ? '0' + new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes() : new Date(feedsOpen.created_at.replace(' ', 'T')).getMinutes()}`}
                            key={feedsOpen.account_id}
                            handleClick={handleFormClose}
                        />
                    </div>
                </div>
            }

            {isLoading && <LoadingScreen />}
        </>
    )
}