import { Component, State } from '@stencil/core';
import Helmet from '@stencil/helmet';

interface IBlog { 
  date: string, 
  headerAlt: string, 
  headerSrc: string, 
  title: string, 
  id: string, 
  content: string
};

@Component({
  tag: 'blog-entry',
  styleUrl: 'blog-entry.css'
})
export class BlogEntry {
  constructor() {
    // enum DIAS {
    //   Domingo,
    //   Lunes,
    //   Martes,
    //   Miércoles,
    //   Jueves,
    //   Viernes,
    //   Sábado
    // }
    // enum MESES {
    //   Enero,
    //   Febrero,
    //   Marzo,
    //   Abril,
    //   Mayo,
    //   Junio,
    //   Julio,
    //   Agosto,
    //   Septiembre,
    //   Octubre,
    //   Noviembre,
    //   Diciembre
    // }
    // enum WEEKDAYS {
    //   Sunday,
    //   Monday,
    //   Tuesday,
    //   Wednesday,
    //   Thursday,
    //   Friday,
    //   Saturday
    // }
    enum MONTHS {
      January,
      February,
      March,
      April,
      May,
      June,
      July,
      August,
      September,
      October,
      November,
      December
    }
    this.content = '';
    const today = new Date();
    this.date = `${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  }

  // @State() private title: string;
  // @State() private date: string;
  // @State() private headerSrc: string;
  // @State() private headerAlt: string;
  // @State() private content: string;
  @State() private blog: IBlog = {
  date: '', 
  headerAlt: '', 
  headerSrc: '', 
  title: '', 
  id: '', 
  contents: ''
 };
  
  onSubmit(e) {
    //Data goes to DB
    e.preventDefault();
  }

  getValue(opts: { event; type }) {
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

  getFormattedContents(): string {
    {this.blog.content.split('').map((content, index, contents) => {
                let message = '';
                let src = '';
                let alt = '';
                let href = '';
                if (content == '<') {
                  if (contents[index + 1] == 'p') {
                    message = '';
                    for (let i = index + 3; i < contents.length; i++) {
                      if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'p' && contents[i + 3] == '>') {
                        break;
                      }
                      message += contents[i];
                    }
                    return <p>{message}</p>;
                  }
                  if (contents[index + 1] == 'h' && contents[index + 2] == '1 '|| '2'|| '3'|| '4'|| '5'|| '6') {//TODO: Fix this.
                    message = '';
                    let tag = '';              
                    for (let i = index + 4; i < contents.length; i++) {
                      if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'h' && contents[i + 3] == '1'|| '2'|| '3'|| '4'|| '5'|| '6' && contents[i + 4] == '>') {
                        tag = contents[i + 2] + contents[i + 3];
                        break;
                      }
                      message += contents[i];
                    }
                    switch(tag){
                      case'h1':
                      return <h1>{message}</h1>;
                      case'h2':
                      return <h2>{message}</h2>;
                      case'h3':
                      return <h3>{message}</h3>;
                      case'h4':
                      return <h4>{message}</h4>;
                      case'h5':
                      return <h6>{message}</h6>;
                      case'h6':
                      return <h6>{message}</h6>;
                    }
                  }
                  if (contents[index + 1] == 'a') {
                    href = '';
                    message = '';
                    for (let i = index + 3; i < contents.length; i++) {
                      if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'a' && contents[i + 3] == '>') {
                        break;
                      }
                      if (contents[i] == 'h' && contents[i + 1] == 'r' && contents[i + 2] == 'e' && contents[i + 3] == 'f') {
                        for (let j = i + 6; j < contents.length; j++) {
                          if (contents[j] == '\'') {
                            break;
                          }
                          href += contents[j];
                        }
                      }
                      if (contents[i] == '>') {
                        for (let j = i + 1; j < contents.length; j++) {
                          if (contents[j] == '<' && contents[j + 1] == '/' && contents[j + 2] == 'a' && contents[j + 3] == '>') {
                            break;
                          }
                          if (contents[j] == '<' && contents[j + 1] == 'i' && contents[j + 2] == 'm' && contents[j + 3] == 'g') {
                            src = '';
                            for (let k = j + 4; k < contents.length; k++) {
                              if (contents[k] == '/' && contents[k + 1] == '>') {
                                break;
                              }
                              if (contents[k] == 's' && contents[k + 1] == 'r' && contents[k + 2] == 'c') {
                                src = '';
                                for (let m = k + 5; m < contents.length; m++) {
                                  if (contents[m] == '\'') {
                                    break;
                                  }
                                  src += contents[m];
                                }
                              }
                              if (contents[k] == 'a' && contents[k + 1] == 'l' && contents[k + 2] == 't') {
                                alt = '';
                                for (let m = k + 5; m < contents.length; m++) {
                                  if (contents[m] == '\'') {
                                    break;
                                  }
                                  alt += contents[m];
                                }
                              }
                            }
                            return (
                              <a href={href} target='_blank'>
                                <img src={src} alt={alt} />
                              </a>
                            );
                          } else {
                            message += contents[j];
                          }
                        }
                      }
                    }
                    return (
                      <a href={href} target='_blank'>
                        {message}
                      </a>
                    );
                  }
                }
              })}
  }
  render() {
    return [
      <div>
        <Helmet>
          <title>{this.title}</title>
        </Helmet>
        <form onSubmit={e => this.onSubmit(e)} class='form-horizontal'>
          <div class='form-group col-10 col-mx-auto'>
            <label class='form-label' htmlFor='title'>
              Title
            </label>
            <input class='form-input' type='text' id='title' value={this.blog.title} onInput={event => this.getValue({ type: 'title', event: event })} />
            <label class='form-label' htmlFor='date'>
              Date
            </label>
            <input class='form-input' type='text' id='date' value={this.blog.date} onInput={event => this.getValue({ type: 'date', event: event })} />
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
      </div>,
      <div id='blog-page'>
        <div class='columns'>
          <div class='column col-2' ></div>
          <div class='column col-8'>
            <img src={this.blog.headerSrc} class='img-responsive' alt={this.blog.headerAlt} />
            <h2 id='titleBlog'>{this.blog.title}</h2>
            <p>Escrito por: Esteban A. Morales</p>
            <div class='divider' />
            <div>
              {this.getFormattedContents()}
            </div>
            <p id='dateBlog'>Written on {this.blog.date}.</p>
          </div>
          <div class='column col-2' />
        </div>
      </div>
    ];
  }
}
