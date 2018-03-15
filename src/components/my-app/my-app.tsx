import {Component} from '@stencil/core';

@Component({tag: 'my-app', styleUrl: 'my-app.css'})
export class MyApp {

  render() {
    return (
      <div>
        <header class="navbar">
          <section class="navbar-section">
            <a href="#" class="navbar-brand mr-2">Mi Blog</a>
          </section>
          <section class="navbar-section">
            <a href="https://github.com/Bandito11" class="btn btn-link">
              <i class="ionicons ion-social-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/esteban-morales-5854b67a/"
              class="btn btn-link">
              <i class="ionicons ion-social-linkedin"></i>
            </a>
            <a href="https://twitter.com/Esteban_PR_11" class="btn btn-link">
              <i class="ionicons ion-social-twitter"></i>
            </a>
          </section>
        </header>

        <main>
          <stencil-router>
            <stencil-route url='/' component='home-page' exact={true}></stencil-route>

            <stencil-route url='/profile/:name' component='app-profile'></stencil-route>

          </stencil-router>
        </main>
      </div>
    );
  }
}
