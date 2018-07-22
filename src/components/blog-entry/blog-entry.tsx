import { Component, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';
import { IBlog, MONTHS, WEEKDAYS, domain } from '../../common';

@Component({
  tag: 'blog-entry',
  styleUrl: 'blog-entry.css'
})
export class Entry {
  constructor() { }

  private date;
  @State() private blog: IBlog;
  private appName;
  private password;

  componentWillLoad() {
    this.blog = {
      date: '',
      headeralt: '',
      headersrc: '',
      title: '',
      id: '',
      contents: ''
    };
    const today = new Date();
    let currentMonth = MONTHS[today.getMonth()];
    currentMonth = currentMonth[0].toUpperCase() + currentMonth.slice(1, currentMonth.length);
    let currentWeekday = WEEKDAYS[today.getDay()];
    currentWeekday = currentWeekday[0].toUpperCase() + currentWeekday.slice(1, currentWeekday.length);
    // this.date = `${currentWeekday} ${today.getDate()} de ${currentMonth} de ${today.getFullYear()}`; //En español
    this.date = `${currentMonth} ${today.getDate()}, ${today.getFullYear()}`; //In English
    this.blog = {
      ...this.blog,
      date: this.date
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    //TODO: HTTP POST
    try {
      if (confirm('Do you want to save?')) {
        if (typeof (Storage) !== "undefined") {
          const token = sessionStorage.token;
          if (token) {
            const entryResponse = await this.createEntry({ token: token, blog: this.blog });
            if (entryResponse.status == 200) {
              if (entryResponse.data.success) {
                alert('Blog was saved successfully!');
              }
              // if(entryResponse.data.error == 'JsonWebTokenError' || 'TokenExpiredError' || 'NotBeforeError') {
              //   this.generateToken({ appName: this.appName, password: this.password });
              //   this.onSubmit(e);    
              // }
            }
          } else {
            // Generate new token using username/password
            const error = await this.generateToken({ appName: this.appName, password: this.password });
            if (error) throw new Error(error)
            this.onSubmit(e);
          }
        }
      } else {
        alert('Entry was canceled by the user. Entry was not save on DB.')
      }
    } catch (error) {
      alert(error);
    }
  }

  async generateToken(opts: { appName, password }) {
    const url = `${domain}/authenticate`;
    try {
      const response = await axios.post(url, { appname: opts.appName, key: opts.password });
      if (response.status == 200) {
        if (response.data.success) {
          sessionStorage.token = response.data.data;
        } else {
          return response.data.error;
        }
      }
    } catch (error) {
      return error;
    }

  }

  createEntry(opts: { token: string, blog: IBlog }) {
    const correctedBlog: IBlog = {
      id: '',
      title: this.convertText(opts.blog.title),
      headersrc: this.convertText(opts.blog.headersrc),
      headeralt: this.convertText(opts.blog.headeralt),
      contents: this.convertText(opts.blog.contents),
      date: this.convertText(opts.blog.date)
    };
    const url = `${domain}/create`;
    const config = {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`
      }
    };
    return axios.post(url, correctedBlog, config);
  }

  getValue(opts: { event; type: string }) {
    switch (opts.type) {
      case 'appName':
        this.appName = opts.event.target.value;
        break;
      case 'password':
        this.password = opts.event.target.value;
        break;
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
      case 'headersrc':
        this.blog = {
          ...this.blog,
          headersrc: opts.event.target.value
        };
        break;
      case 'headeralt':
        this.blog = {
          ...this.blog,
          headeralt: opts.event.target.value
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

  convertText(text: string) {
    let convertedText = text.split('').map(value => {
      if (value == '/') {
        return '}';
      }
      if (value == '?') {
        return '{';
      }
      return value;
    }).join('');
    return convertedText;
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
                  <label class='form-label' htmlFor='appName'>App Name</label>
                  <input
                    class='form-input'
                    type='password'
                    id='appName'
                    value={this.appName}
                    onInput={event => this.getValue({ type: 'appName', event: event })} />
                  <label class='form-label' htmlFor='password'>Password</label>
                  <input
                    class='form-input'
                    type='password'
                    id='password'
                    value={this.password}
                    onInput={event => this.getValue({ type: 'password', event: event })} />
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
                    placeholder={this.date}
                    onInput={event => this.getValue({ type: 'date', event: event })} />
                  <label class='form-label' htmlFor='headersRC'>Header SRC</label>
                  <input
                    class='form-input'
                    type='text'
                    id='headersRC'
                    value={this.blog.headersrc}
                    onInput={event => this.getValue({ type: 'headersrc', event: event })} />
                  <label class='form-label' htmlFor='headeraLT'>Header ALT</label>
                  <input
                    class='form-input'
                    type='text'
                    id='headeraLT'
                    value={this.blog.headeralt}
                    onInput={event => this.getValue({ type: 'headeralt', event: event })} />
                  <hr />
                  <textarea
                    id='textarea'
                    class='form-input'
                    value={this.blog.contents}
                    onInput={event => this.getValue({ type: 'textarea', event: event })} />
                </div>
                <button type='submit' class='btn btn-primary'>Create Blog</button>
              </form>
            </div>
            <div class='column col-md-10 col-6 col-mx-auto'>
              <img src={this.blog.headersrc} class='img-responsive' alt={this.blog.headeralt} />
              <h2 id='titleBlog'>{this.blog.title}</h2>
              <p>Written by: Esteban A. Morales</p>
              <div class='divider' />
              <blog-contents contents={this.blog.contents} />
              <p id='dateBlog'>Originally published on {this.blog.date}.</p>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}
