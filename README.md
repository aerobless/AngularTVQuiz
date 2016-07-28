# AngularTVQuiz

A multiplayer quiz app for the tv controlled by players with smartphones. Made in Angular2 and NodeJS.

#Technologies used

+ Angular2
+ Bootstrap
+ Socket.io
+ TypeScript
+ NodeJS

#Features

+ Players can join at any time
+ There's no limit to the amount of players
+ Simply score-keeping
+ Support for multiple quiz sessions
+ Simple & clean material design

#Limitations

+ Currently there are only 4 hardcoded questions stored in an array on the server. A file with questions or a databse connection are planned but not yet developed.
+ The app was not designed for security. Cheating is possible, but no permanent damage against the server can be done.

#Installation

1. go to `AngularTVQuiz/` and run `npm install`, then run `typings install`
2. go to `AngularTVQuiz/client` and run `npm install`, then run `typings install`
3. Open `AngularTVQuiz/client/applicationconfig.ts` and change the server ip address

#License (MIT)
 > Copyright (c) 2016 Theodor Winter

 > Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 > The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.