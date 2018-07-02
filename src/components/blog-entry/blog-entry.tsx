import { Component, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';
import { MONTHS, WEEKDAYS } from 'common';
declare const axios: axios;

@Component({
  tag: 'blog-entry',
  styleUrl: 'blog-entry.css'
})
export class Entry {
  constructor() { }

  @State() private date: string;
  @State() private blog: IBlog;
  @State() private appName;
  @State() private key;

  componentWillLoad() {
    this.blog = {
      date: '',
      headerAlt: '',
      headerSrc: '',
      title: '',
      id: '',
      contents: ''
    };
    const today = new Date();
    let currentMonth = MONTHS[today.getMonth()];
    currentMonth = currentMonth[0].toUpperCase() + currentMonth.slice(1, currentMonth.length);
    let currentWeekday = WEEKDAYS[today.getDay()];
    currentWeekday = currentWeekday[0].toUpperCase() + currentWeekday.slice(1, currentWeekday.length);
    this.date = `${currentWeekday} ${today.getDate()} de ${currentMonth} de ${today.getFullYear()}`;
  }

  async onSubmit(e) {
    e.preventDefault();
    //TODO: HTTP POST
    try {
      const url = `http://localhost:5000/create/`;
      const config = {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      };
      const response = await axios.post(url, this.blog, config);
      if(response.status == 200){
        if(response.data.success){
          alert(response.data.data)
        }else{
          alert(response.data.error)
        }
      }else{
        if(response.status == 403){
          console.error('Error posting data due to server issues.');
          console.error(response);
        }
      }
      } catch (error) {
      console.error(error);
      //TODO: Implement error handler.
    }
  }

  verifyUser(user) {
    const url = `http://localhost:5000/authenticate/`;
    const config = {
      headers: {
        'appName': user.appName,
        'key': user.key
      }
    };
    return axios.post(url, {}, config);
  }

  createEntry(blog) {
    // const url = `http://localhost:5000/create/title/${blog.title}/date/${blog.date}/headersrc/${blog.headerSrc}/headeralt/${blog.headerAlt}/contents/${blog.contents}`;
    const url = `http://localhost:5000/create/`;
    const config = {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    };
    return axios.post(url, blog, config);
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
          <title>New Blog Entry</title>
        </Helmet>
        <div class='container'>
          <div class='columns'>
            <div class='column col-md-10 col-6 col-mx-auto'>
              <form onSubmit={e => this.onSubmit(e)} class='form-horizontal'>
                <div class='form-group'>
                  <label class='form-label' htmlFor='title'>Title</label>
                  <input
                    class='form-input'
                    type='text'
                    id='title'
                    value={this.blog.title}
                    onInput={event => this.getValue({ type: 'title', event: event })} />
                  <label class='form-label' htmlFor='date'>Date</label>
                  <input
                    class='form-input'
                    type='text'
                    id='date'
                    value={this.date}
                    onInput={event => this.getValue({ type: 'date', event: event })} />
                  <label class='form-label' htmlFor='headerSRC'>Header SRC</label>
                  <input
                    class='form-input'
                    type='text'
                    id='headerSRC'
                    value={this.blog.headerSrc}
                    onInput={event => this.getValue({ type: 'headerSrc', event: event })} />
                  <label class='form-label' htmlFor='headerALT'>Header ALT</label>
                  <input
                    class='form-input'
                    type='text'
                    id='headerALT'
                    value={this.blog.headerAlt}
                    onInput={event => this.getValue({ type: 'headerAlt', event: event })} />
                  <hr />
                  <textarea
                    id='textarea'
                    class='form-input'
                    value={this.blog.contents}
                    onInput={event => this.getValue({ type: 'textarea', event: event })} />
                </div>
              </form>
            </div>
            <div class='column col-md-10 col-6 col-mx-auto'>
              <img
                src={this.blog.headerSrc}
                class='img-responsive'
                alt={this.blog.headerAlt}
              />
              <h2 id='titleBlog'>{this.blog.title}</h2>
              <p>Escrito por: Esteban A. Morales</p>
              <div class='divider' />
              <blog-contents contents={this.blog.contents} />
              <p id='dateBlog'>Originalmente publicado en {this.date}.</p>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}
