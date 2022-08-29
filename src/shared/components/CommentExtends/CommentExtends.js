import './CommentExtends.css'

import React from 'react'
import { Text32White, Title3White } from '../Label/Label'

export const CommentExtends = ({comments}) => {
    
  return (
    <div className='comment-ext-wrp'>

        {comments.map(comment => {
            return(
                <DetailComment comment={comment.comment_fill} user={comment.user} key={comment.key}/>
            )
        })}
    </div>
  )

}

const DetailComment = ({user, comment}) => {
    return(
        <div className='comment-ext-hd-wrp'>
            <Title3White title={user}/>
            <div style={{paddingLeft: '1rem'}}>
                <Text32White text={comment}/>
            </div>
        </div>
    )
}
