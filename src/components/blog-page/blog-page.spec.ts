import { render } from '@stencil/core/testing';
import { BlogPage } from './blog-page';

describe('app', () => {
  it('should build', () => {
    expect(new BlogPage()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [BlogPage],
        html: '<app-home></app-home>'
      });
    });
  });
});