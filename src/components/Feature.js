import React, { Fragment } from 'react'

import { fetchQueryResultsFromTermAndValue } from '../api'

const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault()
          setIsLoading(true)
          try {
            const results = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue,
            )

            setSearchResults(results)
          } catch (err) {
            console.log(err)
          } finally {
            setIsLoading(false)
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  )
}

const Feature = (props) => {
  const { featuredResult } = props
  if (!featuredResult) {
    return <main id="feature" />
  }

  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult

  console.log(description, 'description')
  console.log('featuredResult', featuredResult)

  return featuredResult ? (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>

        <section className="facts">
          {description ? (
            <Fragment>
              <span className="title">Description</span>
              <span className="content">
                <a href="#">{description}</a>
              </span>
            </Fragment>
          ) : null}

          {technique ? (
            <Fragment>
              <span className="title">Technique:</span>
              <Searchable
                searchTerm="technique"
                searchValue={technique}
                {...props}
              />
            </Fragment>
          ) : null}

          {medium ? (
            <Fragment>
              <span className="title">Medium:</span>
              <Searchable
                searchTerm="medium"
                searchValue={medium.toLowerCase()}
                {...props}
              />
            </Fragment>
          ) : null}

          {culture ? (
            <Fragment>
              <span className="title">Culture:</span>
              <Searchable
                searchTerm="culture"
                searchValue={culture}
                {...props}
              />
            </Fragment>
          ) : null}

          {style ? (
            <Fragment>
              <span className="title">style:</span>
              <span className="content">{style}</span>
            </Fragment>
          ) : null}

          {description ? (
            <Fragment>
              <span className="title">Dimension:</span>
              <span className="content">{dimensions}</span>
            </Fragment>
          ) : null}

          {people
            ? people.map((person) => {
                return (
                  <Fragment>
                    <span className="title">People:</span>
                    <Searchable
                      searchTerm="people"
                      searchValue={person.displayname}
                      {...props}
                    />
                  </Fragment>
                )
              })
            : null}

          {department ? (
            <Fragment>
              <span className="title">Department:</span>
              <span className="content">{department}</span>
            </Fragment>
          ) : null}
          {division ? (
            <Fragment>
              <span className="title">Division:</span>
              <span className="content">{division}</span>
            </Fragment>
          ) : null}

          {contact ? (
            <Fragment>
              <span className="title">Contact:</span>
              <a target="_blank" href="mailto:${contact}">
                {contact}
              </a>
            </Fragment>
          ) : null}

          {creditline ? (
            <Fragment>
              <span className="title">CredtLine:</span>
              <span className="content">{creditline}</span>
            </Fragment>
          ) : null}
        </section>

        <section className="photos"></section>
        {images && images.length > 0 ? (
          images.map((image) => {
            return (
              <img
                src={image.baseimageurl}
                alt={image.baseimageurl}
                key={image.baseimageurl}
              />
            )
          })
        ) : primaryimageurl ? (
          <img src={primaryimageurl} alt={primaryimageurl} />
        ) : null}
      </div>
    </main>
  ) : (
    ''
  )
}

export default Feature
