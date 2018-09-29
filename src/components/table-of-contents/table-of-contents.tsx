import { Component, Prop, State } from '@stencil/core';
import { domain } from '../../common';
import { AxiosStatic } from '../../axios';
import { Helmet } from '@stencil/helmet';
declare const axios: AxiosStatic;

@Component({
  tag: 'table-of-contents',
  styleUrl: 'table-of-contents.css'
})
export class TableOfContents {
  @Prop({ context: 'isServer' }) private isServer: boolean;
  @State() listOfArticles: any[];
  private blogLoaded: boolean;
  componentWillLoad() {
    this.listOfArticles = [];
    if (this.isServer === false) {
      this.getListOfArticles()
        .then(response => {
          if (response.status == 200) {
            this.blogLoaded = true;
            response.data.success ?
              this.listOfArticles = [...this.listOfArticles, ...response.data.data] :
              alert('There was an error retrieving the data. Please reload the page and try again!');
          }
        });
    }
  }

  getListOfArticles() {
    const url = `${domain}/blog/list`;
    return axios.get(url);
  }

  convertText(text: string) {
    let convertedText = text.split('').map(value => {
      if (value == '}') {
        return '/';
      }
      if (value == '{') {
        return '?';
      }
      return value;
    }).join('');
    return convertedText;
  }
  convertTitle(title: string) {
    let convertedTitle = title.split('').map(value => {
      if (value == '/') {
        return '}';
      }
      if (value == '?') {
        return '{';
      }
      if (value == '-') {
        return ' ';
      }
      return value;
    }).join('');
    return convertedTitle;
  }

  render() {
    return (
      <div class='container'>
        <Helmet>
          {/* <!-- HTML Meta Tags --> */}
          <title>BanditoTR: Tutorials about Ionic, StencilJS, TypeScript, Angular and Open Web technologies.</title>
          <meta name="description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemprop="name" content="BanditoTR: Tutorials about Ionic, StencilJS, TypeScript, Angular and Open Web technologies." />
          <meta itemprop="description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
          <meta itemprop="image" content="https://www.banditotr.com/assets/icon/icon.png" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://www.banditotr.com" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="BanditoTR: Tutorials about Ionic, StencilJS, TypeScript, Angular and Open Web technologies." />
          <meta property="og:description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
          <meta property="og:image" content="https://www.banditotr.com/assets/icon/icon.png" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BanditoTR: Tutorials about Ionic, StencilJS, TypeScript, Angular and Open Web technologies." />
          <meta name="twitter:description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
          <meta name="twitter:image" content="https://www.banditotr.com/assets/icon/icon.png" />

          {/* <!-- Meta Tags Generated via http://heymeta.com --> */}
        </Helmet>
        <div class='columns'>
          <div class='column col-1' />
          <div id='table-of-contents' class='column col-10'>
            {this.blogLoaded ? <div></div> : <div class="loading loading-lg"></div>}
            <div class='columns'>
              {this.listOfArticles.map(article => (
                <div class='column col-xs-12 col-md-6 col-4'>
                  <stencil-route-link url={`/blogid/${article.blogid}/title/${this.convertTitle(article.title)}`}>
                    <div class='card'>
                      <div class='card-image'>
                        <img
                          src={this.convertText(article.headersrc)}
                          class='img-responsive'
                          alt={`imagen de ${this.convertText(article.headeralt)}`}
                        />
                      </div>
                      <div class='card-header'>
                        <div class='card-title h3'>{this.convertText(article.title)}</div>
                        <disqus-comment-count shortname='banditotr' config={{ url: 'https://www.banditotr.com', identifier: `/blogid/${article.blogid}/title/${this.convertTitle(article.title)}` }}>
                          <p>Comments</p>
                        </disqus-comment-count>
                        <div class='card-subtitle text-gray'>
                          {this.convertText(article.date)}
                        </div>
                      </div>
                      {/* <div class='card-body'><blog-contents contents={this.convertText(article.contents)} /></div> */}
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