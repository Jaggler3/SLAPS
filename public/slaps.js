window.onload = Start;

//The speed at which characters are cycled through in a string
var BLINK_SPEED = 0.25;

//The character combination data
var Characters = {};
var rd = ReadData(GetSource("chars.sd"));

//Input string to display
var CURRENT_INPUT = "hello there";

//Has the display reached the end of the string
var END_INPUT = false;

//keep track of the last character displayed to indicate a duplicate
var LAST_CHAR = "";
var LAST_IND = -1;

var TIME = 0.0;

var PLAYING = true;

//Parse an .sd file format
function ReadData(data)
{
	var lines = data.split("\n");
	lines.forEach(line => {
		var d = line.split(" "); //separate line into key and value
		Characters[d[0]] = d[1]; //add to the character combination data
	});
}

//DE2D start logic
function Start() {
	Init();
	DE.ChangeState(new MainState());
	GAME_UPDATE_EXT_FUNC = Update;
	setInterval(Loop, 1000/60);
}

//DE2D update function
function Update() { }

//DE2D State of the main view
function MainState()
{
	var state = new State();

	//dot positions to be scaled
	var dotPoints = [
		new Vec2(-0.75, -0.5),
		new Vec2(-0.5, 0.5),
		new Vec2(-0.25,-0.5),
		new Vec2(0, 0.5),
		new Vec2(0.25, -0.5),
		new Vec2(0.5, 0.5),
		new Vec2(0.75, -0.5),
	];

	//create all sprites
	var dots = [
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
	];
	var currentCharSprite = new Text(new Vec2(0, 0), "-");
	var backButton = new Button(new Rect(0, 0, 100, 100), "");
	var forwardButton = new Button(new Rect(0, 0, 100, 100), "");
	var playButton = new Button(new Rect(0, 0, 100, 100), "");
	var pauseButton = new Button(new Rect(0, 0, 100, 100), "");
	var resetButton = new Button(new Rect(0, 0, 100, 100), "");
	var inputButton = new Button(new Rect(0, 0, 100, 100), "");

	//first frame of the state
	state.initFunc = function()
	{
		backButton.normalImg = backButton.hoveredImg = backButton.clickedImg = backButton.disabledImg = "back.png";
		forwardButton.normalImg = forwardButton.hoveredImg = forwardButton.clickedImg = forwardButton.disabledImg = "forward.png";
		playButton.normalImg = playButton.hoveredImg = playButton.clickedImg = playButton.disabledImg = "play.png";
		pauseButton.normalImg = pauseButton.hoveredImg = pauseButton.clickedImg = pauseButton.disabledImg = "pause.png";
		resetButton.normalImg = resetButton.hoveredImg = resetButton.clickedImg = resetButton.disabledImg = "reset.png";
		
		inputButton.normalImg = inputButton.hoveredImg = inputButton.clickedImg = inputButton.disabledImg = "input.png";
		
		//add all sprites to the scene
		state.sprites = state.sprites.concat(dots);
		state.ui.push(backButton);
		state.ui.push(forwardButton);
		state.ui.push(playButton);
		state.ui.push(pauseButton);
		state.ui.push(resetButton);
		state.ui.push(inputButton);
		state.ui.push(currentCharSprite);
	}

	//every step/frame of the state
	state.updateFunc = function()
	{
		//scaling for dots based on viewport
		var scale = WIDTH / 2;
		var height = WIDTH / 6;
		for(var i = 0; i < dots.length; i++)
		{
			dots[i].size = new Vec2(height, height);
			dots[i].transform.position = new Vec2(dotPoints[i].x * scale, dotPoints[i].y * height);
		}

		//update currentCharSprite
		var fontSize = (HEIGHT < WIDTH ? HEIGHT : WIDTH) / 2 - height;
		currentCharSprite.position.y = (HEIGHT / 2) - (fontSize / 2);
		currentCharSprite.font = fontSize + "px Arial";
		currentCharSprite.style = "white";

		//update buttons
		resetButton.rect.width = pauseButton.rect.width = playButton.rect.width = forwardButton.rect.width = backButton.rect.width = fontSize / 2;
		resetButton.rect.height = pauseButton.rect.height = playButton.rect.height = forwardButton.rect.height = backButton.rect.height = fontSize / 2;
		backButton.rect.x = -fontSize;
		resetButton.rect.x = -fontSize * 1.5;
		forwardButton.rect.x = fontSize;
		pauseButton.rect.x = playButton.rect.x = fontSize / 2;
		resetButton.rect.y = pauseButton.rect.y = playButton.rect.y = forwardButton.rect.y = backButton.rect.y = HEIGHT / 2 - fontSize / 1.5;
		inputButton.rect.y = -HEIGHT / 2 + 10;
		inputButton.rect.x = -fontSize * 0.375;
		inputButton.rect.width = inputButton.rect.height = fontSize * 0.75;

		pauseButton.disabled = !PLAYING;
		pauseButton.visible = PLAYING;
		playButton.disabled = PLAYING;
		playButton.visible = !PLAYING;

		if(!END_INPUT)
		{
			if(TIME / BLINK_SPEED > CURRENT_INPUT.length)
			{
				END_INPUT = true;
				PLAYING = false;
				currentCharSprite.text = "";
			} else
			{
				display();
				if(PLAYING) { TIME += DELTA_TIME; } //progress character display progression by delta
			}
		} else
		{
			display();
		}

		if(backButton.clicked)
		{
			if(TIME / BLINK_SPEED >= 1)
			{
				TIME = Math.floor(TIME / BLINK_SPEED) * BLINK_SPEED - BLINK_SPEED;
			}
		} else if(forwardButton.clicked)
		{
			if(TIME / BLINK_SPEED < CURRENT_INPUT.length - 1)
			{
				TIME = Math.floor(TIME / BLINK_SPEED) * BLINK_SPEED + BLINK_SPEED;
			}
		} else if(pauseButton.clicked)
		{
			PLAYING = false;
		} else if(playButton.clicked)
		{
			if(END_INPUT)
			{
				END_INPUT = false;
				TIME = 0;
			} else
			{
				TIME = Math.floor(TIME / BLINK_SPEED) * BLINK_SPEED;
			}
			PLAYING = true;
		} else if(resetButton.clicked)
		{
			TIME = 0;
			PLAYING = false;
			LAST_IND = "";
		}

		if(TIME / BLINK_SPEED < 1) //at the start of the sequence
		{
			backButton.disabled = true;
			backButton.visible = false;
		} else
		{
			backButton.disabled = false;
			backButton.visible = true;
		}

		if(TIME / BLINK_SPEED > CURRENT_INPUT.length) //at the end of the sequence
		{
			forwardButton.disabled = true;
			forwardButton.visible = false;
		} else
		{
			forwardButton.disabled = false;
			forwardButton.visible = true;
		}

		if(inputButton.clicked)
		{
			//ask for a new input string
			var newText = window.prompt("Enter text to display:", "Hello there");
			if(newText != null)
			{
				//reset and restart
				CURRENT_INPUT = newText;
				TIME = 0;
				END_INPUT = true;
				PLAYING = false;
				LAST_IND = "";
			}
		}
	}

	//update the dot sprites for the current character
	function display()
	{
		var characterIndex = Math.floor(TIME / BLINK_SPEED);
		var char = (characterIndex >= CURRENT_INPUT.length ? " " : CURRENT_INPUT[characterIndex].toUpperCase());

		currentCharSprite.text = char; //update currentCharSprite
		
		if(char == " " || char == "SPACE" || char === undefined || Characters[char] == undefined) //empty, space, or invalid
		{
			dots[0].imagePath = "off.png";
			dots[1].imagePath = "off.png";
			dots[2].imagePath = "off.png";
			dots[3].imagePath = "off.png";
			dots[4].imagePath = "off.png";
			dots[5].imagePath = "off.png";
			dots[6].imagePath = "off.png";
			return;
		}

		if(characterIndex >= 1 && CURRENT_INPUT[characterIndex - 1].toUpperCase() == char) //repetition character
		{
			dots[0].imagePath = "off.png";
			dots[1].imagePath = "off.png";
			dots[2].imagePath = "off.png";
			dots[3].imagePath = "off.png";
			dots[4].imagePath = "off.png";
			dots[5].imagePath = "off.png";
			dots[6].imagePath = "on.png";
			return;
		}

		//the current combination data
		var seq = Characters[char];
		for(var i = 0; i < dots.length; i++)
		{
			dots[i].imagePath = (seq.indexOf((i + 1) + '') != -1 ? "on.png" : "off.png"); //if the current combination contains dot [i]
		}
	}

	return state;
}
