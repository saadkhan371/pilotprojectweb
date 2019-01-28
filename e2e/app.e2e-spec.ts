import { PilotprojectwebPage } from './app.po';

describe('pilotprojectweb App', function() {
  let page: PilotprojectwebPage;

  beforeEach(() => {
    page = new PilotprojectwebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
