const RADIX_BASE = 36;
import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'disqus-comment-embed'
})

export class CommentEmbed {
    @Prop() commentId: any;
    @Prop() showParentComment: any;
    @Prop() showMedia: any;
    @Prop() width: any;
    @Prop() height: any;
    static defaultProps: { showMedia: boolean; showParentComment: boolean; width: number; height: number; };

    getSrc() {
        const post = Number(this.commentId).toString(RADIX_BASE);
        const parentParam = this.showParentComment ? '1' : '0';
        const mediaParam = this.showMedia ? '1' : '0';

        return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
    }

    render() {
        return (
            <iframe
                src={this.getSrc()}
                width={this.width}
                height={this.height}
                seamless="seamless"
                scrolling="no"
                frameBorder="0"
            />
        );
    }
}

CommentEmbed.defaultProps = {
    showMedia: true,
    showParentComment: true,
    width: 420,
    height: 320,
};