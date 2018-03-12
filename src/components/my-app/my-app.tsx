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
          <section class="navbar-section">
            <a href="#" class="navbar-brand mr-2">Mi Blog</a>
          </section>
          <section class="navbar-section">
          <a href="https://github.com/Bandito11" class="btn btn-link">GitHub</a>
          <a href="" class="btn btn-link">LinkedIn</a>
          </section>
        </header>

        <main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>

            <stencil-route url='/profile/:name' component='app-profile'>
            </stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
