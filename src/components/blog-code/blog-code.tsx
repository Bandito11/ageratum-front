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
      <pre class="code" data-lang={this.language ? this.language : ""}>
        <code>
          {this.code}
        </code>
        {this.caption ? <p id='caption'>{this.caption}</p> : <div></div>}
      </pre>
    )
  }
}

//Example from Spectre 
{/* <code>
<span class="com">&lt;!-- code snippets --&gt;</span>
 &lt;<span class="tag">button</span><span class="atn">class</span>=<span class="atv">&quot;btn&quot;</span>&gt;
   Submit
  &lt;<span class="tag">/button</span>&gt;
</code> */}

// Original version
  // <div>
  //   {this.language ? <p>Language: {this.language}</p> : <div></div>}
  //   <code>{this.code}</code>
  //   {this.caption ? <p id='caption'>{this.caption}</p> : <div></div>}
  // </div> */}
