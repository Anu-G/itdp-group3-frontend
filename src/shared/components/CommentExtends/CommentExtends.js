import './CommentExtends.css'

import React from 'react'
import { Text32White, Title3White } from '../Label/Label'
import { AvatarSmall, AvatarTiny } from '../Avatar/Avatar'

export const CommentExtends = ({ comments }) => {
    return (
        <div className='comment-ext-wrp'>

            {comments.map(comment => {
                return (
                    <DetailComment comment={comment.comment_fill} user={comment.display_name} key={comment.key} avatar={comment.profile_image} />
                )
            })}
        </div>
    )

}

const DetailComment = ({ avatar, user, comment, accId, accountType, handleClickName }) => {
    return (
        <div className='avatar-comment-wrp'>
            <div className='avatar-wrp'>
                <AvatarTiny link={avatar} accId={accId} accType={accountType} handleClick={handleClickName} />
            </div>
            <div className='comment-ext-hd-wrp'>
                <Title3White title={user} />
                <div style={{ paddingLeft: '1rem' }}>
                    <Text32White text={comment} />
                </div>
            </div>
        </div>

    )
}
