import React from 'react'
import './another.css';
export default function animation() {
  return (
    <div>
      <div className="container">
    <ul>
        <li>
            <a className="animated-arrow" href="https://google.com">
                <span className="the-arrow -left">
                    <span className="shaft"></span>
                </span>
                <span className="main">
                    <span className="text">Explore More</span>
                    <span className="the-arrow -right">
                        <span className="shaft"></span>
                    </span>
                </span>
            </a>
        </li>
    </ul>
</div>

    </div>
  )
}
