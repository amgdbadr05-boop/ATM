/* Central configuration (front-end only build: all data is simulated by js/api.js) */
const CONFIG={
  mode:'demo',
  defaultLang:'en',
  idMin:6, idMax:12,      // National ID length (configurable per country)
  otpLen:4, demoOtp:'1234',
  idleMs:90000, warnMs:15000,
  slotStart:'09:00', slotEnd:'16:30', slotMinutes:30, reportByMin:15, daysAhead:5
};
