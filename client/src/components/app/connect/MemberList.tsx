import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useStore } from "@/stores/store";
import MemberListItem from "./MemberListItem";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { NativeFlag, LearnFlag } from "@/components/common/options/flagHelper";

export default observer(function ActivityList() {
  const { memberStore, presenceStore } = useStore();
  const { members } = memberStore;
  const { onlineUsers } = presenceStore;

  return (
    <div className="memberListWrapper">
       <Comment.Group className="memberList">
      {members.map((member) => (
        <Comment key={member.username} className="memberListItem">
          <Comment.Avatar
            src={
              member.photoUrl ||
              require("@/assets/img/user.png")
            }
          />
          <Comment.Content>
            <Comment.Author as={Link} to={`/members/${member.username}`}>
              {onlineUsers.includes(member.username) && (
                <Label circular color="olive" empty />
              )}{" "}
              {member.displayName}
            </Comment.Author>
            <Comment.Metadata>
              <div>{member.city}, {member.country}</div>
            </Comment.Metadata>
            <Comment.Text>{member.bio ? member.bio.slice(0, 100) + "...": "No comment"}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>
                speaks <NativeFlag native={member.native} /> learns{" "}
                <LearnFlag learn={member.learn} />
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
    </div>
  );
});
