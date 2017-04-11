import { TobbyPage } from './app.po';

describe('tobby App', function() {
  let page: TobbyPage;

  beforeEach(() => {
    page = new TobbyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
