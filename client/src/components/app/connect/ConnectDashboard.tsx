import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid } from "semantic-ui-react";
import { PagingParams } from "@/models/pagination";
import { useStore } from "@/stores/store";
import MemberFilters from "./MemberFilters";
import MemberList from "./MemberList";
import LoadingComponent from "@/components/layout/LoadingComponent";

export default observer(function MemberDashboard() {
  const { memberStore } = useStore();
  const { loadMembers, loadingInitial, setPagingParams, pagination } = memberStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadMembers().then(() => setLoadingNext(false));
  }
  if (loadingInitial)
    return <LoadingComponent inverted content="Loading profile..." />;
//   useEffect(() => {
//     loadMembers();
// }, [loadMembers])

  return (
    <Grid container stackable>
      <Grid.Row>
        <Grid.Column width={16}>
          <MemberFilters />
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <MemberList />
          </InfiniteScroll>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
