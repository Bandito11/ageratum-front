import { Component, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';

interface IBlog {
  id: string,
  title: string,
  date: string,
  headerAlt: string,
  headerSrc: string,
  contents: string
};

@Component({
  tag: 'blog-entry',
  styleUrl: 'blog-entry.css'
})
export class Entry {
  constructor() { }

  @State() private date: string;
  @State() private blog: IBlog = {
    date: '',
    headerAlt: '',
    headerSrc: '',
    title: '',
    id: '',
    contents: ''
  };
  componentWillLoad() {
    enum MONTHS {
      enero,
      febrero,
      marzo,
      abril,
      mayo,
      junio,
      julio,
      agosto,
      septiembre,
      octubre,
      noviembre,
      diciembre
    }
    const today = new Date();
    let currentMonth = MONTHS[today.getMonth()];
    currentMonth = currentMonth[0].toUpperCase() + currentMonth.slice(1, currentMonth.length);
    this.date = `${currentMonth} ${today.getDate()}, ${today.getFullYear()}`;
  }

  onSubmit(e) {
    e.preventDefault();
        //TODO: HTTP POST
  }

  getValue(opts: { event; type: string }) {
    switch (opts.type) {
      case 'title':
        this.blog = {
          ...this.blog,
          title: opts.event.target.value
        };
        break;
      case 'date':
        this.blog = {
          ...this.blog,
          date: opts.event.target.value
        };
        break;
      case 'headerSrc':
        this.blog = {
          ...this.blog,
          headerSrc: opts.event.target.value
        };
        break;
      case 'headerAlt':
        this.blog = {
          ...this.blog,
          headerAlt: opts.event.target.value
        };
        break;
      case 'textarea':
        this.blog = {
          ...this.blog,
          contents: opts.event.target.value
        };
        break;
    }
  }

  render() {
    return [
      <div>
        <Helmet>
          <title>{this.blog.title}</title>
        </Helmet>
        <div class='container'>
          <div class='columns'>
            <div class='column col-md-10 col-6 col-mx-auto'>
              <form onSubmit={e => this.onSubmit(e)} class='form-horizontal'>
                <div class='form-group'>
                  <label class='form-label' htmlFor='title'>
                    Title
            </label>
                  <input class='form-input' type='text' id='title' value={this.blog.title} onInput={event => this.getValue({ type: 'title', event: event })} />
                  <label class='form-label' htmlFor='date'>
                    Date
            </label>
                  <input class='form-input' type='text' id='date' value={this.date} onInput={event => this.getValue({ type: 'date', event: event })} />
                  <label class='form-label' htmlFor='headerSRC'>
                    Header SRC
            </label>
                  <input class='form-input' type='text' id='headerSRC' value={this.blog.headerSrc} onInput={event => this.getValue({ type: 'headerSrc', event: event })} />
                  <label class='form-label' htmlFor='headerALT'>
                    Header ALT
            </label>
                  <input class='form-input' type='text' id='headerALT' value={this.blog.headerAlt} onInput={event => this.getValue({ type: 'headerAlt', event: event })} />
                  <hr />
                  <textarea id='textarea' class='form-input' value={this.blog.contents} onInput={event => this.getValue({ type: 'textarea', event: event })} />
                </div>
              </form>
            </div>
            <div class='column col-md-10 col-6 col-mx-auto'>
              <img src={this.blog.headerSrc} class='img-responsive' alt={this.blog.headerAlt} />
              <h2 id='titleBlog'>{this.blog.title}</h2>
              <p>Escrito por: Esteban A. Morales</p>
              <div class='divider' />
              <blog-contents contents={this.blog.contents}></blog-contents>
              <p id='dateBlog'>Originalmente publicado en {this.date}.</p>
            </div>
          </div>
        </div>
      </div>,
    ];
  }
}
