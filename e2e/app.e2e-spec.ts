import { SpellViewerPage } from './app.po';

describe('spell-viewer App', () => {
  let page: SpellViewerPage;

  beforeEach(() => {
    page = new SpellViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
