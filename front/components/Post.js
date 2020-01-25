import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import ReactMarkdown from "react-markdown"
import ErrorMessage from "./ErrorMessage"
import { hasRoles } from "../utils/auth"

export const POST_QUERY = gql`
  query POST_QUERY($slug: String!) {
    posts(where: { slug: { _eq: $slug } }) {
      id
      title
      slug
      text
      created_at
    }
  }
`

export default function Post({ slug }) {
  const canEdit = hasRoles(["admin", "office", "user"])
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
    <>
      <h1>{post.title}</h1>
      {canEdit && (
        <a href={`/post/edit/${post.slug}`} className="button">
          edit
        </a>
      )}
      <div><b>ID:</b> <small className="muted">#{post.id}</small></div>
      {post.tags && (
        <div>
          <b>Tags:</b> {post.tags}
        </div>
      )}
      <div>
        <b>Timestamp:</b> {post.created_at}
      </div>
      <div>
        <b>Content:</b> <br />{" "}
        <ReactMarkdown source={post.text} escapeHtml={false} />
      </div>
    </>
  )
}
