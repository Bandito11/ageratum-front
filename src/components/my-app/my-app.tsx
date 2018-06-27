import { Component } from '@stencil/core';

@Component({ tag: 'my-app', styleUrl: 'my-app.css' })
export class MyApp {

  render() {
    return (
      <div>
        <header class="navbar">
          <stencil-route-link url="/">
            <section class="navbar-section">
              <p class="navbar-brand mr-2">mi icono</p>
            </section>
          </stencil-route-link>
          <section class="navbar-section">
            <a href="https://github.com/Bandito11" class="btn btn-link" target="_blank">
              <i class="ionicons ion-social-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/esteban-morales-5854b67a/" class="btn btn-link" target="_blank">
              <i class="ionicons ion-social-linkedin"></i>
            </a>
            <a href="https://twitter.com/Esteban_PR_11" class="btn btn-link" target="_blank">
              <i class="ionicons ion-social-twitter"></i>
            </a>
          </section>
        </header>

        <main>
          <stencil-router>
            <stencil-route url='/' exact={true} component='table-of-contents'></stencil-route>
            <stencil-route url='/blogid/:blogid/title/:title' component='blog-page'></stencil-route>
            <stencil-route url='/entry'  component='blog-entry'></stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
