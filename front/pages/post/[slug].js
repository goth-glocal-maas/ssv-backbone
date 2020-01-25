import { useRouter } from "next/router"
import App from "../../components/App"
import Post from "../../components/Post"
import { withApollo } from "../../lib/apollo"

const IndexPage = () => {
  const router = useRouter()
  const slug = router.query.slug

  return (
    <App>
      <Post slug={slug} />
    </App>
  )
}

export default withApollo(IndexPage)
