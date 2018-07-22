import { Component, Prop, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';
import { domain } from '../../common';

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
          <title>Home</title>
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
                        <div class='card-subtitle text-gray'>
                          {this.convertText(article.date)}
                        </div>
                      </div>
                      <div class='card-body'><blog-contents contents={this.convertText(article.contents)} /></div>
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
