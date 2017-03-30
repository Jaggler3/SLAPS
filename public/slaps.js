window.onload = Start;

var BLINK_SPEED = 0.25;

var Characters = {};
var rd = ReadData(GetSource("chars.sd"));

var CURRENT_INPUT = "hello you're using slaps which stands for selective low audio parsing system";
var END_INPUT = false;
var LAST_CHAR = "";
var LAST_IND = -1;

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

    var time = 0.0;

    var ss = [
        new Vec2(-0.75, -0.5),
        new Vec2(-0.5, 0.5),
        new Vec2(-0.25,-0.5),
        new Vec2(0, 0.5),
        new Vec2(0.25, -0.5),
        new Vec2(0.5, 0.5),
        new Vec2(0.75, -0.5),
    ];

    var l = [0, 0, 0, 0, 0, 0, 0]

    var lights = [
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
        new Sprite().setImage("off.png"),
    ];

	state.initFunc = function()
	{
		state.sprites = lights;
	}

	state.updateFunc = function()
	{
        var scale = WIDTH / 2;
        var height = WIDTH / 7;
		for(var i = 0; i < lights.length; i++)
        {
            lights[i].size = new Vec2(height, height);
            lights[i].transform.position = new Vec2(ss[i].x * scale, ss[i].y * height);
        }

        if(!END_INPUT)
        {
            if(time > BLINK_SPEED * CURRENT_INPUT.length)
            {
                END_INPUT = true;
            } else
            {
                var ci = Math.floor(time / BLINK_SPEED);
                if(LAST_IND != ci)
                {
                    LAST_IND = ci;
                    display(CURRENT_INPUT[ci].toUpperCase());
                }
                time += DELTA_TIME;
            }
        } else
        {
            display("SPACE");
        }
	}

    function display(char)
    {
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
        if(LAST_CHAR == char)
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
        LAST_CHAR = char;
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