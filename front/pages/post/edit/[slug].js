import { useRouter } from "next/router"
import { useQuery } from "@apollo/react-hooks"
import App from "../../../components/App"
import PostEdit from "../../../components/PostEdit"
import { POST_QUERY } from "../../../components/Post"
import { withApollo } from "../../../lib/apollo"

const IndexPage = () => {
  const router = useRouter()
  const slug = router.query.slug

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { slug },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true
  })
  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>
  const { posts } = data
  const post = posts[0]

  return (
    <App>
      <PostEdit post={post} />
    </App>
  )
}

export default withApollo(IndexPage)
