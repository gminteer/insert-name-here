const {inflect} = require('inflection');
const {DateTime} = require('luxon');

const SKILLPAGE_TYPES = {KNOWN: 'Known Skills', WANTED: 'Wanted Skills'};

module.exports = () => ({
  full_name({firstName, lastName}) {
    return [firstName, lastName]
      .filter((name) => name)
      .reduce((acc, name) => (acc += `${name} `), '')
      .trim();
  },
  get_editskillpage_title(type) {
    return SKILLPAGE_TYPES[type];
  },
  has_name(thing) {
    if (!thing) return;
    const {firstName, lastName} = thing;
    return firstName || lastName;
  },
  inflect(str, count) {
    return inflect(str, count);
  },
  owns_resource(session, resource) {
    return session.user && session.user.id === resource.userId;
  },
  relative_time(timeStamp) {
    const timeDelta = DateTime.fromJSDate(timeStamp)
      .diffNow(['years', 'months', 'weeks', 'days', 'hours', 'minutes'])
      .negate()
      .toObject();
    return Object.entries(timeDelta)
      .filter(([, value]) => value)
      .reduce((acc, [unit, value]) => (acc += `${Math.floor(value)} ${inflect(unit, value)} `), '');
  },
});
