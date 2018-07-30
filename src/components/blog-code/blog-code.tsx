import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-code',
    styleUrl: 'blog-code.css'
})

export class Code {
    constructor() { }

    @Prop() private code: string;
    @Prop() private language: string;
    @Prop() private caption: string;

    render() {
        return (
            <div>
                {this.language ? <p>Language: {this.language}</p> : <div></div>}
                <code>{this.code}</code>
                {this.caption ? <p id='caption'>{this.caption}</p> : <div></div>}
            </div>
        )
    }
}
