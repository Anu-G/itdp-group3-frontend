import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../../shared/components/ImagesViewProfile/ImagesViewProfile'
import { Title2White } from '../../../shared/components/Label/Label'
import { UseDep } from '../../../shared/context/ContextDep'
import { AuthSelector } from '../../../shared/selectors/Selectors'
import './FeedPage.css'
import { LoadingScreen } from '../../../shared/components/LoadingScreen/LoadingScreen'
import { TimelineCard } from '../../TimelineCard/TimelineCard'
import { useParams } from 'react-router'



export const FeedPage = ({ }) => {
    // state
    const [isActive, setIsActive] = useState(false)
    const {accId} = useParams();
    const [feeds, setFeeds] = useState([])
    const [feedsOpen, setFeedsOpen] = useState({})

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setFeedsOpen(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setFeedsOpen(prevState => value)
    }

    // service
    const { accountPostService } = UseDep();
    const authRed = useSelector(AuthSelector)

    useEffect(() => {
        handleLoad()
    }, [])

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

            const response = await accountPostService.doGetAccount({
                "account_id": useId
            })
            if (response.data.data !== null) {
                setFeeds(response.data.data)
            }
        } catch (err) {
            console.err(err);
        } finally {
            // remove loading screen
            setLoading(false);
        }
    }

    // screen
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            {feeds.length == 0 ?
                <div className='catalog-ctn empty'>
                    <Title2White title={'No Feeds Yet'} />
                </div> : null}

            <div className='catalog-ctn'>
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