import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-code',
    styleUrl: 'blog-code.css'
})

export class Code {
    constructor() { }

    @Prop() private code: string;

    render() {
        return <code>{this.code}</code>

    }
}
