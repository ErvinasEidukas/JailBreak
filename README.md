# JailBrake

Created: 2022-08
Latest update: 2022-08-26

Project accessibility:

    1.  You can play the game in your browser by going through this link:
        https://ervinaseidukas.github.io/JailBreak/

    2.  You can download files listed below and run it locally on your pc:
        "JailBreak.css"
        "JailBrrak.js"
        "index.html"
        from: https://github.com/ErvinasEidukas/JailBreak

    3.  You can download files listed below and run it on your android divice
        folder: "As android app"
                To instal on your phone: "JailBreak.apk"
                To build it yourself "JailBreak app.7z"
        from: https://github.com/ErvinasEidukas/JailBreak

About game:

    This is a clone of the retro game "Break Out"
    Your goal is to destroy all the blocks on the map
    and prevent the ball from falling into the pit.
    As a player, you control a small platform at the bottom of the screen
    and trying to prevent the ball from falling into the pit.

Game Flow:

    1.  On the loaded screen press a start button.
        After that first level will be loaded.

    2.  Ball will be stationary until you will start moving.

    3.  Try your best to keep the ball from falling into the pit.

    4.  If you destroy all blocks you will proceed to the next level.

    5.  If your ball falls into the pit, you will lose one life (heart)

    6.  If you lose all your lives, you will be thrown into the menu.

    7.  In this menu you can select:
    7.1 "Try Again" - to start a game from the beginning.
    7.2 "Exit" - to close app/window.

Controls:

You can move the platform to the right or left side by using:

    1. Mouse
    2. Keybord
    3. Fingers (by touch on phone)

    To Start the game you should start moving in any direction.
    Ball will start moving in the same direction as you move.

    1. Mouse controles:
        Press and hold anywhere on the RIGHT side of the page/window to move to the right.
        Press and hold anywhere on the LEFT side of the page/window to move to the left.

    2. Keybord controls:
        To move to the right hold RIGHT arrow key.
        To move to the left hold LEFT arrow key.

    3. "Fingers" controls:
        Touch and hold the screen anywhere on the RIGHT side of the page/window to move to the right.
        Touch and hold the screen anywhere on the LEFT side of the page/window to move to the left.

Bloks:

    All blocks can be destroyed when the ball hits them.

    All destroyed blocks give an equal number of points.
        Points are calculated by formula (ball speed * 100 points)
        After destroying the block, ball speed will increase by ~1%
        By losing the live/heart or proceeding to the next level
        ball speed will be dropen to default speed.

    In the gave you will find 4 types of Blocks:

        1. Grey Block:
            Regular block, destroyed by one hit, no special effects.

        2. Orange Block:
            After the first hit becomes a gray block.
            To destroy this block, you must hit it twice.
            Can be destroyed be red block.

        3. Blue Block:
            Destroyed by one hit.
            After destruction gives a "power up" to the ball.
            Ball becomes bigger until you destroy 5 other blocks.

        4. Red Block (TNT block):
            After hitting removes all surrounding blocks.
                After hitting, starts explosion "animation".
                All surrounding blocks also go into animation state.
                After 0.5s all blocks in the animation state are removed.
                While blocks are in the animation player cannot interact with them.
            After explosion you will get points by formula:
            (ball speed * 100 points * Number of exploded boxes)

        5. Yellow Block:
            Debug purposes only.
            If you see one in your play through, it means something went wrong.

Maps:

    At the moment there are 3 maps available to play.
    By beating one map you will proceed to the next one.
    All maps are looped so by beating last map/level
    you will go to the first map.
    There is possibility to get infinitely high score,
    becose by going from one map to another your score saves.

Tips:

    1.  If you want to chill just uncomment "outoplay" part in the "JailBreak/js"
        By doing this you will be able win the game without playing it.

    2.  If your game breaks try to restart windows/app.

Bugs:

    cutegory:
        Minor - small bug which won't be fixed (more feature than bug)
        Rare - would be good to remove but it happens rarely.
        Requireс a fix - should be fixed but I don't know how, or to busy do it.

    1.  Minor:
        You can redirect ball if its lands on the
        corner/(vertical part) of the platform.

    2.  Rare:
        You can stuck in the infinite loop when one unremoved box is left.
        You can try to redirect ball by using bug No-1.

    3.  Rare:
        In some situations ball can slide between the blocks.
        Probability of that is very small.
        Still not sure why it can happen.

    4.  Requireс a fix:
        On mobile devices there is a lag\freezes when you touch the screen.
        Multiple touch makes it even worse.
        It is possible to adapt and play the game but it is very frustrating.

    5.  Requireс a fix:
        Program badly supports a vertical play mode.
        Just, do not play it in the vertical mode.
        It was created to play it in "landscape view".

    6.  Requireс a fix:
        For android Only:
        If you will close and open your app without terminating it will braek;
        In this case you Must Restart the app.

Feedback:

    If you liked the game,
    Found new bugs,
    Have a solution for the bugs,
    Have ideas what can be added.

    You can contact me via Email:
    ervinas.eidukas@gmail.com
