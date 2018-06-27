import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({ tag: 'table-of-contents', styleUrl: 'table-of-contents.css' })
export class TableOfContents {
  @Prop() history: RouterHistory;
  @State() listOfArticles: any[];

  componentWillLoad() {
    this.listOfArticles = [];
    this.getListOfArticles().then(response => {
      if (response.ok == true) {
        return response.json();
      }
    }).then(ageratum => {
      if (ageratum.success) {
        this.listOfArticles = [...this.listOfArticles, ...ageratum.data];
      }
    });
  }

  getListOfArticles() {
    const url = '/bloglist';
    return fetch(url);
  }

  getHeaderSrc(headerSrc: string) {
    let src = headerSrc.split('').map(value => {
      if (value == '/') {
        return '}';
      }
      if (value == '?') {
        return '{';
      }
      return value;
    }).join('');
    return src;
  }

  getTitle(title: string) {
    let src = title.split('').map(value => {
      if (value == '/') {
        return '}';
      }
      if (value == '?') {
        return '{';
      }
      return value;
    }).join('');
    return src;
  }

  render() {
    return (
      <div class="container">
        <div class="columns">
          <div class="column col-1"></div>
          <div id="table-of-contents" class="column col-10">
            <div class="columns">
              {this.listOfArticles.map(article =>
                <div class="column col-xs-12 col-md-6 col-4">
                  <stencil-route-link url={`/blogid/${article.blogid}/title/${article.title}`}>
                    <div class="card">
                      <div class="card-image">
                        <img src={article.headersrc} class="img-responsive" alt={`imagen de ${article.headeralt}`} />
                      </div>
                      <div class="card-header">
                        <div class="card-title">
                          {article.title}
                        </div>
                        <div class="card-subtitle text-gray">
                          {article.date}
                        </div>
                      </div>
                      <div class="card-body">
                        {article.content}
                  </div>
                    </div>
                    <br />
                  </stencil-route-link>
                </div>
              )}
            </div>
          </div>
          <div class="column col-1"></div>
        </div>
      </div>
    );
  }
}
