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
        this.disqus();
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

  getDisqus() {
    const url = `${domain}/blog/disqus-auth/blogid/${this.match.params.blogid}/title/${this.blog.title}`;
    return axios.get(url)
  }

  shortname;
  config = {
    shortname: '',
    config: {
      identifier: '',
      url: ''
    }
  };
  disqus() {
    // let response = {
    //   shortname: '',
    //   config: {
    //     identifier: '',
    //     url: ''
    //   }
    // }
      this.getDisqus()
        .then(response => {
          if (response.status = 200) {
            this.shortname = response.data.shortname;
            this.config = {
              ...this.config,
              ...response.data.config
            }
          }
        })
      // return { f
      //   shortname: 'banditotr',
      //   config: {
      //     url: `https://www.banditotr.com`,
      //     identifier: `/blogid/${this.match.params.blogid}/title/${this.blog.title}`
      //   }
      // }
    }

  render() {
      return (
        <div>
          <Helmet>
            <title>{this.blog.title}</title>
            {/* <!-- HTML Meta Tags --> */}
            <meta name="description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />

            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content={`BanditoTR: ${this.blog.title}`} />
            <meta itemprop="description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
            <meta itemprop="image" content="https://www.banditotr.com/assets/icon/icon.png" />

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content={`https://www.banditotr.com/blogid/${this.match.params.blogid}/title/${this.blog.title}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`BanditoTR: ${this.blog.title}`} />
            <meta property="og:description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
            <meta property="og:image" content="https://www.banditotr.com/assets/icon/icon.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`BanditoTR: ${this.blog.title}`} />
            <meta name="twitter:description" content="Tutorials about TypeScript, HTML5, frameworks like Angular and Ionic and web tools like StencilJS." />
            <meta name="twitter:image" content="https://www.banditotr.com/assets/icon/icon.png" />

            {/* <!-- Meta Tags Generated via http://heymeta.com --> */}
          </Helmet>
          <div class='columns'>
            <div class='column col-2 col-sm-1' ></div>
            <div class='column col-8 col-sm-10'>
              {this.blogLoaded ? <div></div> : <div class="loading loading-lg"></div>}
              <img src={this.convertText(this.blog.headersrc)} class='img-responsive center' alt={this.convertText(this.blog.headeralt)} />
              <h2 id='titleBlog'>{this.convertText(this.blog.title)}</h2>
              <p>Written by: Esteban A. Morales</p>
              <div class='divider' />
              <blog-contents contents={this.convertText(this.blog.contents)} />
              <p id='dateBlog'>Originally published on {this.convertText(this.blog.date)}.</p>
              <div id='disqus-commentary'>
                <disqus-discussion-embed shortname={this.shortname} config={this.config} />
              </div>
            </div>
            <div class='column col-2 col-sm-1' />
          </div>
        </div>
      );
    }
  }
