import {Component} from '@stencil/core';

@Component({tag: 'home-page', styleUrl: 'home-page.css'})
export class HomePage {

  render() {
    return (
      <div class="container">
        <div class="columns">
        <div class="column col-1"></div>
          <table-of-contents class="column col-10"></table-of-contents>
          <div class="column col-1"></div>
        </div>
      </div>
    );
  }
}
