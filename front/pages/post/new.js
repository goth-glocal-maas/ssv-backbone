import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import PostNew from "../../components/PostNew"
import { withApollo } from "../../lib/apollo"

const NewPostPage = props => {
  return (
    <App>
      <InfoBox>New post</InfoBox>
      <PostNew />
    </App>
  )
}

export default withApollo(NewPostPage)
