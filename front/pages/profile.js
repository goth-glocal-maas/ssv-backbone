import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import App from '../components/App'
import Header from '../components/Header'
import { withAuthSync } from '../utils/auth'
import getHost from '../utils/get-host'

const Profile = () => (
  <App>
    <Header />
    <article>
      <h1>Profile</h1>
      <p>
        <a href="https://www.apollographql.com/client/">Apollo</a> is a GraphQL
        client that allows you to easily query the exact data you need from a
        GraphQL server. In addition to fetching and mutating data, Apollo
        analyzes your queries and their results to construct a client-side cache
        of your data, which is kept up to date as further queries and mutations
        are run, fetching more results from the server.
      </p>
      <p>
        In this simple example, we integrate Apollo seamlessly with{' '}
        <a href="https://github.com/zeit/next.js">Next</a> by wrapping our Page
        component inside a{' '}
        <a href="https://facebook.github.io/react/docs/higher-order-components.html">
          higher-order component (HOC)
        </a>
        . Using the HOC pattern we're able to pass down a central store of query
        result data created by Apollo into our React component hierarchy defined
        inside a page of our Next application.
      </p>
    </article>
  </App>
)


Profile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getHost(ctx.req) + '/api/profile'
  console.log("Profile.getInitialProps: ", token)

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    })

    if (response.ok) {
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

export default withAuthSync(Profile)
