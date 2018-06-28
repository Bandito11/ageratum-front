import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Helmet from '@stencil/helmet';

export interface IBlog { 
  date: string, 
  headerAlt: string, 
  headerSrc: string, 
  title: string,
  content: string
};

@Component({
  tag: 'blog-page',
  styleUrl: 'blog-page.css'
})

export class BlogPage {
  @Prop() match: MatchResults;
  @Prop({ context: 'isServer' }) private isServer: boolean;
  @State() blogPage: IBlog;

  componentWillLoad() {
    this.blogPage = {
      title: '',
      content: '',
      date: '',
      headerAlt: '',
      headerSrc: ''
    };
    if (this.isServer === false) {
    this.getBlogPageFromDB(this.match.params.blogid)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(ageratum => {
        if (ageratum.success) {
          this.blogPage = {
            ...this.blogPage,
            content: ageratum.data
          };
        }
      });
      }
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
      if (value == '-') {
        return ' ';
      }
      return value;
    }).join('');
    return src;
  }

  getBlogPageFromDB(id: string) {
    const url = `http://localhost:5000/blogpage/id/${id}`;
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
      <div id='blog-page'>
      <Helmet>
        <title>{this.blogPage.title}</title>
      </Helmet>
        <div class='columns'>
          <div class='column col-2' ></div>
          <div class='column col-8'>
            <img src={this.blogPage.headerSrc} class='img-responsive' alt={this.blogPage.headerAlt} />
            <h2 id='titleBlog'>{this.blogPage.title}</h2>
            <p>Escrito por: Esteban A. Morales</p>
            <div class='divider' />
            <div>
              {this.blogPage.content.split('').map((content, index, contents) => {
                let message = '';
                let src = '';
                let alt = '';
                let href = '';
                if (content == '<') {
                  if (contents[index + 1] == 'p') {
                    message = '';
                    for (let i = index + 3; i < contents.length; i++) {
                      if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'p' && contents[i + 3] == '>') {
                        break;
                      }
                      message += contents[i];
                    }
                    return <p>{message}</p>;
                  }
                  if (contents[index + 1] == 'a') {
                    href = '';
                    message = '';
                    for (let i = index + 3; i < contents.length; i++) {
                      if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'a' && contents[i + 3] == '>') {
                        break;
                      }
                      if (
                        contents[i] == 'h' && contents[i + 1] == 'r' && contents[i + 2] == 'e' && contents[i + 3] == 'f') {
                        for (let j = i + 6; j < contents.length; j++) {
                          if (contents[j] == '\'') {
                            break;
                          }
                          href += contents[j];
                        }
                      }
                      if (contents[i] == '>') {
                        for (let j = i + 1; j < contents.length; j++) {
                          if (contents[j] == '<' && contents[j + 1] == '/' && contents[j + 2] == 'a' && contents[j + 3] == '>') {
                            break;
                          }
                          if (contents[j] == '<' && contents[j + 1] == 'i' && contents[j + 2] == 'm' && contents[j + 3] == 'g') {
                            src = '';
                            for (let k = j + 5; k < contents.length; k++) {
                              if (contents[k] == '/' && contents[k + 1] == '>') {
                                break;
                              }
                              if (contents[k] == '<' && contents[k + 1] == 's' && contents[k + 2] == 'r' && contents[k + 3] == 'c') {
                                src = '';
                                for (let m = k + 6; m < contents.length; m++) {
                                  if (contents[m] == '\'') {
                                    break;
                                  }
                                  src += contents[m];
                                }
                              }
                              if (contents[k] == '<' && contents[k + 1] == 'a' && contents[k + 2] == 'l' && contents[k + 3] == 't') {
                                alt = '';
                                for (let m = k + 6; m < contents.length; m++) {
                                  if (contents[m] == '\'') {
                                    break;
                                  }
                                  alt += contents[m];
                                }
                              }
                            }
                            return (
                              <a href={href} target='_blank'>
                                <img src={src} alt={alt} />
                              </a>
                            );
                          } else {
                            message += contents[j];
                          }
                        }
                      }
                    }
                    return (
                      <a href={href} target='_blank'>
                        {message}
                      </a>
                    );
                  }
                }
              })}
            </div>
            <p id='dateBlog'>Escrito el {this.blogPage.date}.</p>
          </div>
          <div class='column col-2' />
        </div>
      </div>
    );
  }
}
