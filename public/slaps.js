window.onload = Start;

var BLINK_SPEED = 0.25;

var Characters = {};
var rd = ReadData(GetSource("chars.sd"));

var CURRENT_INPUT = "hello there";
var END_INPUT = false;
var LAST_CHAR = "";
var LAST_IND = -1;

var TIME = 0.0;

var PLAYING = true;

function ReadData(data)
{
	var lines = data.split("\n");
	for(var i = 0; i < lines.length; i++)
	{
		var d = lines[i].split(" ");
		Characters[d[0]] = d[1];
	}
}

function Start() {
	Init();
	DE.ChangeState(new MainState());
	GAME_UPDATE_EXT_FUNC = Update;
	setInterval(Loop, 1000/60);
}

function Update() { }

function MainState()
{
	var state = new State();

	var ss = [
		new Vec2(-0.75, -0.5),
		new Vec2(-0.5, 0.5),
		new Vec2(-0.25,-0.5),
		new Vec2(0, 0.5),
		new Vec2(0.25, -0.5),
		new Vec2(0.5, 0.5),
		new Vec2(0.75, -0.5),
	];

	var l = [0, 0, 0, 0, 0, 0, 0];

	var lights = [
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
		new Sprite().setImage("off.png"),
	];

	var cdt = new Text(new Vec2(0, 0), "-");

	var bb = new Button(new Rect(0, 0, 100, 100), "");
	var fb = new Button(new Rect(0, 0, 100, 100), "");
	var sb = new Button(new Rect(0, 0, 100, 100), "");
	var pb = new Button(new Rect(0, 0, 100, 100), "");
	var rb = new Button(new Rect(0, 0, 100, 100), "");

	var ib = new Button(new Rect(0, 0, 100, 100), "");

	state.initFunc = function()
	{
		state.sprites = state.sprites.concat(lights);

		bb.normalImg = bb.hoveredImg = bb.clickedImg = bb.disabledImg = "back.png";
		fb.normalImg = fb.hoveredImg = fb.clickedImg = fb.disabledImg = "forward.png";
		sb.normalImg = sb.hoveredImg = sb.clickedImg = sb.disabledImg = "play.png";
		pb.normalImg = pb.hoveredImg = pb.clickedImg = pb.disabledImg = "pause.png";
		rb.normalImg = rb.hoveredImg = rb.clickedImg = rb.disabledImg = "reset.png";

		ib.normalImg = ib.hoveredImg = ib.clickedImg = ib.disabledImg = "input.png";

		state.ui.push(bb);
		state.ui.push(fb);
		state.ui.push(sb);
		state.ui.push(pb);
		state.ui.push(rb);

		state.ui.push(ib);

		state.ui.push(cdt);
	}

	state.updateFunc = function()
	{
		//make Button#clicked work on mobile
		var scale = WIDTH / 2;
		var height = WIDTH / 6;
		for(var i = 0; i < lights.length; i++)
		{
			lights[i].size = new Vec2(height, height);
			lights[i].transform.position = new Vec2(ss[i].x * scale, ss[i].y * height);
		}

		var fs = (HEIGHT < WIDTH ? HEIGHT : WIDTH) / 2 - height;
		var ccy = HEIGHT / 2;
		cdt.position.y = ccy - fs / 2;
		cdt.font = fs + "px Arial";
		cdt.style = "white";

		rb.rect.width = pb.rect.width = sb.rect.width = fb.rect.width = bb.rect.width = fs / 2;
		rb.rect.height = pb.rect.height = sb.rect.height = fb.rect.height = bb.rect.height = fs / 2;
		bb.rect.x = -fs;
		rb.rect.x = -fs * 1.5;
		fb.rect.x = fs;
		pb.rect.x = sb.rect.x = fs / 2;
		rb.rect.y = pb.rect.y = sb.rect.y = fb.rect.y = bb.rect.y = HEIGHT / 2 - fs / 1.5;
		ib.rect.y = -HEIGHT / 2 + 10;
		ib.rect.x = -fs * 0.375;
		ib.rect.width = ib.rect.height = fs * 0.75;

		pb.disabled = !PLAYING;
		pb.visible = PLAYING;
		sb.disabled = PLAYING;
		sb.visible = !PLAYING;

		if(!END_INPUT)
		{
			if(TIME / BLINK_SPEED > CURRENT_INPUT.length)
			{
				END_INPUT = true;
				PLAYING = false;
				cdt.text = "";
			} else
			{
				display();
				if(PLAYING) { TIME += DELTA_TIME; }
			}
		} else
		{
			display();
		}

		if(bb.clicked)
		{
			if(TIME / BLINK_SPEED >= 1)
			{
				TIME = Math.floor(TIME / BLINK_SPEED) * BLINK_SPEED - BLINK_SPEED;
			}
		}
		if(fb.clicked)
		{
			if(TIME / BLINK_SPEED < CURRENT_INPUT.length - 1)
			{
				TIME = Math.floor(TIME / BLINK_SPEED) * BLINK_SPEED + BLINK_SPEED;
			}
		}
		if(pb.clicked)
		{
			PLAYING = false;
		}
		if(sb.clicked)
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
		}
		if(rb.clicked)
		{
			TIME = 0;
			PLAYING = false;
			LAST_IND = "";
		}

		if(TIME / BLINK_SPEED < 1)
		{
			bb.disabled = true;
			bb.visible = false;
		} else
		{
			bb.disabled = false;
			bb.visible = true;
		}
		if(TIME / BLINK_SPEED > CURRENT_INPUT.length)
		{
			fb.disabled = true;
			fb.visible = false;
		} else
		{
			fb.disabled = false;
			fb.visible = true;
		}

		if(ib.clicked)
		{
			var t = window.prompt("Enter text to display:", "Hello there");
			if(t != null)
			{
				CURRENT_INPUT = t;
				TIME = 0;
				END_INPUT = true;
				PLAYING = false;
				LAST_IND = "";
			}
		}
	}

	function display()
	{
		var ci = Math.floor(TIME / BLINK_SPEED);
		var char = "";
		if(ci >= CURRENT_INPUT.length)
		{
			char = " ";
		} else
		{
			char = CURRENT_INPUT[ci].toUpperCase();
		}
		cdt.text = char;
		if(char == " " || char == "SPACE")
		{
			lights[0].imagePath = "off.png";
			lights[1].imagePath = "off.png";
			lights[2].imagePath = "off.png";
			lights[3].imagePath = "off.png";
			lights[4].imagePath = "off.png";
			lights[5].imagePath = "off.png";
			lights[6].imagePath = "off.png";
			return;
		}
		if(char === undefined)
		{
			return;
		}

		if(ci >= 1 && CURRENT_INPUT[ci - 1].toUpperCase() == char)
		{
			lights[6].imagePath = "on.png";
			lights[0].imagePath = "off.png";
			lights[1].imagePath = "off.png";
			lights[2].imagePath = "off.png";
			lights[3].imagePath = "off.png";
			lights[4].imagePath = "off.png";
			lights[5].imagePath = "off.png";
			return;
		}

		var seq = Characters[char];
		for(var i = 0; i < lights.length; i++)
		{
			if(seq.indexOf((i + 1) + "") != -1)
			{
				//turn on
				lights[i].imagePath = "on.png";
			} else
			{
				//turn off
				lights[i].imagePath = "off.png";
			}
		}
	}

	return state;
}
