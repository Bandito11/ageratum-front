import { Component } from '@stencil/core';

@Component({ 
tag: 'my-app', 
styleUrl: 'my-app.css' 
})
export class MyApp {

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
            <stencil-route url='/' exact={true} component='table-of-contents'></stencil-route>
            <stencil-route url='/blogid/:blogid/title/:title' component='blog-page'></stencil-route>
            <stencil-route url='/entry' component='blog-entry'></stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
