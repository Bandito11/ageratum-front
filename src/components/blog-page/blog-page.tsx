import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';

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

export class BlogPage {
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
    if (this.isServer == false) {
      this.getBlogPageFromDB(this.match.params.blogid)
        .then(response => {
          if (response.status == 200) {
            response.data.success ? this.blog = {
              ...this.blog,
              ...response.data.data
            } :
              alert('There was an error retrieving the data. Please reload the page and try again!');
          }
        });
    }
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

  getBlogPageFromDB(blogid: string) {
    const url = `http://localhost:5000/blog/article/id/${blogid}`;
    return axios.get(url);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.blog.title}</title>
        </Helmet>
        <div class='columns'>
          <div class='column col-2' ></div>
          <div class='column col-8'>
            <img
              src={this.convertText(this.blog.headerSrc)}
              class='img-responsive'
              alt={this.convertText(this.blog.headerAlt)}
            />
            <h2 id='titleBlog'>{this.convertText(this.blog.title)}</h2>
            <p>Escrito por: Esteban A. Morales</p>
            <div class='divider' />
            <blog-contents contents={this.convertText(this.blog.contents)} />
            <p id='dateBlog'>Originalmente publicado en {this.convertText(this.blog.date)}.</p>
          </div>
          <div class='column col-2' />
        </div>
      </div>
    );
  }
}
