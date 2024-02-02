# sieve
monorepo full-stack webapp for finding your perfect match (or new friend!) based on your spotify data and your shared interests.

see it live here: https://sieve.up.railway.app/

## how it works
firstly, potential matches are filtered based on the current user's preferred gender and age range. then, sorted suggested matches are returned to the user.  
the suggested matches are curated and prioritized using a **match score** that is derived from a combination of multiple factors:
### 1. interests similarity
- derived from categorized interests score, where similarity between two user's interests are calculated using cosine similarity and vector magnitudes. the higher the similarity between two user's categorical interests, the higher the match score  

### 2. music taste similarity / difference
- user's top played tracks from spotify in the past 3 months are aggregated and audio features from all tracks are compiled to generate the user's unique musical profile. similarly to their interests score, music taste similarity is also calculated using cosine similarity and vector magnitudes. based on the user's preference (to meet like minded people with similar music tastes -- or explore new musical horizons by meeting people with opposing music tastes!), this similarity then either positively impacts, or negatively impacts the match score 

### 3. desirability
- all potential matches are assigned a desirability score based on the amount of successful matches they've had historically. i assume if you've had many successful matches -- others will probably love to meet you too!

### 4. priority 
- love is great, and it's even better when it's reciprocated. taking this into consideration, i prioritise matches who has already swiped right a.k.a. accepted the current user. all that's left is for the user to also accept them back, and the match is successful! this means the potential match is already halfway to success, and this priority score gives them the extra edge they need
- fret not, newly joined users who might rank low on desirability (due to lack of history!) will also be given a priority score to help them even out the odds

### 5. randomness
- each score and metric are assigned weights which are randomised! this ensures the user gets a good variety of matches, and helps us improve on our matching algorithm in case the match scores aren't a good measure of great matches

## tech stacks
- typescript
- nestjs
- tRPC
- prisma
- nextjs
- tailwindcss
- postgres
- docker
- railway (deployment)

## concepts
- oauth
- monorepo
- RPC API
