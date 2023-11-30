'use client'

import {
  Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from 'fuse/next/client'
import React from 'react'

export const DatalayerProvider = (props: any) => {
  const [client, ssr] = React.useMemo(() => {
    const ssr = ssrExchange()
    const client = createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://spacex-fuse.vercel.app'
          : 'http://localhost:3000/api/datalayer',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    })

    return [client, ssr]
  }, [])

  return (
    <Provider client={client} ssr={ssr}>
      {props.children}
    </Provider>
  )
}
