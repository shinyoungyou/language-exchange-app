import { observer } from 'mobx-react-lite'
import React from 'react'
import { Comment } from 'semantic-ui-react'
import MessageListItem from './MessageListItem';
import { useStore } from '@/stores/store';

interface Props {
  container: string;
}

export default observer(function MessageList({container}: Props) {
  const { messageStore } = useStore();
  const { messages } = messageStore;    

  return (
      <Comment.Group>
        {messages.map(message => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </Comment.Group>
  )
})
