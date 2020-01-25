import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import PostList from "../../components/PostList"
import { withApollo } from "../../lib/apollo"

const IndexPage = props => (
  <App>
    <InfoBox>Manage posts</InfoBox>
    <PostList />
  </App>
)

export default withApollo(IndexPage)
