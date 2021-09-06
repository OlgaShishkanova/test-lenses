
## What I did and what I was thinking along:

 1. I installed Docker, downloaded lensesio/box and the project according to the instruction letter.
 2. In Connect.jsx file I added the functionality to post the user's data and get the token. I saved it to Session Storage because it's considered to be the safest place to store tokens.  
 3. In index.js I added the functionality that allows Axios to send a header with the token with every request.
 4. I created a 'services' folder and websocket.ts file inside to allow all the components to use the 'connectToWebsocket' function. In Subscribe.jsx I used this function to get payment messages from '/api/ws/v2/sql/execute'.

### Important notes
I tried to download lensesio/box from here https://docs.lenses.io/4.2/tools/box/ (according to the description of the project on GitHub). I run the docker and there were no errors but in the end, http://localhost:3030 didn't work. So I downloaded lensesio/box from the email that I got after I filled the form here https://lenses.io/downloads/lenses/. It worked. But probably I got the wrong version of the project. Because the data that I got in the end from WebSockets was different from one that is described here https://api.lenses.io/. For example, each message is started with `data:` but is not followed by a number. I was working on the test during the weekend so I couldn't ask anyone from your company about these difficulties, so I've decided to proceed using the data that I got.

 5. According to the problems that I ran into, I had to make some changes to the project. First of all, I used 'event.data.type === "RECORD"' to filter out the messages that I needed to show. 
 6. Also I changed the 'rowRenderer' function in MessageList.jsx to be able to render this new data. I tried to make it look similar to the same components on the working lenses.io dashboard. I even added some CSS styles :) 
 7. And I changed ListItemDetails.jsx so it worked and didn't cause the errors.
 8. From the 2nd part of the test I chose only task #2 because it was easy to implement and I've already spent quite enough time on the test because of these differences in the data. So, I added extra functionality to the 'connectToWebsocket' function, so it could handle the 'messagesLimit' param.