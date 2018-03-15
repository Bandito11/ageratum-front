import { Component } from '@stencil/core';


@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css'
})
export class HomePage {

  render() {
    return (
      <div>
      <blog-page></blog-page>
      <table-of-contents></table-of-contents>
      </div>
    );
  }
}
