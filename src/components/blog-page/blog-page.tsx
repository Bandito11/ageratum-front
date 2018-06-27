import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'blog-page',
  styleUrl: 'blog-page.css'
})

export interface IBlog { 
  date: string, 
  headerAlt: string, 
  headerSrc: string, 
  title: string, 
  id: string, 
  contents: string 
};

export class BlogPage {
  @Prop() match: MatchResults;
  @State() blogPage: IBlog;

  componentWillLoad() {
    this.blogPage = {
      title: this.getTitle(this.match.params.title),
      id: this.match.params.blogid,
      contents: [],
      date: '',
      headerAlt: '',
      headerSrc: ''
    };
    this.getBlogPageFromDB(this.blogPage.id)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(ageratum => {
        if (ageratum.success) {
          this.blogPage = {
            ...this.blogPage,
            contents: [...ageratum.data]
          };
        }
      });
  }

  getHeaderSrc(headerSrc: string) {
    let src = headerSrc.split('').map(value => {
      if (value == '}') {
        return '/';
      }
      if (value == '{') {
        return '?';
      }
      return value;
    }).join('');
    return src;
  }

  getTitle(title: string) {
    let src = title.split('').map(value => {
      if (value == '}') {
        return '/';
      }
      if (value == '{') {
        return '?';
      }
      return value;
    }).join('');
    return src;
  }

  getBlogPageFromDB(id: string) {
    const url = `/blogpage/id/${id}`;
    return fetch(url);
  }

  createParagraphTag(opts: string) {
    let content = opts.split('').map(value => {
      if (value == '}') {
        return '/';
      }
      if (value == '{') {
        return '?';
      }
      return value;
    }).join('');
    return <p>{content}</p>;
  }

  createImageTag(opts: { link: string, src: string, alt: string, content: string }) {
    return (
      <figure class="figure">
        <a href={opts.link} target="_blank">
          <img src={opts.src} class="img-responsive" alt={opts.alt} />
        </a>
        <figcaption class="figure-caption text-center">{opts.content}</figcaption>
      </figure>
    );
  };
  
// TODO: https://github.com/ionic-team/stencil-helmet
  render() {
    return (
      <div id="blog-page">
        <div class="columns">
          <div class="column col-2"></div>
          <div class="column col-8">
              <img src={this.getHeaderSrc(this.blogPage.headerSrc)} class="img-responsive" alt={this.blogPage.headerAlt} />
            <h2 id="title">
              {this.blogPage.title}
            </h2>
            <p>
              Escrito por: Esteban A. Morales
            </p>
            <div class="divider"></div>
            <div>
              {this.blogPage.contents.map(content => {
                if (content.type == 'p') {
                  return this.createParagraphTag(content.content);
                } else {
                  return this.createImageTag(content)
                }
              })
              }
            </div>
            <p id="date">
              Escrito en {this.blogPage.date}.
            </p>
          </div>
          <div class="column col-2"></div>
        </div>
      </div>
    );
  }
}
