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
                            let href = '';
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
                                        message += contents[j];
                                    }
                                }
                            }
                            return <a href={href} target='_blank'>{message}</a>;
                        }
                        if (contents[index + 1] == 'b' && contents[index + 2] == 'l' && contents[index + 3] == 'o' && contents[index + 4] == 'g' && contents[index + 5] == '-'
                            && contents[index + 6] == 'f' && contents[index + 7] == 'i' && contents[index + 8] == 'g' && contents[index + 9] == 'u' && contents[index + 10] == 'r' && contents[index + 11] == 'e') {
                            message = '';
                            let href = '';
                            let src = '';
                            let alt = '';
                            let caption = '';
                            for (let i = index + 13; i < contents.length; i++) {
                                if (contents[i] == '<' && contents[i + 1] == '/' && contents[i + 2] == 'b' && contents[i + 3] == 'l' && contents[i + 4] == 'o' && contents[i + 5] == 'g'
                                    && contents[i + 6] == '-' && contents[i + 7] == 'f' && contents[i + 8] == 'i' && contents[i + 9] == 'g' && contents[i + 10] == 'u' && contents[i + 11] == 'r'
                                    && contents[i + 12] == 'e' && contents[i + 13] == '>') {
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
                                if (contents[i] == 's' && contents[i + 1] == 'r' && contents[i + 2] == 'c') {
                                    for (let j = i + 5; j < contents.length; j++) {
                                        if (contents[j] == '\'') {
                                            break;
                                        }
                                        src += contents[j];
                                    }
                                }
                                if (contents[i] == 'a' && contents[i + 1] == 'l' && contents[i + 2] == 't') {
                                    for (let j = i + 5; j < contents.length; j++) {
                                        if (contents[j] == '\'') {
                                            break;
                                        }
                                        alt += contents[j];
                                    }
                                }
                                if (contents[i] == 'c' && contents[i + 1] == 'a' && contents[i + 2] == 'p' && contents[i + 3] == 't' && contents[i + 4] == 'i' && contents [ i+ 5] == 'o' && contents [ i + 6] == 'n') {
                                    for (let j = i + 9; j < contents.length; j++) {
                                        if (contents[j] == '\'') {
                                            break;
                                        }
                                        caption += contents[j];
                                    }
                                }
                            }
                            return <blog-figure src={src} href={href} alt={alt} caption={caption}></blog-figure>;
                        }
                    }
                })}
            </div>
        )
    }
}
