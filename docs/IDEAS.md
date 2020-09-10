# skillgrindr

## Elevator pitch

skillgrindr is a website that pairs up developers for tit-for-tat tutorial sessions.
i.e. Alice wants to learn Vue and has SQL skills, and Bob wants to learn SQL and has Vue skills. Both Alice and Bob get matched with each other, and can exchange direct messages / set up meeting appointments / decline to collaborate further

## User flows

- Joining the website: user creates a basic account, then gets prompted to fill out a profile. User can continue to browse website without creating a profile, but needs to create a profile before they can match with other users
- Creating a profile: user builds a list of technologies they know/want to learn (rated out of 0-5 stars?)
- Matching: after the user has a profile, they can access a dashboard of potential study partners, look at their profiles, send direct messages and request to become partners
- Getting matched: on the dashboard, the user has a link to an inbox of direct messages / partner requests, which they can send replies to, accept/decline partner requests, or block the other user entirely
- Partners can rate each other (out of 0-5 stars?)

## Matching

Things to consider:

- the biggest biasing factor should probably be high "want to learn" scores on both sides of the exchange
- should prefer matching users with similar skill levels in their "teaching" skills
- should probably prioritze users with fewer active partnerships / deprioritize matching someone who already has a bunch of partnerships
- should probably avoid matching users with a huge skill imbalance

## Feature creep: things that'd be nice to have after we have an MVP

- some kind of really basic blog post system? (Users can self post on their profile if it's public to fish for upvotes, no comments/replies)
  - homepage shows the most upvoted blog posts in the last week or two
- upvotes and rankings feed into a user score
- fancy matching algorithm
  - maybe prioritize matching to spread rarer skills?
- users can opt-in/opt-out of one-sided exchanges (where they're strictly a teacher or a student in the partnership) for score bonuses
  - this should probably be part of the MVP, just a "allowOneSided" flag on their profile?
