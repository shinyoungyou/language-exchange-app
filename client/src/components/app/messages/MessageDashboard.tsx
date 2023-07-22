import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Container, Grid, GridRow, Tab } from "semantic-ui-react";
import { PagingParams } from "@/models/pagination";
import { useStore } from "@/stores/store";
import MessageList from "./MessageList";
import ConnectMessage from "@/components/app/connect/ConnectMessage";
import LoadingComponent from "@/components/layout/LoadingComponent";

export default observer(function MessageDashboard() {
  const { messageStore } = useStore();
  const {
    loadMessages,
    setPagingParams,
    pagination,
    activeTab,
    setActiveTab,
    loadingInitial,
  } = messageStore;
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadMessages().then(() => setLoadingNext(false));
  }

  if (loadingInitial)
    return <LoadingComponent inverted content="Loading profile..." />;

  const panes = [
    {
      menuItem: "Unread messages",
      render: () => (
        <Tab.Pane>
          <MessageList container="All" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inbox messages",
      render: () => (
        <Tab.Pane>
          <MessageList container="Unread" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Outbox messages",
      render: () => (
        <Tab.Pane>
          <MessageList container="Unread" />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Grid container stackable className="messageDashboard">
      <Grid.Row>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            activeIndex={activeTab}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
