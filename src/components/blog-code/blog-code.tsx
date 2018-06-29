import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-code',
    styleUrl: 'blog-code.css'
})

export class BlogCode {
    constructor() { }

    @Prop() private code: string;

    render() {
        return <code>{this.code}</code>

    }
}
