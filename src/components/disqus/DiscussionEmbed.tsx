import { insertScript, removeScript } from './utils';

import { Component, Prop, Watch } from '@stencil/core';
declare const window;
@Component({
    tag: 'disqus-discussion-embed'
})

export class DiscussionEmbed {
    @Prop() shortname: any;
    @Prop() disqus_shortname: any;
    @Prop() config: any;
    nextShortName: any;

    componentWillLoad() {
        if (typeof window !== 'undefined' && window.disqus_shortname && window.disqus_shortname !== this.shortname)
            this.cleanInstance();
    }

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
        if (window && window.DISQUS && doc.getElementById('dsq-embed-scr')) {
            window.DISQUS.reset({
                reload: true,
                config: this.getDisqusConfig(this.config),
            });
        } else {
            window.disqus_config = this.getDisqusConfig(this.config);
            window.disqus_shortname = this.shortname;
            insertScript(`https://${this.shortname}.disqus.com/embed.js`, 'dsq-embed-scr', doc.body);
        }
    }

    cleanInstance() {
        const doc = window.document;
        removeScript('dsq-embed-scr', doc.body);
        if (window && window.DISQUS)
            window.DISQUS.reset({});

        try {
            delete window.DISQUS;
        } catch (error) {
            window.DISQUS = undefined;
        }
        const disqusThread = doc.getElementById('disqus_thread');
        if (disqusThread) {
            while (disqusThread.hasChildNodes())
                disqusThread.removeChild(disqusThread.firstChild);
        }
    }

    getDisqusConfig(config) {
        return function () {
            this.page.identifier = config.identifier;
            this.page.url = config.url;
            this.page.title = config.title;
            this.callbacks.onNewComment = [
                config.onNewComment,
            ];
        };
    }

    render() {
        return (
            <div id="disqus_thread"></div>
        );
    }
}