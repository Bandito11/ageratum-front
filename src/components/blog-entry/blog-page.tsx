import { Component, State } from "@stencil/core";

@Component({
  tag: "blog-entry",
  styleUrl: "blog-entry.css"
})
export class BlogEntry {
  constructor() {
    enum WEEKDAYS {
      Domingo,
      Lunes,
      Martes,
      Miércoles,
      Jueves,
      Viernes,
      Sábado
    }
    enum MONTHS {
      Enero,
      Febrero,
      Marzo,
      Abril,
      Mayo,
      Junio,
      Julio,
      Agosto,
      Septiembre,
      Octubre,
      Noviembre,
      Diciembre
    }
    this.content = "";
    const today = new Date();
    this.date = `${WEEKDAYS[today.getDay()]} ${today.getDate()} de ${
      MONTHS[today.getMonth()]
    } de ${today.getFullYear()}`;
  }

  @State() private title;
  @State() private date;
  @State() private headerSrc;
  @State() private headerAlt;
  @State() private content: string;

  onSubmit(e) {
    //Data goes to DB
    e.preventDefault();
  }

  getValue(opts: { event; type }) {
    switch (opts.type) {
      case "title":
        this.title = opts.event.target.value;
        break;
      case "date":
        this.date = opts.event.target.value;
        break;
      case "headerSrc":
        this.headerSrc = opts.event.target.value;
        break;
      case "headerAlt":
        this.headerAlt = opts.event.target.value;
        break;
      case "textarea":
        this.content = opts.event.target.value;
        break;
    }
  }

  //TODO: Add [] in render to I can just add getHTML() directly without using a function in render.
  render() {
    return [
      <div>
        <form onSubmit={e => this.onSubmit(e)} class="form-horizontal">
          <div class="form-group col-10 col-mx-auto">
            <label class="form-label" htmlFor="title">
              Title
            </label>
            <input
              class="form-input"
              type="text"
              id="title"
              value={this.title}
              onInput={event => this.getValue({ type: "title", event: event })}
            />

            <label class="form-label" htmlFor="date">
              Date
            </label>
            <input
              class="form-input"
              type="text"
              id="date"
              value={this.date}
              onInput={event => this.getValue({ type: "date", event: event })}
            />

            <label class="form-label" htmlFor="headerSRC">
              Header SRC
            </label>
            <input
              class="form-input"
              type="text"
              id="headerSRC"
              value={this.headerSrc}
              onInput={event =>
                this.getValue({ type: "headerSrc", event: event })
              }
            />

            <label class="form-label" htmlFor="headerALT">
              Header ALT
            </label>
            <input
              class="form-input"
              type="text"
              id="headerALT"
              value={this.headerAlt}
              onInput={event =>
                this.getValue({ type: "headerAlt", event: event })
              }
            />
            <hr />
            <textarea
              id="textarea"
              class="form-input"
              value={this.content}
              onInput={event =>
                this.getValue({ type: "textarea", event: event })
              }
            />
          </div>
        </form>
      </div>,
      <div id="blog-page">
        <div class="columns">
          <div class="column col-2" />
          <div class="column col-8">
            <img
              src={this.headerSrc}
              class="img-responsive"
              alt={this.headerAlt}
            />
            <h2 id="titleBlog">{this.title}</h2>
            <p>Escrito por: Esteban A. Morales</p>
            <div class="divider" />
            <div>
              {this.content.split("").map((content, index, contents) => {
                let message = "";
                let src = "";
                let alt = "";
                let href = "";
                if (content == "<") {
                  if (contents[index + 1] == "p") {
                    message = "";
                    for (let i = index + 3; i < contents.length; i++) {
                      if (
                        contents[i] == "<" &&
                        contents[i + 1] == "/" &&
                        contents[i + 2] == "p" &&
                        contents[i + 3] == ">"
                      ) {
                        break;
                      }
                      message += contents[i];
                    }
                    return <p>{message}</p>;
                  }
                  if (contents[index + 1] == "a") {
                    href = "";
                    message = "";
                    for (let i = index + 3; i < contents.length; i++) {
                      if (
                        contents[i] == "<" &&
                        contents[i + 1] == "/" &&
                        contents[i + 2] == "a" &&
                        contents[i + 3] == ">"
                      ) {
                        break;
                      }
                      if (
                        contents[i] == "h" &&
                        contents[i + 1] == "r" &&
                        contents[i + 2] == "e" &&
                        contents[i + 3] == "f"
                      ) {
                        for (let j = i + 6; j < contents.length; j++) {
                          if (contents[j] == '"') {
                            break;
                          }
                          href += contents[j];
                        }
                      }
                      if (contents[i] == ">") {
                        for (let j = i + 1; j < contents.length; j++) {
                          if (
                            contents[j] == "<" &&
                            contents[j + 1] == "/" &&
                            contents[j + 2] == "a" &&
                            contents[j + 3] == ">"
                          ) {
                            break;
                          }
                          if (
                            contents[j] == "<" &&
                            contents[j + 1] == "i" &&
                            contents[j + 2] == "m" &&
                            contents[j + 3] == "g"
                          ) {
                            src = "";
                            for (let k = j + 5; k < contents.length; k++) {
                              if (
                                contents[k] == "/" &&
                                contents[k + 1] == ">"
                              ) {
                                break;
                              }
                              if (
                                contents[k] == "<" &&
                                contents[k + 1] == "s" &&
                                contents[k + 2] == "r" &&
                                contents[k + 3] == "c"
                              ) {
                                src = "";
                                for (let m = k + 6; m < contents.length; m++) {
                                  if (contents[m] == '"') {
                                    break;
                                  }
                                  src += contents[m];
                                }
                              }
                              if (
                                contents[k] == "<" &&
                                contents[k + 1] == "a" &&
                                contents[k + 2] == "l" &&
                                contents[k + 3] == "t"
                              ) {
                                alt = "";
                                for (let m = k + 6; m < contents.length; m++) {
                                  if (contents[m] == '"') {
                                    break;
                                  }
                                  alt += contents[m];
                                }
                              }
                            }
                            return (
                              <a href={href} target="_blank">
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
                      <a href={href} target="_blank">
                        {message}
                      </a>
                    );
                  }
                }
              })}
            </div>
            <p id="dateBlog">Escrito el {this.date}.</p>
          </div>
          <div class="column col-2" />
        </div>
      </div>
    ];
  }
}
