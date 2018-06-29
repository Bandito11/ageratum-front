import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'blog-figure',
    styleUrl: 'blog-figure.css'
})

export class BlogFigure {
    constructor() { }

    @Prop() private link: string;
    @Prop() private src: string;
    @Prop() private alt: string;
    @Prop() private text: string;

    render() {
        return (
            <figure class="figure">
            <a href={this.link} target="_blank">
              <img src={this.src} class="img-responsive" alt={this.alt} />
            </a>
            <figcaption class="figure-caption text-center">{this.text}</figcaption>
          </figure>
        )

    }
}
