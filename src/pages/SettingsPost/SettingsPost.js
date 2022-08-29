import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import { SettingsImageGrid } from '../SettingsImageGrid/SettingsImageGrid';
import './SettingsPost.css';

export const SettingsPost = () => {

  const [feeds, setFeeds] = useState([])
  const [links, setLinks] = useState([])
  const authRed = useSelector(AuthSelector);
  const { accountPostService } = UseDep();

  useEffect(() => {
    handleLoad()
  }, [])

  useEffect(() => {
    handleImage(feeds)
  }, [feeds])

  const handleLoad = async () => {
    try {
      const response = await accountPostService.doGetAccount({
        "account_id": authRed.account_id,
        "page": 1,
        "page_lim": 100
      })
      setFeeds(response.data.data)
    } catch (err) {
      console.err(err);
    }
  }

  const handleImage = (feeds) => {
    let linkHold = ""
    const linksInput = []
    for (const feed of feeds) {
      linkHold = feed.detail_media_feeds.split(",", 1)
      linksInput.push(linkHold)
    }
    setLinks(linksInput)
  }

  return (
    <div className='wrapper'>
      <div className='settings-post-card'>
        <SettingsImageGrid links={links} />


      </div>
    </div>
  )
}
