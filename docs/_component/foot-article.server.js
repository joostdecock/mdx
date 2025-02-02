import React from 'react'
import {sortItems} from './sort.js'

const dateTimeFormat = new Intl.DateTimeFormat('en', {dateStyle: 'long'})

export const FootArticle = (props) => {
  const {name, navTree, ghUrl, meta = {}} = props
  const authors = meta.authors || {}
  let previous
  let next

  findPreviousAndNext(navTree)

  return (
    <footer>
      <div className="content">
        {previous || next ? (
          <nav
            aria-label="Category navigation"
            style={{display: 'flex', justifyContent: 'space-between'}}
            className="block"
          >
            {previous ? (
              <div>
                <small>Previous:</small>
                <br />
                <a rel="prev" href={previous.name}>
                  {(previous.data.matter || {}).title ||
                    (previous.data.meta || {}).title}
                </a>
              </div>
            ) : null}
            {next ? (
              <div style={{marginLeft: 'auto', textAlign: 'right'}}>
                <small>Next:</small>
                <br />
                <a rel="next" href={next.name}>
                  {(next.data.matter || {}).title ||
                    (next.data.meta || {}).title}
                </a>
              </div>
            ) : null}
          </nav>
        ) : null}
        <div
          style={{display: 'flex', justifyContent: 'space-between'}}
          className="block"
        >
          <div>
            <small>Found a typo? Other suggestions?</small>
            <br />
            <a href={ghUrl.href}>Edit this page on GitHub</a>
          </div>
          <div style={{marginLeft: 'auto', textAlign: 'right'}}>
            {meta.author ? (
              <>
                <small>
                  By{' '}
                  {authors.map((d, i) => {
                    return (
                      <span key={d.name}>
                        {i ? ', ' : ''}
                        {d.github ? (
                          <a href={'https://github.com/' + d.github}>
                            {d.name}
                          </a>
                        ) : (
                          d.name
                        )}
                      </span>
                    )
                  })}
                </small>
                <br />
              </>
            ) : undefined}

            {meta.modified ? (
              <small>
                Last modified on {dateTimeFormat.format(meta.modified)}
              </small>
            ) : undefined}
          </div>
        </div>
      </div>
    </footer>
  )

  function findPreviousAndNext(item) {
    const siblings = sortItems(item.children)
    const index = siblings.findIndex((d) => d.name === name)

    if (index === -1) {
      return siblings.some((d) => findPreviousAndNext(d))
    }

    if (item.name !== '/') {
      previous = siblings[index - 1]
      next = siblings[index + 1]
      return true
    }

    return false
  }
}
