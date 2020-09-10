const {inflect} = require('inflection');
const {DateTime} = require('luxon');

module.exports = {
  full_name({firstName, lastName}) {
    return [firstName, lastName]
      .filter((name) => name)
      .reduce((acc, name) => (acc += `${name} `), '')
      .trim();
  },
  has_name({firstName, lastName}) {
    return firstName || lastName;
  },
  inflect(str, count) {
    return inflect(str, count);
  },
  owns_resource(session, user) {
    return session.user && session.user.id === user.id;
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
};
