const reposQuery = {
    query: "query MyQuery {viewer { repositories(first: 100) {nodes {id name }}}}",
    variables: {}
  }

export default function getRepos () {
    return fetch(`${process.env.REACT_APP_ENDPOINT_GRAPHQL}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${process.env.REACT_APP_TOKEN_GITHUB}`
      },
      body: JSON.stringify(reposQuery)
    }).then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    }).then(res => {
      const  dataOfRepos  = res.data.viewer.repositories.nodes
      console.log(dataOfRepos)
      return dataOfRepos
    })
  }