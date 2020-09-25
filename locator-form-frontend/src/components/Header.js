import React from "react"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import { FormattedMessage, injectIntl } from 'react-intl'
import { faLanguage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, withRouter } from "react-router-dom"


class Header extends React.Component {

  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="top-nav-container container-fluid" >
            <img id="nav-icon" src="favicon.ico" alt="logo" />
            <div className="navbar-left">
            <div className="dropdown nav-item dropdown hover-dropdown languagepicker">
              <button type="button" className="btn language-select-button" data-toggle="dropdown">
                <FontAwesomeIcon id="language-icon" icon={faLanguage} size="2x" />
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item language-button" lang="en" onClick={this.props.onChangeLanguage}>EN</button></li>
                <li><button className="dropdown-item language-button" lang="fr" onClick={this.props.onChangeLanguage}>FR</button></li>
              </ul>
            </div>
            </div>
            {/* <Link className="navbar-brand" to="/">
               {languages.title} 
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                

                 <li >
                  <div className="dropdown hover-dropdown">
                    <button type="button" className="btn language-select-button " data-toggle="dropdown">
                      <FontAwesomeIcon icon={faLanguage} style={{ color: 'white' }} size="3x" />
                    </button>
                    <div className="dropdown-menu">
                      <div><a className="dropdown-item language-button" lang="en" onClick={this.props.onChangeLanguage}>English</a></div>
                      <div><a className="dropdown-item language-button" lang="fr" onClick={this.props.onChangeLanguage}>Français</a></div>
                    </div>
                  </div>
                </li> 
              </ul>
            </div> */}
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)