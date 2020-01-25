import { useQuery } from "@apollo/react-hooks"
import { NetworkStatus } from "apollo-client"
import gql from "graphql-tag"
import ErrorMessage from "./ErrorMessage"
import PostUpvoter from "./PostUpvoter"

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY($limit: Int!, $offset: Int!) {
    posts(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
      id
      title
      slug
      text
      created_at
    }
    posts_aggregate {
      aggregate {
        count
      }
    }
  }
`
export const postsQueryVars = {
  limit: 10,
  offset: 0
}

export default function PostList() {
  const qResult = useQuery(ALL_POSTS_QUERY, {
    variables: postsQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true
  })
  const { loading, error, data, fetchMore, networkStatus } = qResult
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        offset: posts.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          posts: [...previousResult.posts, ...fetchMoreResult.posts]
        })
      }
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { posts, posts_aggregate } = data
  const areMorePosts = posts.length < posts_aggregate.aggregate.count

  return (
    <>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={`/post/${post.slug}`}>{post.title}</a>
              {/* <PostUpvoter id={post.id} votes={post.votes} /> */}
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button
          className="button is-success is-small"
          onClick={() => loadMorePosts()}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? "Loading..." : "Show More"}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </>
  )
}
