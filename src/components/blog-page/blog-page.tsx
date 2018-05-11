import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'blog-page',
  styleUrl: 'blog-page.css'
})
export class BlogPage {
  @Prop() match: MatchResults;
  @State() blogPage: { date, headerAlt, headerSrc, title, id, contents };

  componentWillLoad() {
    this.blogPage = {
      title: this.getTitle(this.match.params.title),
      id: this.match.params.blogid,
      contents: [],
      date: this.match.params.date,
      headerAlt: this.match.params.headeralt,
      headerSrc: this.getHeaderSrc(this.match.params.headersrc)
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
            contents: [...this.blogPage.contents, ...ageratum.data]
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
    return fetch(url)
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

  render() {
    return (
      <div id="blog-page">
        <div class="columns">
          <div class="column col-2"></div>
          <div class="column col-8">
              <img src={this.blogPage.headerSrc} class="img-responsive" alt={this.blogPage.headerAlt} />
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