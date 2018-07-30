import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-figure',
    styleUrl: 'blog-figure.css'
})

export class Figure {
    constructor() { }

    @Prop() private href: string;
    @Prop() private src: string;
    @Prop() private alt: string;
    @Prop() private caption: string;

    render() {
        return (
            <figure class="figure">
                {this.href ? <a href={this.href} target="_blank">
                    <img src={this.src} class="img-responsive" alt={this.alt} />
                </a> : <img src={this.src} class="img-responsive" alt={this.alt} />}
                {this.caption ? <figcaption id='caption' class="figure-caption text-center">{this.caption}</figcaption> : <div></div>}
            </figure>
        )

    }
}
