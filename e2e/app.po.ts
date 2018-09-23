import { browser, by, element } from 'protractor';

export class AppPage {
  navigateLogin(): any {
    return browser.get('/login');
  }
  navigateTo() {
    return browser.get('/');
  }

  navigateClubs() {
    return browser.get('clubs');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
