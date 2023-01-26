import React, { Fragment } from 'react'
import Notes from './Notes'
function Home(props) {

  return (
    <Fragment>
      <Notes showAlert={props.showAlert}/>
    </Fragment>
  )
}

export default Home