import { MyteayAdminWebPage } from './app.po';

describe('myteay-admin-web App', function() {
  let page: MyteayAdminWebPage;

  beforeEach(() => {
    page = new MyteayAdminWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
