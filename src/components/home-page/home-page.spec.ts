import { HomePage } from './home-page';
import { render } from '@stencil/core/testing';

describe('app', () => {
  it('should build', () => {
    expect(new HomePage()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [HomePage],
        html: '<app-home></app-home>'
      });
    });
  });
});