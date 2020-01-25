import { useQuery } from "@apollo/react-hooks"
import { NetworkStatus } from "apollo-client"
import gql from "graphql-tag"
import ErrorMessage from "./ErrorMessage"
import styled from "styled-components"

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const LANDS_QUERY = gql`
  query LANDS_QUERY($limit: Int!, $offset: Int!) {
    land(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
      id
      type
      area
      coords
      zone
    }
    land_aggregate {
      aggregate {
        count
      }
    }
  }
`
export const queryVars = {
  limit: 10,
  offset: 0
}

export default function LandList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    LANDS_QUERY,
    {
      variables: queryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )
  const loadingMoreLand = networkStatus === NetworkStatus.fetchMore

  const loadMoreLand = () => {
    fetchMore({
      variables: {
        offset: land.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new results to the old one
          land: [...previousResult.land, ...fetchMoreResult.land]
        })
      }
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMoreLand) return <div>Loading</div>

  const {
    land,
    land_aggregate: {
      aggregate: { count }
    }
  } = data
  const areMoreLand = land.length < count
  let t = {}
  land.map(ele => {
    if (!t[ele.type]) {
      t[ele.type] = 0
    }
    t[ele.type] += 1 * ele.area
  })
  return (
    <Column>
      <nav className="level is-mobile">
        {Object.keys(t).map(k => (
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">{k} (ไร่)</p>
              <p className="title">{t[k]}</p>
            </div>
          </div>
        ))}
      </nav>
      <>
        <h3>รายการทั้งหมด</h3>
        <ul>
          {count === 0 && <p>ไม่มีข้อมูล</p>}
          {land.map((land, index) => (
            <li key={land.id}>
              <div>
                <span>{index + 1}. </span> {land.type} {land.area} ไร่
              </div>
            </li>
          ))}
        </ul>
        {areMoreLand && (
          <button
            className="button is-success is-small"
            onClick={() => loadMoreLand()}
            disabled={loadingMoreLand}
          >
            {loadingMoreLand ? "Loading..." : "Show More"}
          </button>
        )}
      </>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        .level-item>div {
          display: flex;
          flex-direction: column;
        }
        .level-item p.heading {
          font-size: 0.8rem;
          clear: both;
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
    </Column>
  )
}
