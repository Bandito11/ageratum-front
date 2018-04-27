import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { ITableOfContents } from '../../common';

@Component({ tag: 'table-of-contents', styleUrl: 'table-of-contents.css' })
export class TableOfContents {
  @Prop() history: RouterHistory;
  @State() listOfArticles: ITableOfContents[];

  componentWillLoad() {
    this.listOfArticles = [];
    this.getListOfArticles().then(response => {
      if (response.ok == true) {
        return response.json();
      }
    }).then(agerantum => {
      if (agerantum.success) {
        this.listOfArticles = [...this.listOfArticles, ...agerantum.data]
      }
    });
  }

  getListOfArticles() {
    const url = 'http://localhost:5000/bloglist';
    return fetch(url);
  }

  render() {
    return (
      <div class="container">
        <div class="columns">
          <div class="column col-1"></div>
          <div id="table-of-contents" class="column col-10">
            <div class="columns">
              {this
                .listOfArticles
                .map(article => <div class="column col-xs-12 col-md-6 col-4">
                  <stencil-route-link url={`/blog/${article.id}`}>
                    <div class="card">
                      <div class="card-header">
                        <div class="card-title h5">
                          {article.title}
                        </div>
                        <div class="card-subtitle text-gray">
                          {article.date}
                        </div>
                      </div>
                      <div class="card-image">
                        <img
                          src={article.headerSrc}
                          class="img-responsive"
                          alt={article.headerAlt} />
                      </div>
                      <div class="card-body">
                        {article.content[0].text.slice(0, 200)}...
                  </div>
                    </div>
                    <br />
                  </stencil-route-link>
                </div>)}
            </div>
          </div>

          <div class="column col-1"></div>
        </div>
      </div>
    );
  }
}
