import { YogaTalkPage } from './app.po';

describe('yoga-talk App', function() {
  let page: YogaTalkPage;

  beforeEach(() => {
    page = new YogaTalkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
