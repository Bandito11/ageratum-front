import {Component, Prop, State} from '@stencil/core';
import {MatchResults} from '@stencil/router';
import {getBlogPageFromDB, IBlogContent, IBlogData, getImageSrcFromStorage} from './../../mock/mock-blog-data';

@Component({tag: 'blog-page', styleUrl: 'blog-page.css'})
export class BlogPage {
  @Prop()match : MatchResults;
  @State()blogPage : IBlogData;

  componentWillLoad() {
    this.blogPage = {
      title: '',
      id: '',
      content: [],
      author: '',
      email: '',
      date: '',
      headerAlt: '',
      headerSrc: ''
    }

    getBlogPageFromDB(this.match.params.id).then(blogPage => {
      this.blogPage = {
        ...this.blogPage,
        ...blogPage
      };
    }).catch();
  }

  render() {
    return (
      <div id="blog-page">
        <div class="columns">
          <div class="columns col-2"></div>
          <div class="columns col-8">
            <div class="blog-img">
              <img
                src={getImageSrcFromStorage(this.blogPage.headerSrc)}
                class="img-responsive"
                alt={this.blogPage.headerAlt}/>
            </div>
            <h2 id="title">
              {this.blogPage.title}
            </h2>
            <p>
              Escrito por: {this.blogPage.author}
            </p>
            <div class="divider"></div>
            <div id="inline-images">
              {this
                .blogPage
                .content
                .map(content => {
                  if (content.type == 'p') {
                    return this.createParagraphTag(content);
                  } else {
                    return this.createImageTag(content)
                  }
                })}
            </div>
            <p id="date">
              Escrito en {this.blogPage.date}.
            </p>
          </div>
          <div class="columns col-2"></div>
        </div>
      </div>
    );
  }

  createParagraphTag(content : Partial < IBlogContent >) {
    return <p>{content.text}</p>;
  }

  createImageTag(content : Partial < IBlogContent >) {
    return (
      <figure class="figure">
        <a href={content.link}>
          <img
            src={getImageSrcFromStorage(content.img)}
            class="img-responsive"
            alt={content.alt}/>
        </a>
        <figcaption class="figure-caption text-center">{content.text}</figcaption>
      </figure>
    );
  };
}
