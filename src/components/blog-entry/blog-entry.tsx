import { Component, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import axios from '../../IAxios';
import { IBlog, MONTHS, WEEKDAYS } from '../../common';

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
  // @State() private appName;
  // @State() private key;

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
    this.blog = {
      ...this.blog,
      date: this.date
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    //TODO: HTTP POST
    try {
      const response = await this.createEntry({ appName: this.appName, password: this.password, blog: this.blog });
      if (response.status == 200) {
        console.log(response)
        // if (response.data.success) {
        //   console.log(response.data.data)
        // } else {
        //   console.log(response.data.error)
        // }
      } else {
        if (response.status == 403) {
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

  createEntry(opts: { appName, password, blog: IBlog }) {
    const correctedBlog: IBlog = {
    id: '',
    title: this.convertText(opts.blog.title),
    headerSrc: this.convertText(opts.blog.headerSrc),
    headerAlt: this.convertText(opts.blog.headerAlt),
    contents: this.convertText(opts.blog.contents),
    date: this.convertText(opts.blog.date)
    }
    const url = `http://localhost:5000/blog/create`
    const config = {
      headers: {
        'Authorization': `Bearer banditoisgreat!`
      }
    };
    return axios.post(url, { appname: opts.appName, password: opts.password, blog: correctedBlog }, config);
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
                    type='text'
                    id='appName'
                    value={this.appName}
                    onInput={event => this.getValue({ type: 'appName', event: event })} />
                  <label class='form-label' htmlFor='password'>Password</label>
                  <input
                    class='form-input'
                    type='text'
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
                <button type='submit' class='btn btn-primary'>Create Blog</button>
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
              <p id='dateBlog'>Originalmente publicado en {this.blog.date}.</p>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}
