import React, { useEffect, useState } from 'react'

import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from '../api'

const Search = (props) => {
  const { setIsLoading, setSearchResults } = props
  const [centuryList, setCenturyList] = useState([])
  const [classificationList, setClassificationList] = useState([])
  const [queryString, setQueryString] = useState('')
  const [century, setCentury] = useState('any')
  const [classification, setClassification] = useState('any')

  useEffect(() => {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()])
      .then((results) => {
        setCenturyList(results[0])
        console.log(1234)
        setClassificationList(results[1])
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        console.log('hi')
        event.preventDefault()
        setIsLoading(true)

        try {
          const results = await fetchQueryResults({
            century,
            classification,
            queryString,
          })

          console.log(results)

          setSearchResults(results)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }}
    >
      <fieldset>
        <label htmlFor="keywords">Query</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          value={queryString}
          onChange={(event) => {
            setQueryString(event.target.value)
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="select-classification">
          Classification
          <span className="classification-count">
            ({classificationList.length})
          </span>
        </label>
        <select
          name="classification"
          id="select-classification"
          value={classification}
          onChange={(event) => {
            setClassification(event.target.value)
          }}
        >
          <option value="any">Any</option>
          {classificationList.map((classification1) => {
            return (
              <option key={classification1.id} value={classification1.name}>
                {classification1.name}
              </option>
            )
          })}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          value={century}
          onChange={(event) => {
            setCentury(event.target.value)
          }}
        >
          <option value="any">Any</option>
          {centuryList.map((century1) => {
            return (
              <option key={century1.id} value={century1.name}>
                {century1.name}
              </option>
            )
          })}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  )
}

export default Search
