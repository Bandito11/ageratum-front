import {Component, State, Prop} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import {getListOfArticles, IBlogData, getImageSrcFromStorage} from '../../mock/mock-blog-data';

@Component({tag: 'table-of-contents', styleUrl: 'table-of-contents.css'})
export class TableOfContents {
  @Prop()history : RouterHistory;
  @State()listOfArticles : Partial < IBlogData > [];

  componentWillLoad() {
    this.listOfArticles = [];
    getListOfArticles().then(list => {
      this.listOfArticles = [
        ...this.listOfArticles,
        ...list
      ];
    }).catch();
  }

  render() {
    return (
      <div id="table-of-contents">
        <div class="columns">
          {this
            .listOfArticles
            .map(article => <div class="column col-4">
              <stencil-route-link url={`/blog/${article.id}`}>
                <div class="card">
                  <div class="card-header">
                    <div class="card-title h5">
                      {article.title}
                    </div>
                    <div class="card-subtitle text-gray">
                      {article.date}
                    </div>
                  </div>
                  <div class="card-image">
                    <img
                      src={getImageSrcFromStorage(article.headerSrc)}
                      class="img-responsive"
                      alt={article.headerAlt}/>
                  </div>
                  <div class="card-body">
                    {article
                      .content[0]
                      .text
                      .slice(0, 250)}...
                  </div>
                </div>
                <br/>
              </stencil-route-link>
            </div>)}
        </div>
      </div>
    );
  }
}
