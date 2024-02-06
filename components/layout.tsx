import React from "react"
import Header from "./header/header"
import PropTypes from "prop-types"
export default function Layout(props) {
  return (
    <>
      <Header title={props.title} />
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
}
