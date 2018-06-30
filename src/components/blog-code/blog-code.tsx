import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-code',
    styleUrl: 'blog-code.css'
})

export class Code {
    constructor() { }

    @Prop() private code: string;
    @Prop() private language: string;

    render() {
        return (
            <div>
                <p>Language: {this.language}</p>
                <code>{this.code}</code>
            </div>
            )
    }
}
