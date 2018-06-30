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
                            let src = '';
                            let alt = '';
                            let href = '';
                            message = '';
                            let caption = '';
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
                                        } else {
                                            message += contents[j];
                                        }
                                        if (contents[j] == '<' && contents[j + 1] == 'c' && contents[j + 2] == 'a' && contents[j + 3] == 'p' && contents[j + 4] == 't' && contents[j + 5] == 'i' && contents[j + 6] == 'o' && contents[j + 7] == 'n' && contents[j + 8] == '>') {
                                            caption = '';
                                            for (let n = j + 9; n < contents.length; n++) {
                                                if (contents[n] == '<' && contents[n + 1] == '/' && contents[n + 2] == 'c' && contents[n + 3] == 'a' && contents[n + 4] == 'p' && contents[n + 5] == 't' && contents[n + 6] == 'i' && contents[n + 7] == 'o' && contents[n + 8] == 'n' && contents[n + 9] == '>' && contents[n + 10] == '<' && contents[n + 11] == '/' && contents[n + 12] == 'a' && contents[n + 13] == '>') {
                                                    return <blog-figure href={href} src={src} alt={alt} caption={caption}></blog-figure>;
                                                }
                                                caption += contents[n];
                                            }
                                        }else{
                                            return <a href={href} target='_blank'><img src={src} alt={alt} /></a>
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
