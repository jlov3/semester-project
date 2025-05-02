### Image Credits
Dice ```SVG``` courtesy of Delapouite from https://game-icons.net/tags/dice.html.

Pig ```SVG``` courtesy of Sophie Ascherl from https://openmoji.org/library/emoji-1F416/.

# TODO
- Fix JS issue (computer sometimes has 2 consecutive turns)
- Ideally find a way to sleep ms
  - Temporary solution: window.alert();.
  - console.log()s were initially added to test functions found online (none worked).
    - Kept in case of future function, plus it's useful for tracking and doesn't disrupt USER.

## Variables && Functions Breakdown
### Variables

```round```: Current round number.
- ```innerText``` updated && ```++```
  - initialize in ```game(replay)```
  - in ```hold(player)``` after computer's turn ends
  - in ```announce(player)```

&nbsp;

```playing```: ```True``` if USER is current player. ```False``` if COMPUTER is current player.
- updated to ```True```
  - ```game(replay)```
  - ```computer()``` when COMPUTER rolls a 1
  - ```hold(player)``` when switching to USER's turn
- updated to ```False```
  - initial
  - ```hold(player)``` when swtiching to COMPUTER's turn
- used in
  - ```user()``` && ```hold(player)``` if ```False``` to give USER an alert that it is not their turn.
  - ```hold(player)``` if ```False``` to end COMPUTER's turn and begin USER's. if ```True``` end USER's turn, begin COMPUTER's.

&nbsp;

```userRolls```: How many times a USER has rolled during their current turn.
- used in
  - ```user()``` on first roll of turn, to change __Roll__ ```button``` text to "Roll Again".
  - ```user()``` to check if USER has rolled the max 10 times.
  - ```hold(player)``` to make sure USER has rolled at least once before attempting to hold.
- updated
  - ```user()``` ```++``` after a non-1 roll.
  - ```hold(player)``` reset to 0 after USER's turn. __Roll__ ```button``` text is also reset to "Roll".

&nbsp;

```userSc, compSc```: Player scores.
- updated
  - ```computer()```, ```user()``` if COMPUTER, USER rolls a 1, so that if it is the first round, the HTML will display score of 0.

&nbsp;

```turnSc```: Points accumulated that turn (NOT for the round; temporary tracker for one player only).
- ```innerText``` updated && ```+= roll```
  - ```computer()``` after a non-1 roll.
  - ```computer()``` reset to 0 if COMPUTER rolls a 1.
  - ```user()``` after a non-1 roll.
  - ```hold(player)``` added to current player score and reset to 0

&nbsp;

&nbsp;

### Functions
```instruct(), ex(), cred()```: Show/Hide buttons for **Instructions**, **Example Game**, and **Image Credits**, respectively.
- ```inst``` grabs the dropdown content
- ```instB``` grabs the button

&nbsp;

```dice()```: Simulates dice roll, calls ```changeImg(roll)```, & returns roll value.

&nbsp;

```changeImg(roll)```: Uses roll from ```dice()``` to update ```HTML SVG``` to match num.

&nbsp;

```game(replay)```: Starts the game. Hides start && replay ```buttons```, shows game ```elements``` (dice ```SVG``` & ```buttons```, stat ```strs```). If not replay show ```round``` text. Initializes dice ```SVG``` with face 1 & ```round``` with 1.

&nbsp;

```computer()```: Contains the COMPUTER's turn. Called in ```user()``` if 1 is rolled && ```hold(player)``` when ending USER's turn. Simulates deciding to hold at "random" times, with ```vars``` ```behavior``` && ```lim```. ```for() loop``` to simulate rolling die. Follows game rules (turn ends if ```roll == 1```, non-1 roll ```turnSc  += roll```, etc.). Runs check for ```compSc >= 100``` after each non-1 roll. Changes ```cursor``` for __Roll__ && __Hold__ back to ```pointer```.

```behavior```: rand int 0-3.

```lim```: sets a limit on COMPUTER's allowed rolls, based on ```behavior```.

alerts:
- if COMPUTER rolls a 1. Announces this, amount of rolls, and tells USER it is their turn.
- if COMPUTER holds or hits max 10 rolls. Announces turn score and amount of rolls.


&nbsp;

```user()```: Contains the USER's turn. Called on button press by USER. Simulates dice roll, ends turn if ```roll == 1```. ```turnSc += roll``` if non-1. Reason why turnSc is global scope.

alerts:
- if it is not USER's turn, announce this.
- if roll 1, announce this.
- if hit max 10 rolls, announce this.

&nbsp;

```hold(player)```: Called when turn ends on a non-1 roll. Adds ```turnSc``` to player socre && resets ```turnSc``` to 0. Check if either player's score ```>= 100```. Update all ```innerText/HTML```. Changes ```cursor``` for __Roll__ && __Hold__ to ```not-allowed``` after USER's turn.

alerts:
- if it is not USER's turn, announce this.
- if USER has not rolled yet, announce they must roll before holding.
- Announce USER's/COMPUTER's turn when switching

&nbsp;

```announce(player)```: ```round++``` for final count. Updates round && announcement ```innerText```. Hide game ```elements```. Show announcement text & replay ```button```.