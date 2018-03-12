import {Component} from '@stencil/core';
import {blogPage, getImageSrc, IBlogContent} from './../../mock/mock-blog-data';

@Component({tag: 'blog-page', styleUrl: 'blog-page.css'})
export class BlogPage {
  render() {
    return (
      <div id="blog-page" class='container'>
        <div class="blog-img">
          <img
            src={getImageSrc('x1235')}
            class=" img-responsive"
            alt="Una computadora de un diseñador de páginas de internet"/>
        </div>
        <h3 id="title">
          {blogPage.title}
        </h3>
        <p>
          Escrito por:
        </p>
        <h5>
          {blogPage.author}
        </h5>
        <div class="divider"></div>
        <div id="inline-images">
          {blogPage
            .content
            .map(content => {
              if (content.type == 'p') {
                return <p>{content.text}</p>
              } else {
                return this.image(content)
              }
            })}
        </div>
        <p id="date">
          Escrito en {blogPage.date}.
        </p>
        {/* <stencil-route-link url='/profile/stencil'>
            <button>
              Profile page
            </button>
          </stencil-route-link>  */}
      </div>
    );
  }

  image(content: Partial<IBlogContent>) {
    return (
        <a href={content.link}>
          <img
            src={getImageSrc(content.img)}
            class="img-responsive"
            alt={content.alt}/>
        </a>
    );
  };
}
