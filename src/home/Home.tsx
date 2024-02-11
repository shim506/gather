import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../logo.svg'
import { css } from '@emotion/react'

/** @jsxImportSource @emotion/react */
export default function HomePage() {
  return <div>
    <img src={logo} className="App-logo" alt="logo" />
    <main>
      <ul>
        <li>
          <Link to="/firestore-crud" css={textCSS}>Firestore CRUD</Link>
        </li>
        <li>
          <Link to="/dev" css={textCSS}>Dev</Link>
        </li>
      </ul>
    </main>
  </div>
}
const textCSS = css`
    color: white;
`
