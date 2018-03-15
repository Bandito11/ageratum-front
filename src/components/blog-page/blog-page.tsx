import {Component, Prop, State} from '@stencil/core';
import {getBlogPageFromDB, IBlogContent, IBlogData, getImageSrcFromStorage} from './../../mock/mock-blog-data';

@Component({tag: 'blog-page', styleUrl: 'blog-page.css'})
export class BlogPage {

  @Prop() id: string;
  @State() blogPage: IBlogData;

  componentWillLoad(){
    this.blogPage = {
      title:'',
      id: '',
      content: [],
      author:'',
      email: '',
      date: '',
      headerAlt:'',
      headerSrc: ''
    }

    getBlogPageFromDB(this.id)
    .then(blogPage =>{
      this.blogPage = {...this.blogPage, ...blogPage};
    })
    .catch();
  }

  render() {
    return (
      <div id="blog-page" class='container'>
        <div class="blog-img">
          <img
            src={getImageSrcFromStorage(this.blogPage.headerSrc)}
            class="img-responsive"
            alt={this.blogPage.headerAlt}/>
        </div>
        <h3 id="title">
          {this.blogPage.title}
        </h3>
        <p>
          Escrito por:
        </p>
        <h5>
          {this.blogPage.author}
        </h5>
        <div class="divider"></div>
        <div id="inline-images">
          {this.blogPage
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
        {/* <stencil-route-link url='/profile/stencil'>
            <button>
              Profile page
            </button>
          </stencil-route-link>  */}
      </div>
    );
  }

  createParagraphTag(content : Partial < IBlogContent >){
return <p>{content.text}</p>;
  }

  createImageTag(content : Partial < IBlogContent >) {
    return (
      <figure class="figure">
        <a href={content.link}>
          <img src={getImageSrcFromStorage(content.img)} class="img-responsive" alt={content.alt}/>
        </a>
        <figcaption class="figure-caption text-center">{content.text}</figcaption>
      </figure>
    );
  };
}
