import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-contents',
    styleUrl: 'blog-contents.css'
})

export class Contents {
    constructor() { }

    @Prop() private contents: string;

    render() {
        return (
            <div>
                {this.contents.split('').map((content, index, contents) => {
                    let message = '';
                    let src = '';
                    let alt = '';
                    let href = '';
                    if (content == '<') {
                        if (contents[index + 1] == 'h' && contents[index + 3] == '>') {
                            message = '';
                            let tag = '';
                            for (let i = index + 4; i < contents.length; i++) {
                                if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'h' && contents[i + 4] == '>') {
                                    tag = contents[i + 2] + contents[i + 3];
                                    break;
                                }
                                message += contents[i];
                            }
                            switch (tag) {
                                case 'h1':
                                    return <h1>{message}</h1>;
                                case 'h2':
                                    return <h2>{message}</h2>;
                                case 'h3':
                                    return <h3>{message}</h3>;
                                case 'h4':
                                    return <h4>{message}</h4>;
                                case 'h5':
                                    return <h6>{message}</h6>;
                                case 'h6':
                                    return <h6>{message}</h6>;
                            }
                        }
                        if (contents[index + 1] == 'p' && contents[index + 2] == '>') {
                            message = '';
                            for (let i = index + 3; i < contents.length; i++) {
                                if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'p' && contents[i + 3] == '>') {
                                    break;
                                }
                                message += contents[i];
                            }
                            return <p>{message}</p>;
                        }
                        if (contents[index + 1] == 'a' && (contents[index + 3] == 'h' && contents[index + 4] == 'r' && contents[index + 5] == 'e' && contents[index + 6] == 'f')) {
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
                                            return <a href={href} target='_blank'><img src={src} alt={alt} /></a>;
                                        } else {
                                            message += contents[j];
                                        }
                                    }
                                }
                            }
                            return <a href={href} target='_blank'>{message}</a>;
                        }
                    }
                })}
            </div>
        )
    }
}
