import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Helmet } from '@stencil/helmet';
declare const axios: AxiosStatic;
import { domain } from '../../common';
import { AxiosStatic } from '../../axios';

interface IBlog {
  date: string,
  headeralt: string,
  headersrc: string,
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
  blogLoaded: boolean;

  componentWillLoad() {
    this.blog = {
      title: this.match.params.title,
      contents: '',
      date: '',
      headeralt: '',
      headersrc: ''
    };
    if (this.isServer === false) {
      this.getBlogPageFromDB(this.match.params.blogid)
        .then(response => {
          this.blogLoaded = true;
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
    const url = `${domain}/blog/article/id/${blogid}`;
    return axios.get(url);
  }

  disqus() {
    return {
      shortname: 'banditotr',
      config: {
        url: `http://www.banditotr.com`,
        identifier: `/blogid/${this.match.params.blogid}/title/${this.match.params.title}`,
        title: this.match.params.title
      }
    }
  }

  render() {
    const disqus = this.disqus();
    return (
      <div>
        <Helmet>
          <title>{this.blog.title}</title>
        </Helmet>
        <div class='columns'>
          <div class='column col-2' ></div>
          <div class='column col-8'>
            {this.blogLoaded ? <div></div> : <div class="loading loading-lg"></div>}
            <img src={this.convertText(this.blog.headersrc)} class='img-responsive center' alt={this.convertText(this.blog.headeralt)} />
            <h2 id='titleBlog'>{this.convertText(this.blog.title)}</h2>
            <p>Written by: Esteban A. Morales</p>
            <div class='divider' />
            <blog-contents contents={this.convertText(this.blog.contents)} />
            <p id='dateBlog'>Originally published on {this.convertText(this.blog.date)}.</p>
            <div id='disqus-commentary'>
              {/* <h1>{disqus.config.title}</h1> */}
              <disqus-comment-count shortname={disqus.shortname} config={disqus.config}>
                <p>Comments</p>
          </disqus-comment-count>
              <disqus-discussion-embed shortname={disqus.shortname} config={disqus.config} />
            </div>
          </div>
          <div class='column col-2' />
        </div>
      </div>
    );
  }


}
