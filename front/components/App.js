import React, { useState } from "react"
import Head from "next/head"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import RightPanel from "./RightPanel"

export default ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(0)

  return (
    <main>
      <Head>
        <link
          href="https://static.10ninox.com/css/bulma.0.8.0.min.css"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <Header
        sideMenuOpen={sideMenuOpen}
        toggleSideMenu={() => {
          console.log("toggle side menu to ", !sideMenuOpen)
          setSideMenuOpen(!sideMenuOpen)
        }}
      />
      <section className="body is-fullheight content">
        <div
          style={{
            padding: "5px 2rem",
            flexBasis: "fill",
            flex: "calc(100% - 20rem)"
          }}
        >
          {children}
        </div>
        <RightPanel />
      </section>

      <Sidebar
        sideMenuOpen={sideMenuOpen}
        toggleSideMenu={() => {
          setSideMenuOpen(!sideMenuOpen)
        }}
      />

      <Footer />

      <style jsx global>{`
        body {
          height: 100vh;
        }
        section.is-fullheight {
          min-height: 80vh;
        }
        .body {
          display: flex;
          flex-direction: row;
        }

        .body.is-full-height {
          height: 100vh;
        }
        .navbar.is-fresh {
          position: relative;
          min-height: 3.8rem;
          transition: all 0.3s;
          z-index: 29;
        }

        .navbar.is-fresh .container {
          min-height: 4rem;
        }

        .navbar.is-fresh.no-shadow {
          box-shadow: none !important;
        }

        .navbar.is-fresh .navbar-burger {
          width: 4rem;
          height: 4rem;
        }

        .navbar.is-fresh .navbar-brand {
          min-height: 4rem;
        }

        .navbar.is-fresh .navbar-brand img {
          max-height: 36px !important;
          height: 36px;
        }

        .navbar.is-fresh .navbar-brand:hover .navbar-item {
          background: transparent !important;
        }

        .navbar.is-fresh .navbar-end {
          -ms-flex-align: center;
          align-items: center;
        }

        .navbar.is-fresh .navbar-item {
          color: #999;
        }

        .navbar.is-fresh .navbar-item.is-secondary:hover {
          color: #f39200 !important;
        }

        .navbar.is-fresh .navbar-item.has-dropdown {
          padding: 10px 0;
        }

        .navbar.is-fresh .navbar-item.has-dropdown .navbar-link {
          color: #999;
        }

        .navbar.is-fresh .navbar-item.has-dropdown .navbar-link:after {
          top: 55%;
          height: 0.5em;
          width: 0.5em;
          border-width: 2px;
          border-color: #999;
        }

        .navbar.is-fresh .navbar-item.has-dropdown .navbar-dropdown {
          top: 3.4rem;
          min-width: 220px;
          margin-top: 4px;
          border-top-color: #f39200;
        }

        .navbar.is-fresh
          .navbar-item.has-dropdown
          .navbar-dropdown
          .navbar-item {
          padding: 10px 20px;
        }

        .navbar.is-fresh .navbar-item.has-dropdown:hover .navbar-link {
          color: #f39200;
        }

        .navbar.is-fresh .navbar-item.has-dropdown:hover .navbar-link:after {
          border-color: #f39200;
        }

        .navbar.is-fresh .navbar-item .signup {
          display: block;
          line-height: 0;
          font-size: 0.9rem !important;
        }

        .navbar.is-fresh.is-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 4rem !important;
          background: #fff;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
        }

        .navbar.is-fresh.is-fixed a {
          color: #444f60;
        }

        .navbar.is-fresh.is-fixed a:hover {
          color: #4fc1ea;
        }

        #navbar-clone {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: #fff;
          -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
          z-index: 100;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
        }

        #navbar-clone.is-active {
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }

        /* ==========================================================================
      Dropdown styles
      ========================================================================== */
        div.nav-item.is-drop a {
          padding-right: 7px;
        }

        div.nav-item.is-drop:hover .dropContain .dropOut {
          opacity: 1;
        }

        div.nav-item.is-drop:hover,
        div.nav-item.is-drop:hover a {
          border-bottom: 1px solid transparent !important;
          color: #f39200;
        }

        div.nav-item.is-drop:hover .dropContain {
          top: 65px;
          -webkit-animation: fadeInUp 0.27s ease-out;
          animation: fadeInUp 0.27s ease-out;
        }

        span.drop-caret {
          position: relative;
          top: 5px;
        }

        div.nav-item.is-drop {
          position: relative;
        }

        div.nav-item.is-drop .dropContain {
          width: 220px;
          position: absolute;
          z-index: 3;
          left: 50%;
          margin-left: -110px;
          /* half of width */
          top: -400px;
        }

        div.nav-item.is-drop .dropContain .dropOut {
          width: 220px;
          background: #fff;
          float: left;
          position: relative;
          margin-top: 15px;
          opacity: 0;
          border-radius: 4px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.5s ease-out;
        }

        div.nav-item.is-drop .dropContain .dropOut .triangle {
          width: 0;
          height: 0;
          position: absolute;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #fff;
          top: -8px;
          left: 50%;
          margin-left: -8px;
        }

        div.nav-item.is-drop .dropContain .dropOut ul li {
          text-align: left;
          float: left;
          width: 200px;
          padding: 12px 0 10px 15px;
          margin: 0px 10px;
          color: #777;
          border-radius: 4px;
          transition: background 0.1s ease-out;
        }

        div.nav-item.is-drop .dropContain .dropOut ul li:hover {
          background: #eff4f7;
          cursor: pointer;
        }

        div.nav-item.is-drop .dropContain .dropOut ul {
          float: left;
          padding: 10px 0;
        }

        /* ==========================================================================
      Section Styles
      ========================================================================== */
        .section.section-light-grey {
          background-color: #eff4f7;
        }

        .section.section-feature-grey {
          background-color: #fbfbfb;
        }

        .section.section-secondary {
          background-color: #f39200;
        }

        .section.section-half {
          height: 75vh !important;
        }

        .section .title,
        .section .subtitle {
          font-family: "Open Sans", sans-serif;
        }

        .section .subtitle.is-muted {
          color: #999;
        }

        .title-wrapper {
          max-width: 500px;
          margin: 0 auto;
        }

        .title-wrapper .title,
        .title-wrapper .subtitle {
          font-family: "Open Sans", sans-serif;
        }

        .title-wrapper .subtitle.is-muted {
          color: #999;
        }

        .divider {
          height: 3px;
          border-radius: 50px;
          background: #f39200;
          width: 60px;
        }

        .divider.is-centered {
          margin: 0 auto;
        }

        .content-wrapper {
          padding: 60px 0;
        }

        img.pushed-image {
          margin-top: -29vh;
        }

        .media.icon-box {
          border-top: none !important;
        }

        .media.icon-box .media-content .content p span {
          display: block;
        }

        .media.icon-box .media-content .content p .icon-box-title {
          color: #444f60;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .media.icon-box .media-content .content p .icon-box-text {
          color: #a9abac;
          font-size: 1rem;
          font-weight: 400;
        }

        /* ==========================================================================
      Hero styles
      ========================================================================== */
        .hero-body {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .hero-body .title,
        .hero-body .subtitle {
          font-family: "Open Sans", sans-serif;
        }

        .hero-body .title.is-bold {
          font-weight: 700;
        }

        .hero-body .subtitle.is-muted {
          color: #999;
        }

        .hero-foot img.partner-logo {
          height: 70px;
        }

        /* ==========================================================================
      Fresh Footer
      ========================================================================== */
        footer.footer-dark {
          background: #444f60;
          color: #fff;
        }

        footer.footer-dark .columns {
          margin-top: 35px;
        }

        footer.footer-dark .footer-logo img {
          height: 40px;
        }

        footer.footer-dark .footer-column .footer-header h3 {
          font-weight: 500;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        footer.footer-dark .footer-column ul.link-list {
          line-height: 40px;
          font-size: 1.1rem;
        }

        footer.footer-dark .footer-column ul.link-list a {
          color: #98a9c3;
          font-weight: 400;
          transition: all 0.5s;
        }

        footer.footer-dark .footer-column ul.link-list :hover {
          color: #fcfcfc;
        }

        footer.footer-dark .footer-column .level-item .icon {
          color: #f39200;
          transition: all 0.5s;
        }

        footer.footer-dark .footer-column .level-item .icon :hover {
          color: #fcfcfc;
        }

        /* ==========================================================================
      Classes to change the feel of bulma buttons
      ========================================================================== */
        .button {
          cursor: pointer;
          transition: all 0.5s;
        }

        .button.cta {
          font-family: "Open Sans", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          padding: 26px 40px 26px 40px;
        }

        .button.is-clear {
          line-height: 0 !important;
        }

        .button.rounded {
          border-radius: 500px;
        }

        .button.raised:hover {
          box-shadow: 0 14px 26px -12px rgba(0, 0, 0, 0.42),
            0 4px 23px 0px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(0, 0, 0, 0.2) !important;
          opacity: 0.8;
        }

        .button.btn-outlined {
          background: transparent;
        }

        .button.signup-button {
          font-size: 0.9rem;
          font-weight: 600;
          font-family: "Open Sans", sans-serif;
          padding: 24px 26px;
          width: 130px;
        }

        .button.primary-btn {
          outline: none;
          border-color: #4fc1ea;
          background-color: #4fc1ea;
          color: #fff;
          transition: all 0.5s;
        }

        .button.primary-btn:hover {
          color: #fff;
        }

        .button.primary-btn.raised:hover {
          box-shadow: 0 14px 26px -12px rgba(79, 193, 234, 0.42),
            0 4px 23px 0px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(79, 193, 234, 0.2) !important;
          opacity: 0.8;
        }

        .button.primary-btn.btn-outlined {
          border-color: #4fc1ea;
          color: #4fc1ea;
          background-color: transparent;
        }

        .button.primary-btn.btn-outlined:hover {
          color: #fff;
          background-color: #4fc1ea;
        }

        .button.secondary-btn {
          outline: none;
          border-color: #f39200;
          background-color: #f39200;
          color: #fff;
          transition: all 0.5s;
        }

        .button.secondary-btn:hover {
          color: #fff;
        }

        .button.secondary-btn.raised:hover {
          box-shadow: 0 14px 26px -12px rgba(243, 146, 0, 0.42),
            0 4px 23px 0px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(243, 146, 0, 0.2) !important;
          opacity: 0.8;
        }

        .button.secondary-btn.btn-outlined {
          border-color: #f39200;
          color: #f39200;
          background-color: transparent;
        }

        .button.secondary-btn.btn-outlined:hover {
          color: #fff;
          background-color: #f39200;
        }

        .button.button.accent-btn {
          outline: none;
          border-color: #00efb7;
          background-color: #00efb7;
          color: #fff;
          transition: all 0.5s;
        }

        .button.button.accent-btn:hover {
          color: #fff;
        }

        .button.button.accent-btn.raised:hover {
          box-shadow: 0 14px 26px -12px rgba(104, 187, 136, 0.42),
            0 4px 23px 0px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(104, 187, 136, 0.2) !important;
          opacity: 0.8;
        }

        .button.button.accent-btn.btn-outlined {
          border-color: #00efb7;
          color: #00efb7;
          background-color: transparent;
        }

        .button.button.accent-btn.btn-outlined:hover {
          color: #fff;
          background-color: #00efb7;
        }

        /*! _cards.scss v1.0.0 | Commercial License | built on top of bulma.io/Bulmax */
        /* ==========================================================================
      Cards and Card content styles
      ========================================================================== */
        .feature-card {
          width: 300px;
          height: 320px;
          background-color: #fff;
          border-radius: 3px;
          margin: 0 auto;
        }

        .feature-card .card-title h4 {
          font-family: "Open Sans", sans-serif;
          padding-top: 25px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #444f60;
        }

        .feature-card .card-icon img {
          height: 120px;
          margin-top: 20px;
        }

        .feature-card .card-text {
          padding: 0 40px;
        }

        .feature-card .card-text p {
          color: #999;
        }

        .feature-card .card-action {
          margin-top: 10px;
        }

        .feature-card.is-bordered {
          border: 1px solid #ededed;
        }

        .flex-card {
          position: relative;
          background-color: #fff;
          border: 0;
          border-radius: 0.1875rem;
          display: inline-block;
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-bottom: 20px;
        }

        .flex-card.raised {
          box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
        }

        .flex-card .tabs {
          padding: 15px 0.7rem;
        }

        .flex-card .navtab-content {
          min-height: 190px;
        }

        .flex-card .navtab-content p {
          padding: 0 0.8rem 20px;
        }

        .flex-card .navigation-tabs.outlined-pills .tabs.tabs-header.primary {
          background-color: #4fc1ea;
        }

        .flex-card .navigation-tabs.outlined-pills .tabs.tabs-header.secondary {
          background-color: #f39200;
        }

        .flex-card .navigation-tabs.outlined-pills .tabs.tabs-header.accent {
          background-color: #00efb7;
        }

        .flex-card .navigation-tabs.outlined-pills .tabs.tabs-header ul li a {
          color: #f2f2f2;
        }

        .flex-card
          .navigation-tabs.outlined-pills
          .tabs.tabs-header
          ul
          li.is-active
          a {
          color: #fff;
          border: 1px solid #fff;
          border-bottom-color: #fff !important;
        }

        .modal .auth-card {
          max-width: 460px;
          margin: 0 auto;
          border-radius: 6px;
        }

        .modal .auth-card .tabs {
          margin-bottom: 0;
        }

        .modal .auth-card .tabs li a {
          color: #cecece;
        }

        .modal .auth-card .tabs li.is-active a {
          color: #f39200;
          border-bottom-color: #f39200;
        }

        .modal .auth-card .tab-content {
          padding: 20px;
        }

        .modal .auth-card .tab-content .field {
          max-width: 390px;
          margin: 10px auto;
        }

        .modal .auth-card .tab-content .field label {
          display: block;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .modal .auth-card .tab-content .field .input {
          font-size: 0.95rem;
          height: 44px;
        }

        .modal .auth-card .tab-content .button.is-fullwidth {
          padding: 20px 0;
          max-width: 390px;
          margin: 20px auto;
        }

        /* ==========================================================================
      Inputs styles
      ========================================================================== */
        input.input {
          color: #878787;
          box-shadow: none !important;
          transition: all 0.8s;
          padding-bottom: 3px;
        }

        input.input.is-small {
          padding-bottom: 2px;
          padding-left: 10px;
        }

        input.input.is-medium {
          padding-bottom: 5px;
        }

        input.input.is-large {
          padding-bottom: 7px;
        }

        input.input:focus,
        input.input:active {
          border-color: #eff4f7;
        }

        input.input.rounded {
          border-radius: 100px;
        }

        input.input.is-primary-focus:focus {
          border-color: #4fc1ea;
        }

        input.input.is-primary-focus:focus ~ span.icon i {
          color: #4fc1ea;
        }

        input.input.is-secondary-focus:focus {
          border-color: #f39200;
        }

        input.input.is-secondary-focus:focus ~ span.icon i {
          color: #f39200;
        }

        input.input.is-accent-focus:focus {
          border-color: #00efb7;
        }

        input.input.is-accent-focus:focus ~ span.icon i {
          color: #00efb7;
        }

        input.input.is-bloody-focus:focus {
          border-color: #fc354c;
        }

        input.input.is-bloody-focus:focus ~ span.icon i {
          color: #fc354c;
        }

        .form-footer {
          width: 100%;
        }

        /* ==========================================================================
      General Keyframes animations
      ========================================================================== */
        .animated {
          animation-duration: 0.5s;
          animation-fill-mode: both;
          -webkit-animation-duration: 0.5s;
          -webkit-animation-fill-mode: both;
        }

        .delay-1 {
          -webkit-animation-delay: 0.25s;
          animation-delay: 0.25s;
        }

        .delay-2 {
          -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
        }

        .delay-3 {
          -webkit-animation-delay: 0.75s;
          animation-delay: 0.75s;
        }

        .delay-4 {
          -webkit-animation-delay: 1s;
          animation-delay: 1s;
        }

        @keyframes fadeInLeft {
          from {
            -webkit-transform: translate3d(20px, 0, 0);
            transform: translate3d(20px, 0, 0);
            opacity: 0;
          }
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @-webkit-keyframes fadeInLeft {
          from {
            -webkit-transform: translate3d(20px, 0, 0);
            transform: translate3d(20px, 0, 0);
            opacity: 0;
          }
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        .preFadeInLeft {
          opacity: 0;
        }

        .fadeInLeft {
          opacity: 0;
          animation-name: fadeInLeft;
          -webkit-animation-name: fadeInLeft;
        }

        @keyframes fadeInUp {
          from {
            -webkit-transform: translate3d(0, 20px, 0);
            transform: translate3d(0, 20px, 0);
          }
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @-webkit-keyframes fadeInUp {
          from {
            -webkit-transform: translate3d(0, 20px, 0);
            transform: translate3d(0, 20px, 0);
          }
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        .preFadeInUp {
          opacity: 0;
        }

        .fadeInUp {
          opacity: 0;
          animation-name: fadeInUp;
          -webkit-animation-name: fadeInUp;
        }

        .gelatine {
          -webkit-animation: gelatine 0.6s;
          animation: gelatine 0.6s;
          animation-duration: 0.6s;
          -webkit-animation-duration: 0.5s;
          animation-fill-mode: both;
          -webkit-animation-fill-mode: both;
        }

        @-webkit-keyframes gelatine {
          from,
          to {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
          }
          25% {
            -webkit-transform: scale(0.9, 1.1);
            transform: scale(0.9, 1.1);
          }
          50% {
            -webkit-transform: scale(1.1, 0.9);
            transform: scale(1.1, 0.9);
          }
          75% {
            -webkit-transform: scale(0.95, 1.05);
            transform: scale(0.95, 1.05);
          }
        }

        @keyframes gelatine {
          from,
          to {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
          }
          25% {
            -webkit-transform: scale(0.9, 1.1);
            transform: scale(0.9, 1.1);
          }
          50% {
            -webkit-transform: scale(1.1, 0.9);
            transform: scale(1.1, 0.9);
          }
          75% {
            -webkit-transform: scale(0.95, 1.05);
            transform: scale(0.95, 1.05);
          }
        }

        /* ==========================================================================
      Sidebar Styles
      ========================================================================== */
        .menu-icon-wrapper {
          position: relative;
          left: 0;
          top: 0;
          width: 34px;
          height: 34px;
          pointer-events: none;
          transition: 0.1s;
        }

        .menu-icon-wrapper svg {
          position: absolute;
          top: -18px;
          left: -18px;
          -webkit-transform: scale(0.07);
          transform: scale(0.07);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }

        .menu-icon-wrapper svg path {
          stroke: #f39200;
          stroke-width: 40px;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: transparent;
          transition: stroke-dasharray 0.5s;
        }

        .menu-icon-wrapper svg path.path1 {
          stroke-dashoffset: 5803.15px;
          stroke-dasharray: 2901.57px, 2981.57px, 240px;
        }

        .menu-icon-wrapper svg path.path2 {
          stroke-dashoffset: 800px;
          stroke-dasharray: 400px, 480px, 240px;
        }

        .menu-icon-wrapper svg path.path3 {
          stroke-dashoffset: 6993.11px;
          stroke-dasharray: 3496.56px, 3576.56px, 240px;
        }

        .menu-icon-wrapper.open svg path.path1 {
          stroke-dasharray: 2901.57px, 5258.15px, 240px;
        }

        .menu-icon-wrapper.open svg path.path2 {
          stroke-dasharray: 400px, 600px, 0px;
        }

        .menu-icon-wrapper.open svg path.path3 {
          stroke-dasharray: 3496.56px, 6448.11px, 240px;
        }

        .menu-icon-wrapper .menu-icon-trigger {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          pointer-events: auto;
          background: none;
          border: none;
          margin: 0;
          padding: 0;
        }

        .sidebar {
          background: #344258;
          width: 280px;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          -webkit-transform: translateX(-281px);
          transform: translateX(-281px);
          transition: all 0.3s;
          z-index: 10000;
        }

        .sidebar.is-active {
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }

        .sidebar .sidebar-header {
          height: 4.25rem;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -ms-flex-align: center;
          align-items: center;
          border-bottom: 1px solid #3d4e68;
          padding: 0 20px;
        }

        .sidebar .sidebar-header img {
          height: 32px;
        }

        .sidebar .sidebar-header a {
          width: 24px;
          height: 24px;
        }

        .sidebar .sidebar-header svg {
          stroke: #fff;
          -webkit-transform: rotate(0);
          transform: rotate(0);
          transition: all 0.3s;
          cursor: pointer;
        }

        .sidebar .sidebar-header svg:hover {
          stroke: #f39200;
          -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
        }

        .sidebar .inner {
          position: relative;
        }

        .sidebar .inner .sidebar-menu {
          margin: 0;
          padding: 0;
          max-width: 400px;
          list-style: none;
          list-style-type: none;
          font-family: "Open Sans", sans-serif !important;
        }

        .sidebar .inner .sidebar-menu li a {
          padding: 20px 25px;
          display: block;
          text-decoration: none;
          color: #fff;
        }

        .sidebar .inner .sidebar-menu li a:hover {
          padding: 20px 25px;
          display: block;
          text-decoration: none;
          color: #fff;
        }

        .sidebar .inner .sidebar-menu li a span {
          margin-right: 20px;
          color: #fff;
        }

        .sidebar .inner .sidebar-menu li.have-children ul {
          padding: 0px;
        }

        .sidebar .inner .sidebar-menu li.have-children li a {
          background-color: #2b3648;
          padding-left: 62px;
          border-bottom: 1px solid #303d52;
          font-size: 0.8rem;
        }

        .sidebar .inner .sidebar-menu li.have-children li a:hover {
          color: #4fc1ea;
          padding-left: 62px;
        }

        .sidebar .inner .sidebar-menu li.have-children span::after {
          position: absolute;
          top: 27px;
          right: 30px;
          content: "\f054";
          color: #fff;
          transition: all 0.5s;
          font-weight: 200 !important;
          font-size: 0.8rem;
        }

        .sidebar .inner li.have-children,
        .sidebar .inner li {
          position: relative;
        }

        .sidebar .inner li.have-children.active > a,
        .sidebar .inner li.have-children.active > a span,
        .sidebar .inner li.have-children.active > a span:after {
          color: #f39200;
        }

        .sidebar .inner li.active.have-children span::after {
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        }

        .sidebar .inner .sidebar-menu .have-children > ul {
          display: none;
        }

        /* ==========================================================================
      Testimonials Styles
      ========================================================================== */
        .testimonial {
          position: relative;
          overflow: hidden;
          margin: 10px auto;
          min-width: 220px;
          max-width: 310px;
          width: 100%;
          color: #333;
          text-align: left;
          box-shadow: none !important;
        }

        .testimonial * {
          box-sizing: border-box;
        }

        .testimonial img {
          max-width: 100%;
          height: 80px;
          width: 80px;
          border-radius: 50%;
          margin-right: 5px;
          display: block;
          z-index: 1;
          position: absolute;
          right: 60%;
        }

        .testimonial blockquote {
          margin: 0;
          display: block;
          border-radius: 8px;
          position: relative;
          background-color: #fcfcfc;
          padding: 30px 50px 65px 50px;
          font-size: 1.2rem;
          font-weight: 500;
          margin: 0 0 -40px;
          line-height: 1.6em;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        }

        .testimonial blockquote:before,
        .testimonial blockquote:after {
          font-family: "FontAwesome";
          content: "\f10d";
          position: absolute;
          font-size: 20px;
          opacity: 0.3;
          font-style: normal;
        }

        .testimonial blockquote:before {
          top: 35px;
          left: 20px;
        }

        .testimonial blockquote:after {
          content: "\f10e";
          right: 20px;
          bottom: 35px;
        }

        .testimonial .author {
          margin: 0;
          height: 80px;
          display: block;
          text-align: left;
          color: #fff;
          padding: 0 35px;
          position: relative;
          z-index: 0;
        }

        .testimonial .author h5,
        .testimonial .author span {
          left: 50%;
          position: absolute;
          opacity: 0.8;
          padding: 3px 5px;
        }

        .testimonial .author h5 {
          text-transform: capitalize;
          bottom: 60%;
          margin: 0;
          font-weight: 600;
          font-size: 1.2rem;
          color: #444f60;
        }

        .testimonial .author span {
          font-size: 0.8em;
          color: #fff;
          top: 50%;
        }

        /* ==========================================================================
      Responsive Styles
      ========================================================================== */
        @media (max-width: 767px) {
          .landing-caption {
            text-align: center;
          }
          .navbar-menu .is-static {
            position: absolute;
            width: 100%;
          }
          .navbar-menu .is-fixed {
            position: fixed;
            width: 100%;
          }
          .navbar-menu .navbar-item {
            text-align: center !important;
          }
          .navbar-menu .navbar-item .signup-button {
            width: 100% !important;
          }
          .navbar-menu .navbar-link {
            padding: 10px 20px !important;
          }
          .title.section-title {
            font-size: 2rem !important;
          }
          .level-left.level-social {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: start;
            justify-content: flex-start;
          }
          .pushed-image {
            margin-top: 0 !important;
          }
          .testimonial {
            margin: 0 auto;
          }
          .testimonial blockquote {
            font-size: 1rem;
          }
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
          .landing-caption {
            text-align: center;
          }
          .landing-caption .subtitle {
            max-width: 440px;
            margin: 0 auto;
            margin-bottom: 20px;
          }
          form {
            padding: 0 40px;
          }
          .hero-body {
            padding-bottom: 0;
          }
          .hero-body img {
            display: block;
            margin: 0 auto;
            max-height: 450px !important;
            max-width: 450px !important;
          }
          .navbar-menu .is-static {
            position: absolute;
            width: 100%;
          }
          .navbar-menu .is-fixed {
            position: fixed;
            width: 100%;
          }
          .navbar-menu .navbar-item {
            text-align: center !important;
          }
          .navbar-menu .navbar-item .signup-button {
            width: 100% !important;
          }
          .navbar-menu .navbar-link {
            padding: 10px 20px !important;
          }
          .pushed-image {
            margin-top: 0 !important;
          }
          .testimonial {
            margin: 0 auto;
          }
          .is-centered-tablet-portrait {
            text-align: center !important;
          }
          .is-centered-tablet-portrait .divider {
            margin: 0 auto !important;
          }
          .footer-logo,
          .footer-column {
            text-align: center;
          }
          .level.is-mobile {
            -ms-flex-pack: center !important;
            justify-content: center !important;
          }
          .level.is-mobile .level-item {
            margin: 0 0.75rem !important;
          }
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
          .navbar-menu .navbar-end a {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
          }
          .navbar-menu .navbar-end .navbar-link {
            padding-right: 0 !important;
          }
          .navbar-menu .navbar-end .button {
            min-width: 180px;
          }
          .navbar-item.is-hidden-mobile {
            display: none !important;
          }
          .navbar-item.is-hidden-desktop.is-hidden-tablet {
            display: -ms-flexbox !important;
            display: flex !important;
          }
          .pushed-image {
            margin-top: 0 !important;
          }
        }

        section:focus {
          outline: none !important;
        }

        button:focus,
        button:active {
          outline: none;
        }

        #preloader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #fff;
          z-index: 99;
        }

        #status {
          width: 200px;
          height: 200px;
          position: absolute;
          left: 50%;
          top: 50%;
          background-image: url(../images/loaders/rings.svg);
          background-size: 80px 80px;
          background-repeat: no-repeat;
          background-position: center;
          margin: -100px 0 0 -100px;
        }

        #backtotop {
          position: fixed;
          right: 0;
          opacity: 0;
          visibility: hidden;
          bottom: 25px;
          margin: 0 25px 0 0;
          z-index: 9999;
          transition: 0.35s;
          -webkit-transform: scale(0.7);
          transform: scale(0.7);
          transition: all 0.5s;
        }

        #backtotop.visible {
          opacity: 1;
          visibility: visible;
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        #backtotop.visible a:hover {
          outline: none;
          opacity: 0.9;
          background: #f39200;
        }

        #backtotop a {
          outline: none;
          text-decoration: none;
          border: 0 none;
          display: block;
          width: 46px;
          height: 46px;
          background-color: #66676b;
          opacity: 1;
          transition: all 0.3s;
          border-radius: 50%;
          text-align: center;
          font-size: 26px;
        }

        body #backtotop a {
          outline: none;
          color: #fff;
        }

        #backtotop a:after {
          outline: none;
          content: "\f106";
          font-family: "FontAwesome";
          position: relative;
          display: block;
          top: 50%;
          -webkit-transform: translateY(-55%);
          transform: translateY(-55%);
        }

        .is-disabled {
          pointer-events: none;
          opacity: 0.4;
          cursor: default !important;
        }

        .is-hidden {
          display: none !important;
        }

        .stuck {
          position: fixed !important;
          top: 0 !important;
          z-index: 2 !important;
        }

        .light-text {
          color: #fff !important;
        }

        .mb-20 {
          margin-bottom: 20px;
        }

        .mb-40 {
          margin-bottom: 40px;
        }

        .mb-60 {
          margin-bottom: 60px;
        }

        .mt-20 {
          margin-top: 20px;
        }

        .mt-40 {
          margin-top: 40px;
        }

        .mt-50 {
          margin-top: 50px;
        }

        .mt-60 {
          margin-top: 60px;
        }

        .ml-30 {
          margin-left: 30px;
        }

        .huge-pb {
          padding-bottom: 100px;
        }

        .pb-20 {
          padding-bottom: 20px !important;
        }

        .pb-40 {
          padding-bottom: 40px !important;
        }

        ::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #cecece;
        }

        ::-moz-placeholder {
          /* Firefox 19+ */
          color: #cecece;
        }

        :-ms-input-placeholder {
          /* IE 10+ */
          color: #cecece;
        }

        :-moz-placeholder {
          /* Firefox 18- */
          color: #cecece;
        }
      `}</style>
    </main>
  )
}
