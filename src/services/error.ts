import { IonicErrorHandler } from 'ionic-angular';
import Raven from '../raven';

Raven.config('https://7d9a7e5696ea480d95b808b35888b065@sentry.io/157851').install();

export class SentryErrorHandler extends IonicErrorHandler {

  handleError(error) {
    super.handleError(error);

    try {
      Raven.captureException(error.originalError || error);
    } catch(e) {
      console.error(e);
    }
  }
}

