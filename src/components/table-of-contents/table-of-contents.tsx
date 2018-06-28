import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import Helmet from '@stencil/helmet';

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
    }).then(api => {console.log(api)
      if (api.success) {
        this.listOfArticles = [...this.listOfArticles, ...api.data];
      }
    });
  }

  getListOfArticles() {
    const url = 'http://localhost:5000/bloglist';
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

  createTitleURL(title: string) {
    let titleURL = title.trim().split('').map(value => {
      if (value == ' ') {
        return '-';
      }
      if (value == '/') {
        return '}';
      }
      if (value == '?') {
        return '{';
      }
      return value;
    }).join('');
    return titleURL;
  }
  render() {
    return (
      <div class='container'>
      <Helmet>
        <title>Home</title>
      </Helmet>
        <div class='columns'>
          <div class='column col-1' />
          <div id='table-of-contents' class='column col-10'>
            <div class='columns'>
              {this.listOfArticles.map(article => (
                <div class='column col-xs-12 col-md-6 col-4'>
                  <stencil-route-link url={`/blogid/${article.blogid}/title/${this.createTitleURL(article.title)}`}                  >
                    <div class='card'>
                      <div class='card-image'>
                        <img src={article.headersrc} class='img-responsive' alt={`imagen de ${article.headeralt}`} />
                      </div>
                      <div class='card-header'>
                        <div class='card-title'>{article.title}</div>
                        <div class='card-subtitle text-gray'>
                          {article.date}
                        </div>
                      </div>
                      <div class='card-body'>
                        {article.content}
                      </div>
                    </div>
                    <br />
                  </stencil-route-link>
                </div>
              ))}
            </div>
          </div>
          <div class='column col-1' />
        </div>
      </div>
    );
  }
}
