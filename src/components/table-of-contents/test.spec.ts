import { TableOfContents } from './table-of-contents';
import { TestWindow } from '@stencil/core/testing';

describe('app-profile', () => {
  it('should build', () => {
    expect(new TableOfContents()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLTableOfContentsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [TableOfContents],
        html: '<table-of-contents></table-of-contents>'
      });
    });

    it('should not render any content if there is not a match', async () => {
      await testWindow.flush();
      expect(element.textContent).toEqual('');
    });

  //   it('should work with a name passed', async () => {
  //     element. = {
  //       path: '',
  //       url: '',
  //       isExact: false,
  //       params: {
  //         name: 'stencil'
  //       }
  //     };

  //     await testWindow.flush();
  //     expect(element.textContent).toEqual(
  //       'Hello! My name is stencil. My name was passed in through a route param!'
  //     );
  //   });
  // });
});