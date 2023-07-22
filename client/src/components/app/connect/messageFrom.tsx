import { Message } from "@/models/message";
import { useStore } from "@/stores/store";
import { formatDistanceToNow } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Comment, Image, Icon } from "semantic-ui-react";

interface Props {
  message: Message;
}

export default observer(function ConnectMessage({ message }: Props) {
  const [translate, setTranslate] = useState<string>('');
  const { userStore: { user } } = useStore();

  const handleTranslate = async (message: Message) => {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${message.content}&langpair=autoDetect|${user?.native}`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        setTranslate(data.responseData.translatedText);
    })     
  }

  return (
    <>
          <div className="messageWrapper messageFrom">
            <Image width='45rem' circular src={message.senderPhotoUrl || require("@/assets/img/user.png")} />
            <Comment>
              <Comment.Content>
                <Comment.Author as="a">{message.senderUsername}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(new Date(message.messageSent))} ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  <div className="originalText">{message.content}</div>
                  {translate && <div className="translatedText">{translate}</div>}
                  {translate 
                  ? <Button onClick={() => setTranslate('')}  circular basic size="medium" icon className="translateIcon"> 
                      <Icon name="chevron up" />
                    </Button>
                  :  <Button onClick={() => handleTranslate(message as Message)} circular basic size="mini" icon className="translateIcon"> 
                      <Image size='mini' src={require('@/assets/img/translate.png')}/>
                    </Button>}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </div>
    </>
  );
});
