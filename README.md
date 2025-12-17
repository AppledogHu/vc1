# VC-1
Virtual Computer One.

Formerly "JavaScript Terminal Technical Demo".

## History
I like NetHack and roguelike games, so one of the first things I do to ease myself into a new computer language is to write a sort of roguelike game. The game I write is called NetWhack. I first wrote NetWhack in C++ in 1997. By 1999-2000 I had rewritten the project in Java. After teaching Python for a while, I eventually wrote it in Python. Then I rewrote it in Java again using LWJGL. After essentially completing the game to my own satisfaction it was placed on the back burner. You see, there was a serious problem that prevented me from updating the game using a modern library like LWJGL or re-writing in JavaScript.

It was the old problem of blocking IO that I had with game libraries like LWJGL: because it is event driven, you cannot perform blocking input. Or rather I should say, because LWJGL (and JavaScript) are extremely poorly designed, you can't normally do blocking input. I asked around for years and no one ever had a solution. I was told to just accept the sign of the times and get with the paradigm of event-driven programming.

What follows is an interesting story; it's so interesting I'll skip it and just say I spent years trying to figure out how to do blocking input in JavaScript. I went through many revisions of many games and programs in various langauges. I knew there must be a way. One day, I had an epiphany and figured out how to do it. It was during the development of a small demo program I wrote called “Javascript Terminal technical Demo”.

## What I learned
**It's really a CPU.** 
A monolithic atomic queue is a CPU. When I realized this I stopped working on NetWhack in Javascript. I realized I needed a much better “Javascript Terminal” and possibly something with a much stronger terminal simulator. I started getting sucked into creating variables in the state machine and so forth and the whole thing became just a little messy. I took my time but it never really worked. 

However, the basic concept DID work and the mistake, I realized, was trying to do it 50-50. I took a long, hard look at web assembly. The thing with Web Assembly is you don't have access to the DOM. Well, you have to write wrapper functions. For some reason I didn't want to go back to C/C++ or try to compile the Java code into web assembly. I wanted to go full retard. This is after all, a pet project. Hmm, PET project?

I was directly inspired by the best line in Star Trek Voyager:

_"When I think about everything we've been through together, maybe it's not the destination that matters, maybe it's the journey, and if that journey takes a little longer, so we can do something we all believe in, I can't think of any place I'd rather be or any people I'd rather be with."_
_–Ensign Harry Kim_