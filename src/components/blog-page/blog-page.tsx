import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Helmet from '@stencil/helmet';

interface IBlog { 
  date: string, 
  headerAlt: string, 
  headerSrc: string, 
  title: string,
  contents: string
};

@Component({
  tag: 'blog-page',
  styleUrl: 'blog-page.css'
})

export class Page {
  @Prop() match: MatchResults;
  @Prop({ context: 'isServer' }) private isServer: boolean;
  @State() blog: IBlog;

  componentWillLoad() {
    this.blog = {
      title: '',
      contents: '',
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
          this.blog = {
            ...this.blog,
            contents: ageratum.data
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
    let contents = opts.split('').map(value => {
      if (value == '}') {
        return '/';
      }
      if (value == '{') {
        return '?';
      }
      return value;
    }).join('');
    return <p>{contents}</p>;
  }

  createImageTag(opts: { link: string, src: string, alt: string, contents: string }) {
    return (
      <figure class="figure">
        <a href={opts.link} target="_blank">
          <img src={opts.src} class="img-responsive" alt={opts.alt} />
        </a>
        <figcaption class="figure-caption text-center">{opts.contents}</figcaption>
      </figure>
    );
  };
  
// TODO: https://github.com/ionic-team/stencil-helmet
  render() {
    return (
      <div>
      <Helmet>
        <title>{this.blog.title}</title>
      </Helmet>
        <div class='columns'>
          <div class='column col-2' ></div>
          <div class='column col-8'>
          <img src={this.blog.headerSrc} class='img-responsive' alt={this.blog.headerAlt} />
              <h2 id='titleBlog'>{this.blog.title}</h2>
              <p>Written by: Esteban A. Morales</p>
              <div class='divider' />
              <blog-contents contents={this.blog.contents}></blog-contents>
              <p id='dateBlog'>Originally published on {this.blog.date}.</p>
          </div>
          <div class='column col-2' />
        </div>
      </div>
    );
  }
}
