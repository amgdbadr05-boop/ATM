# MediTouch ATM - Front-end only
Open `index.html` in any browser (no build, no server). All data is simulated in `js/api.js` (yellow DEMO banner).
Demo values: OTP code `1234` | any ID of 6-12 digits works | an ID starting with `000` = "not registered" (try registration).
Tests: `npm i && npm test`.

css/ one file per area (nav, forms, booking, ticket + print 80mm, responsive, adaptive = overflow/compact/kiosk scaling)
js/  config, state, i18n, language, data (demo departments), api (demo adapter - the only file to replace for a real backend),
     barcode (Code 39), render, dialog, session, navigation, keypad, flows, app

## Local demo persistence and appointment flow
- Demo patient and appointment records are saved in browser `localStorage` under `meditouch.atm.demo.db.v1`.
- A newly registered patient starts with no appointments. The patient must complete the booking flow before an appointment appears in check-in or reprint.
- Appointment lists are filtered by the verified patient's key, so one patient's bookings are not shown to another patient.
- Appointment numbers and check-in queue numbers continue from the saved local database after a page refresh.
- To reset demo data, clear the browser's local storage entry `meditouch.atm.demo.db.v1` for this site.

**Production warning:** `localStorage` is only suitable for a front-end demonstration. Do not store real patient or national-ID information there. A hospital deployment must use an authenticated, access-controlled backend and an appropriately secured database.
# ATM-
