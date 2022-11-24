Inspiration
A major problem that plagues our modern world is that online educational resources are far too expensive and inaccessible to certain populations around the world. Statistics show that over half of all students in the United States are unable to pay for their online education. One particular online learning platform, Quizlet, blocks its most useful feature behind a premium paywall that many students are unable to afford. We pondered upon how we could remedy this issue. Thus, Test.iq was born.

What it does
Currently quizlet required premium for their testing functionality. Our web application allow users to paste the url of their quizlet set so that our app will generate a test suite for them using API calls and custom algorithms.

How we built it
We first took in the url from a text prompt in the frontend and sent it to the express backend where we called webScraping API to scrape the needed html elements of the questions and answers. Then, we parsed the questions and answers to create test objects that included each question, and the correct answers for each question, as well as random wrong answers based on the answer string length. The application will then take the users to a test page built from the test objects, where they can take a test using these flashcards just as on Quizlet itself. As the user begins studying, test.iq uses natural language processing to filter outterms and topics that the user might not be too familiar with. Then finally, as the user finishes up, a suite of videos generated from YoutubeAPI using those terms are provided for studying.

Challenges we ran into
Writing the custom algorithms that parse a specific format of data
Debugging multiple backend api endpoints and connecting the frontend to the backend
Accomplishments that we're proud of
Team management and work distribution were extremely organised during this hackathon. Every team member gets to show their unique talent in different stages of the software development process. More importantly, we managed to deliver the finished product with decent quality.

What's next for Quizlet Tester
We plan to add more test types to Quizlet Tester where the users can choose between short answers, multiple choice, matching, and other possible testing formats so that the users can freely choose the best type that suit their interest. We also want to create add-ons like the related youtube information that could furthen the user's ease of education.

Built with:

api
css
express.js
google
html
javascript
materialui
monkeylearn
node.js
npm
react
webscraperapi
youtubeapi
