import { insertScript, removeScript, debounce } from './utils';
import { Component, Prop, Watch } from '@stencil/core';
declare const window;

const queueResetCount = debounce(() => {
    if (window.DISQUSWIDGETS)
        window.DISQUSWIDGETS.getCount({ reset: true });
}, 300, false); // eslint-disable-line no-magic-numbers


@Component({
    tag: 'disqus-comment-count'
})
export class CommentCount {

    @Prop() shortname: any;
    @Prop() config: any;
    nextShortName: any;

    componentDidLoad() {
        this.loadInstance();
    }

    @Watch('shortname')
    shortNameUpdated(nextShortName) {
        if (this.shortname !== nextShortName) {
            this.nextShortName = nextShortName;
            return true;
        }
    }

    @Watch('config')
    configUpdated(newConfig) {
        const nextConfig = newConfig;
        const config = this.config;
        if (nextConfig.url === config.url || nextConfig.identifier === config.identifier)
            return false;
        return true;
    }

    componentWillUpdate() {
        if (this.shortname !== this.nextShortName) this.cleanInstance();
    }

    componentDidUpdate() {
        this.loadInstance();
    }

    loadInstance() {
        const doc = window.document;
        if (doc.getElementById('dsq-count-scr'))
            queueResetCount();
        else
            insertScript(`https://${this.shortname}.disqus.com/count.js`, 'dsq-count-scr', doc.body);
    }

    cleanInstance() {
        const body = window.document.body;
        removeScript('dsq-count-scr', body);

        // count.js only reassigns this window object if it's undefined.
        window.DISQUSWIDGETS = undefined;
    }

    render() {
        return (
            <span
                class="disqus-comment-count"
                data-disqus-identifier={this.config.identifier}
                data-disqus-url={this.config.url}
            >
                <slot />
            </span>
        );
    }
}