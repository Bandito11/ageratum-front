import { Component } from '@stencil/core';

@Component({
  tag: 'blog-root',
  styleUrl: 'blog-root.css'
})

export class BlogRoot {
  render() {
    return (
      <div>
        <header class="navbar">
          <stencil-route-link url="/">
            <section class="navbar-section">
              <p id="brand" class="navbar-brand mr-2">BanditoTR</p>
            </section>
          </stencil-route-link>
          <section class="navbar-section">
            <div id='logo'>
              <a target="_blank" href='https://attendancelog.xyz'>
                <img src='assets/hi-res-icon.png' alt='Attendance Log icon' /></a>
            </div>
            <a id='github' href="https://github.com/Bandito11" target="_blank">
              <ion-icon name="logo-github"></ion-icon>
            </a>
            <a id='linkedin' href="https://www.linkedin.com/in/esteban-morales-5854b67a/" target="_blank">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a id='twitter' href="https://twitter.com/Esteban_PR_11" target="_blank">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </section>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='table-of-contents' exact={true}></stencil-route>
              <stencil-route url='/blogid/:blogid/title/:title' component='blog-page'></stencil-route>
              <stencil-route url='/entry' component='blog-entry'></stencil-route>
            </stencil-route-switch>
          </stencil-router>
        </main>
        {/* <footer>
          <div id='logo'>
            <a target="_blank" href='https://attendancelog.xyz'>
            <img src='assets/hi-res-icon.png' alt='Attendance Log icon' />Attendance Log</a>
          </div>
        </footer> */}
      </div>
    );
  }
}
