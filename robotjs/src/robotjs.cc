#include <node.h>
#include <nan.h>
#include <v8.h>
#include <vector>
#include "mouse.h"
#include "deadbeef_rand.h"
#include "keypress.h"
#include "screen.h"
#include "screengrab.h"
#include "MMBitmap.h"
#include "snprintf.h"
#include "microsleep.h"
#if defined(USE_X11)
	#include "xdisplay.h"
#endif

using namespace v8;

//Global delays.
int mouseDelay = 10;
int keyboardDelay = 10;

/*
 __  __
|  \/  | ___  _   _ ___  ___
| |\/| |/ _ \| | | / __|/ _ \
| |  | | (_) | |_| \__ \  __/
|_|  |_|\___/ \__,_|___/\___|

*/

int CheckMouseButton(const char * const b, MMMouseButton * const button)
{
	if (!button) return -1;

	if (strcmp(b, "left") == 0)
	{
		*button = LEFT_BUTTON;
	}
	else if (strcmp(b, "right") == 0)
	{
		*button = RIGHT_BUTTON;
	}
	else if (strcmp(b, "middle") == 0)
	{
		*button = CENTER_BUTTON;
	}
	else
	{
		return -2;
	}

	return 0;
}

NAN_METHOD(dragMouse)
{
	if (info.Length() < 2 || info.Length() > 3)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	const int32_t x = Nan::To<int32_t>(info[0]).FromJust();
	const int32_t y = Nan::To<int32_t>(info[1]).FromJust();
	MMMouseButton button = LEFT_BUTTON;

	if (info.Length() == 3)
	{
		Nan::Utf8String bstr(info[2]);
		const char * const b = *bstr;

		switch (CheckMouseButton(b, &button))
		{
			case -1:
				return Nan::ThrowError("Null pointer in mouse button code.");
				break;
			case -2:
				return Nan::ThrowError("Invalid mouse button specified.");
				break;
		}
	}

	MMSignedPoint point;
	point = MMSignedPointMake(x, y);
	dragMouse(point, button);
	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(updateScreenMetrics)
{
	updateScreenMetrics();

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(moveMouse)
{
	if (info.Length() != 2)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	int32_t x = Nan::To<int32_t>(info[0]).FromJust();
	int32_t y = Nan::To<int32_t>(info[1]).FromJust();

	MMSignedPoint point;
	point = MMSignedPointMake(x, y);
	moveMouse(point);
	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(moveMouseSmooth)
{
	if (info.Length() > 3 || info.Length() < 2 )
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}
	size_t x = Nan::To<int32_t>(info[0]).FromJust();
	size_t y = Nan::To<int32_t>(info[1]).FromJust();

	MMPoint point;
	point = MMPointMake(x, y);
	if (info.Length() == 3)
	{
		size_t speed = Nan::To<int32_t>(info[2]).FromJust();
		smoothlyMoveMouse(point, speed);
	}
	else
	{
		smoothlyMoveMouse(point, 3.0);
	}
	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(getMousePos)
{
	MMPoint pos = getMousePos();

	//Return object with .x and .y.
	Local<Object> obj = Nan::New<Object>();
	Nan::Set(obj, Nan::New("x").ToLocalChecked(), Nan::New((int)pos.x));
	Nan::Set(obj, Nan::New("y").ToLocalChecked(), Nan::New((int)pos.y));
	info.GetReturnValue().Set(obj);
}

NAN_METHOD(mouseClick)
{
	MMMouseButton button = LEFT_BUTTON;
	bool doubleC = false;

	if (info.Length() > 0)
	{
		v8::String::Utf8Value bstr(v8::Isolate::GetCurrent(), Nan::To<v8::String>(info[0]).ToLocalChecked());
		const char * const b = *bstr;

		switch (CheckMouseButton(b, &button))
		{
			case -1:
				return Nan::ThrowError("Null pointer in mouse button code.");
				break;
			case -2:
				return Nan::ThrowError("Invalid mouse button specified.");
				break;
		}
	}

	if (info.Length() == 2)
	{
		doubleC = Nan::To<bool>(info[1]).FromJust();
	}
	else if (info.Length() > 2)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	if (!doubleC)
	{
		clickMouse(button);
	}
	else
	{
		doubleClick(button);
	}

	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(mouseToggle)
{
	MMMouseButton button = LEFT_BUTTON;
	bool down = false;

	if (info.Length() > 0)
	{
		char *d;

		Nan::Utf8String dstr(info[0]);
		d = *dstr;

		if (strcmp(d, "down") == 0)
		{
			down = true;
		}
		else if (strcmp(d, "up") == 0)
		{
			down = false;
		}
		else
		{
			return Nan::ThrowError("Invalid mouse button state specified.");
		}
	}

	if (info.Length() == 2)
	{
		Nan::Utf8String bstr(info[1]);
		const char * const b = *bstr;

		switch (CheckMouseButton(b, &button))
		{
			case -1:
				return Nan::ThrowError("Null pointer in mouse button code.");
				break;
			case -2:
				return Nan::ThrowError("Invalid mouse button specified.");
				break;
		}
	}
	else if (info.Length() > 2)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	toggleMouse(down, button);
	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(setMouseDelay)
{
	if (info.Length() != 1)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	mouseDelay = Nan::To<int32_t>(info[0]).FromJust();

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(scrollMouse)
{
	if (info.Length() != 2)
	{
    	return Nan::ThrowError("Invalid number of arguments.");
	}

	int x = Nan::To<int32_t>(info[0]).FromJust();
	int y = Nan::To<int32_t>(info[1]).FromJust();

	scrollMouse(x, y);
	microsleep(mouseDelay);

	info.GetReturnValue().Set(Nan::New(1));
}
/*
 _  __          _                         _
| |/ /___ _   _| |__   ___   __ _ _ __ __| |
| ' // _ \ | | | '_ \ / _ \ / _` | '__/ _` |
| . \  __/ |_| | |_) | (_) | (_| | | | (_| |
|_|\_\___|\__, |_.__/ \___/ \__,_|_|  \__,_|
          |___/
*/
struct KeyNames
{
	const char* name;
	MMKeyCode   key;
};

static KeyNames key_names[] =
{
	{ "backspace",      K_BACKSPACE },
	{ "delete",         K_DELETE },
	{ "enter",          K_RETURN },
	{ "tab",            K_TAB },
	{ "escape",         K_ESCAPE },
	{ "up",             K_UP },
	{ "down",           K_DOWN },
	{ "right",          K_RIGHT },
	{ "left",           K_LEFT },
	{ "home",           K_HOME },
	{ "end",            K_END },
	{ "pageup",         K_PAGEUP },
	{ "pagedown",       K_PAGEDOWN },
	{ "f1",             K_F1 },
	{ "f2",             K_F2 },
	{ "f3",             K_F3 },
	{ "f4",             K_F4 },
	{ "f5",             K_F5 },
	{ "f6",             K_F6 },
	{ "f7",             K_F7 },
	{ "f8",             K_F8 },
	{ "f9",             K_F9 },
	{ "f10",            K_F10 },
	{ "f11",            K_F11 },
	{ "f12",            K_F12 },
	{ "f13",            K_F13 },
	{ "f14",            K_F14 },
	{ "f15",            K_F15 },
	{ "f16",            K_F16 },
	{ "f17",            K_F17 },
	{ "f18",            K_F18 },
	{ "f19",            K_F19 },
	{ "f20",            K_F20 },
	{ "f21",            K_F21 },
	{ "f22",            K_F22 },
	{ "f23",            K_F23 },
	{ "f24",            K_F24 },
	{ "capslock",       K_CAPSLOCK },
	{ "command",        K_META },
	{ "alt",            K_ALT },
	{ "right_alt",      K_RIGHT_ALT },
	{ "control",        K_CONTROL },
	{ "left_control",   K_LEFT_CONTROL },
	{ "right_control",  K_RIGHT_CONTROL },
	{ "shift",          K_SHIFT },
	{ "right_shift",    K_RIGHTSHIFT },
	{ "space",          K_SPACE },
	{ "printscreen",    K_PRINTSCREEN },
	{ "insert",         K_INSERT },
	{ "menu",           K_MENU },

	{ "audio_mute",     K_AUDIO_VOLUME_MUTE },
	{ "audio_vol_down", K_AUDIO_VOLUME_DOWN },
	{ "audio_vol_up",   K_AUDIO_VOLUME_UP },
	{ "audio_play",     K_AUDIO_PLAY },
	{ "audio_stop",     K_AUDIO_STOP },
	{ "audio_pause",    K_AUDIO_PAUSE },
	{ "audio_prev",     K_AUDIO_PREV },
	{ "audio_next",     K_AUDIO_NEXT },
	{ "audio_rewind",   K_AUDIO_REWIND },
	{ "audio_forward",  K_AUDIO_FORWARD },
	{ "audio_repeat",   K_AUDIO_REPEAT },
	{ "audio_random",   K_AUDIO_RANDOM },

	{ "numpad_lock",	K_NUMPAD_LOCK },
	{ "numpad_0",		K_NUMPAD_0 },
	{ "numpad_0",		K_NUMPAD_0 },
	{ "numpad_1",		K_NUMPAD_1 },
	{ "numpad_2",		K_NUMPAD_2 },
	{ "numpad_3",		K_NUMPAD_3 },
	{ "numpad_4",		K_NUMPAD_4 },
	{ "numpad_5",		K_NUMPAD_5 },
	{ "numpad_6",		K_NUMPAD_6 },
	{ "numpad_7",		K_NUMPAD_7 },
	{ "numpad_8",		K_NUMPAD_8 },
	{ "numpad_9",		K_NUMPAD_9 },
	{ "numpad_+",		K_NUMPAD_PLUS },
	{ "numpad_-",		K_NUMPAD_MINUS },
	{ "numpad_*",		K_NUMPAD_MULTIPLY },
	{ "numpad_/",		K_NUMPAD_DIVIDE },
	{ "numpad_.",		K_NUMPAD_DECIMAL },

	{ "lights_mon_up",    K_LIGHTS_MON_UP },
	{ "lights_mon_down",  K_LIGHTS_MON_DOWN },
	{ "lights_kbd_toggle",K_LIGHTS_KBD_TOGGLE },
	{ "lights_kbd_up",    K_LIGHTS_KBD_UP },
	{ "lights_kbd_down",  K_LIGHTS_KBD_DOWN },

	{ NULL,               K_NOT_A_KEY } /* end marker */
};

int CheckKeyCodes(char* k, MMKeyCode *key)
{
	if (!key) return -1;

	if (strlen(k) == 1)
	{
		*key = keyCodeForChar(*k);
		return 0;
	}

	*key = K_NOT_A_KEY;

	KeyNames* kn = key_names;
	while (kn->name)
	{
		if (strcmp(k, kn->name) == 0)
		{
			*key = kn->key;
			break;
		}
		kn++;
	}

	if (*key == K_NOT_A_KEY)
	{
		return -2;
	}

	return 0;
}

int CheckKeyFlags(char* f, MMKeyFlags* flags)
{
	if (!flags) return -1;

	if (strcmp(f, "alt") == 0 || strcmp(f, "right_alt") == 0)
	{
		*flags = MOD_ALT;
	}
	else if(strcmp(f, "command") == 0)
	{
		*flags = MOD_META;
	}
	else if(strcmp(f, "control") == 0 || strcmp(f, "right_control") == 0 || strcmp(f, "left_control") == 0)
	{
		*flags = MOD_CONTROL;
	}
	else if(strcmp(f, "shift") == 0 || strcmp(f, "right_shift") == 0)
	{
		*flags = MOD_SHIFT;
	}
	else if(strcmp(f, "none") == 0)
	{
		*flags = MOD_NONE;
	}
	else
	{
		return -2;
	}

	return 0;
}

int GetFlagsFromString(v8::Local<v8::Value> value, MMKeyFlags* flags)
{
	v8::String::Utf8Value fstr(v8::Isolate::GetCurrent(), Nan::To<v8::String>(value).ToLocalChecked());
	return CheckKeyFlags(*fstr, flags);
}

int GetFlagsFromValue(v8::Local<v8::Value> value, MMKeyFlags* flags)
{
	if (!flags) return -1;

	//Optionally allow an array of flag strings to be passed.
	if (value->IsArray())
	{
		v8::Local<v8::Array> a = v8::Local<v8::Array>::Cast(value);
		for (uint32_t i = 0; i < a->Length(); i++)
		{
		  if (Nan::Has(a, i).FromJust()) {
                v8::Local<v8::Value> v(Nan::Get(a, i).ToLocalChecked());
                if (!v->IsString()) return -2;

                MMKeyFlags f = MOD_NONE;
                const int rv = GetFlagsFromString(v, &f);
                if (rv) return rv;

                *flags = (MMKeyFlags)(*flags | f);
			}
		}
		return 0;
	}

	//If it's not an array, it should be a single string value.
	return GetFlagsFromString(value, flags);
}

NAN_METHOD(keyTap)
{
	MMKeyFlags flags = MOD_NONE;
	MMKeyCode key;

	char *k;

	v8::String::Utf8Value kstr(v8::Isolate::GetCurrent(), Nan::To<v8::String>(info[0]).ToLocalChecked());
	k = *kstr;

	switch (info.Length())
	{
		case 2:
			switch (GetFlagsFromValue(info[1], &flags))
			{
				case -1:
					return Nan::ThrowError("Null pointer in key flag.");
					break;
				case -2:
					return Nan::ThrowError("Invalid key flag specified.");
					break;
			}
			break;
		case 1:
			break;
		default:
			return Nan::ThrowError("Invalid number of arguments.");
	}

	switch(CheckKeyCodes(k, &key))
	{
		case -1:
			return Nan::ThrowError("Null pointer in key code.");
			break;
		case -2:
			return Nan::ThrowError("Invalid key code specified.");
			break;
		default:
			tapKeyCode(key, flags);
			microsleep(keyboardDelay);
	}

	info.GetReturnValue().Set(Nan::New(1));
}


NAN_METHOD(keyToggle)
{
	MMKeyFlags flags = MOD_NONE;
	MMKeyCode key;

	bool down;
	char *k;

	//Get arguments from JavaScript.
	Nan::Utf8String kstr(info[0]);

	//Convert arguments to chars.
	k = *kstr;

	//Check and confirm number of arguments.
	switch (info.Length())
	{
		case 3:
			//Get key modifier.
			switch (GetFlagsFromValue(info[2], &flags))
			{
				case -1:
					return Nan::ThrowError("Null pointer in key flag.");
					break;
				case -2:
					return Nan::ThrowError("Invalid key flag specified.");
					break;
			}
			break;
		case 2:
			break;
		default:
			return Nan::ThrowError("Invalid number of arguments.");
	}

	//Get down value if provided.
	if (info.Length() > 1)
	{
		char *d;

		Nan::Utf8String dstr(info[1]);
		d = *dstr;

		if (strcmp(d, "down") == 0)
		{
			down = true;
		}
		else if (strcmp(d, "up") == 0)
		{
			down = false;
		}
		else
		{
			return Nan::ThrowError("Invalid key state specified.");
		}
	}

	//Get the acutal key.
	switch(CheckKeyCodes(k, &key))
	{
		case -1:
			return Nan::ThrowError("Null pointer in key code.");
			break;
		case -2:
			return Nan::ThrowError("Invalid key code specified.");
			break;
		default:
			toggleKeyCode(key, down, flags);
			  microsleep(keyboardDelay);
	}

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(typeString)
{
	char *str;
	Nan::Utf8String string(info[0]);

	str = *string;

	typeString(str);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(typeStringDelayed)
{
	char *str;
	Nan::Utf8String string(info[0]);

	str = *string;

	size_t cpm = Nan::To<int32_t>(info[1]).FromJust();

	typeStringDelayed(str, cpm);

	info.GetReturnValue().Set(Nan::New(1));
}

NAN_METHOD(setKeyboardDelay)
{
	if (info.Length() != 1)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	keyboardDelay = Nan::To<int32_t>(info[0]).FromJust();

	info.GetReturnValue().Set(Nan::New(1));
}

/*
  ____
 / ___|  ___ _ __ ___  ___ _ __
 \___ \ / __| '__/ _ \/ _ \ '_ \
  ___) | (__| | |  __/  __/ | | |
 |____/ \___|_|  \___|\___|_| |_|

*/

/**
 * Pad hex color code with leading zeros.
 * @param color Hex value to pad.
 * @param hex   Hex value to output.
 */
void padHex(MMRGBHex color, char* hex)
{
	//Length needs to be 7 because snprintf includes a terminating null.
	//Use %06x to pad hex value with leading 0s.
	snprintf(hex, 7, "%06x", color);
}

NAN_METHOD(getPixelColor)
{
	if (info.Length() != 2)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	MMBitmapRef bitmap;
	MMRGBHex color;

	size_t x = Nan::To<int32_t>(info[0]).FromJust();
	size_t y = Nan::To<int32_t>(info[1]).FromJust();

	if (!pointVisibleOnMainDisplay(MMPointMake(x, y)))
	{
		return Nan::ThrowError("Requested coordinates are outside the main screen's dimensions.");
	}

	bitmap = copyMMBitmapFromDisplayInRect(MMRectMake(x, y, 1, 1));

	color = MMRGBHexAtPoint(bitmap, 0, 0);

	char hex[7];

	padHex(color, hex);

	destroyMMBitmap(bitmap);

	info.GetReturnValue().Set(Nan::New(hex).ToLocalChecked());
}

NAN_METHOD(findColor)
{
	int color = Nan::To<int32_t>(info[0]).FromJust();

	int origin_x = Nan::To<int32_t>(info[1]).FromJust();
	int origin_y = Nan::To<int32_t>(info[2]).FromJust();
	int width = Nan::To<int32_t>(info[3]).FromJust();
	int height = Nan::To<int32_t>(info[4]).FromJust();


	MMBitmapRef bitmap = copyMMBitmapFromDisplayInRect(MMRectMake(origin_x, origin_y, width, height));

	int *actual_color = (int *)(void *)bitmap->imageBuffer;

	// Create our return object.
	Local<Object> obj = Nan::New<Object>();
	int found = 0;

	for (int y=0; y<height && !found; y++)
	{
		for (int x=0; x<width && !found; x++)
		{
			if (*actual_color++ == color) {
				found++;

				Nan::Set(obj, Nan::New("x").ToLocalChecked(), Nan::New<Number>(x));
				Nan::Set(obj, Nan::New("y").ToLocalChecked(), Nan::New<Number>(y));
			}
		}
	}

	destroyMMBitmap(bitmap);

	// Return our object with .width and .height.
	info.GetReturnValue().Set(obj);
}

typedef struct str {
	char *ptr;
	int length;
	int capacity;
} str;

int copy_char_array(char *source, char *target) { do { *target++ = *source; } while (*source++ != '\0'); }

void str_init(str *self, int capacity)
{
	self->ptr = (char*)malloc(capacity);

	*self->ptr = '\0';

	self->length = 0;
	self->capacity = capacity;
}

void str_push(str *self, char *null_terminated)
{
	char *ptr = self->ptr + self->length;
	while (*null_terminated != '\0')
	{
		self->length++;
		if (self->length == self->capacity) {
			self->capacity *= 2;
			self->ptr = (char*)realloc(self->ptr, self->capacity);

			ptr = self->ptr + self->length -1;
		}

		*ptr++ = *null_terminated++;
	}

	*ptr = '\0';
}

typedef struct BoundRect {
	int left;
	int top;
	int right;
	int bot;
} BoundRect;

NAN_METHOD(scanColors)
{
	int origin_x = Nan::To<int32_t>(info[0]).FromJust();
	int origin_y = Nan::To<int32_t>(info[1]).FromJust();
	int width = Nan::To<int32_t>(info[2]).FromJust();
	int height = Nan::To<int32_t>(info[3]).FromJust();

	if (info.Length() < 5)
	{
		return Nan::ThrowError("Invalid number of arguments.");
	}

	int color_count = info.Length() - 4;

	int *colors = (int*)malloc(color_count * 4);

	for (int i=0; i<color_count; i++)
		colors[i] = Nan::To<int32_t>(info[i + 4]).FromJust() | 0xff000000;


	MMBitmapRef bitmap = copyMMBitmapFromDisplayInRect(MMRectMake(origin_x, origin_y, width, height));
	int *screen_colors = (int *)(void *)bitmap->imageBuffer;

	//Init response string
	str response; str_init(&response, 1000);
	str_push(&response, "[");


	for (int y=0; y<height; y++)
	{
		for (int x=0; x<width; x++)
		{
			int screen_color = *screen_colors++;

			for (int i=0; i<color_count; i++)
			{
				if (colors[i] == screen_color) {
					char buff[43];
					for (int i=0; i<14; i++) buff[42 - i] = '\0';
					sprintf(buff, "{\"color\": %i, \"x\": %i, \"y\": %i},", screen_color & 0x00ffffff, x, y);


					str_push(&response, buff);

					break;
				}
			}
		}
	}

	char *last = (response.ptr + response.length - 1);
	if (*last == ',') {
		*last = ']';
	}
	else {
		str_push(&response, "]");
	}

	info.GetReturnValue().Set(Nan::New(response.ptr).ToLocalChecked());

	free(response.ptr);
	free(colors);
	destroyMMBitmap(bitmap);
}

typedef struct Point {
	int x;
	int y;
} Point;

typedef struct Query {
	int color;
	int repetition;
	int limit;
	int match_count;
	Point matches[128];
} Query;

typedef struct Measure {
	int color;
	Point start;
	Point end;
	int percentage;
} Measure;



NAN_METHOD(pixelScan)
{
	Point pos = {0, 0};

	int info_index = 0;
	int left = Nan::To<int32_t>(info[info_index++]).FromJust();
	int top = Nan::To<int32_t>(info[info_index++]).FromJust();
	int right = Nan::To<int32_t>(info[info_index++]).FromJust();
	int bot = Nan::To<int32_t>(info[info_index++]).FromJust();

	#define MAX_QUERY 128
	Query queries[MAX_QUERY];
	int query_count = Nan::To<int32_t>(info[info_index++]).FromJust();

	for (int i=0; i<query_count; i++) {
		Query *query = &queries[i];

		query->color = Nan::To<int32_t>(info[info_index++]).FromJust() | 0xFF000000;
		query->repetition = Nan::To<int32_t>(info[info_index++]).FromJust();
		query->limit = Nan::To<int32_t>(info[info_index++]).FromJust();

		if (query->limit > MAX_QUERY || query->limit < 1) {
			query->limit = MAX_QUERY;
		}

		query->match_count = 0;
	}

	Measure measures[16];
	int measure_count = Nan::To<int32_t>(info[info_index++]).FromJust();

	
	for (int i = 0; i < measure_count; i++)
	{
		Measure *measure = &measures[i];

		measure->color = Nan::To<int32_t>(info[info_index++]).FromJust() | 0xFF000000;

		measure->start.x = Nan::To<int32_t>(info[info_index++]).FromJust();
		measure->start.y = Nan::To<int32_t>(info[info_index++]).FromJust();

		measure->end.x = Nan::To<int32_t>(info[info_index++]).FromJust();
		measure->end.y = Nan::To<int32_t>(info[info_index++]).FromJust();
		
		measure->percentage = 0;
	}

	MMBitmapRef bitmap = copyMMBitmapFromDisplayInRect(MMRectMake(left, top, right, bot));
	int *pixels = (int *)(void *)bitmap->imageBuffer;

	int width = right - left;
	int height = bot - top;

	for (int y = 0; y < height; y++)
	{
		for (int x = 0; x < width; x++)
		{
			int pixel = *pixels;

			for (int i = 0; i < query_count; i++)
			{
				Query *query = &queries[i];

				if (query->match_count < query->limit) {
					if (query->color == pixel && query->repetition <= width - x)
					{
						int i=0;
						while (query->color == *(pixels + ++i));
						
						if (query->repetition <= i) {
							query->matches[query->match_count++] = {x, y};
						}
						
						pixels += i;
						x += i;
						break;
					}
				}
			}

			pixels++;
		}
	}

	pixels = (int *)(void *)bitmap->imageBuffer;

	for (int i = 0; i < measure_count; i++)
	{
		Measure *measure = &measures[i];

		for (int x = measure->end.x; !measure->percentage && x >= measure->start.x; x--)
		{
			for (int y = measure->end.y; !measure->percentage && y >= measure->start.y; y--)
			{
				if (measure->color == *(pixels + y * width + x)) {
					measure->percentage = (int)((float)(x - measure->start.x) / (float)(measure->end.x - measure->start.x)*100.0);
				}
			}
		}
	}

	pixels = (int *)(void *)bitmap->imageBuffer;


	bool leftSide = true;
	std::vector<int> main_sequence;

	for (int x=290; x<=350; x++) {
		int line = 0;
		int count = 0;
		for (int y=807 + top; y<=818 + top; y++) {
			int pc = *(pixels + y * width + x);

			if (pc == 0xFF48F5F3) {
				if (line) line <<= 1;
				else line = 1 << count;
			}
			else if (pc == 0xFF34B2B0 && *(pixels + (y - 1) * width + x) == 0xFF154747) line--;
			count++;
		}

		if (line) main_sequence.push_back(line);
	}

	std::vector<int> sequence;


	int mid = (int)main_sequence.size() / 2;
	int i = 0;
	int temp;
	while (i < mid) {
		temp = main_sequence[i];
		main_sequence[i] = main_sequence[main_sequence.size() - i -1];
		main_sequence[main_sequence.size() - i - 1] = temp; i++;
	}

	while (main_sequence.size() > 0) {
		sequence.push_back(main_sequence[main_sequence.size() - 1]);
		main_sequence.pop_back();

		int digit = -1;

		switch (sequence.size())
		{
		case 1:
		{
			if (sequence[0] == 1024)
				digit = 1;
			else if (sequence[0] < 0)
			{
				leftSide = false;

				sequence.clear();
			}
			break;
		}
		case 2:
		{
			if (sequence[0] == 4 && sequence[1] == 32)
				digit = 3;
			else if (sequence[0] == 128 && sequence[1] == 128 && (main_sequence.size() == 0 || main_sequence[0] != 1024))
				digit = 6;
			break;
		}
		case 3:
		{
			if (sequence[0] == 256 && sequence[1] == 2 && sequence[2] == 64)
				digit = 0;
			else if (sequence[0] == 128 && sequence[1] == 128 && sequence[2] == 1024)
				digit = 4;
			else if (sequence[0] == 32 && sequence[1] == 32 && sequence[2] == 32)
				digit = 8;
			else if (sequence[0] == 16 && sequence[1] == 64 && sequence[2] == 32)
				digit = 9;

			break;
		}
		case 4:
		{
			if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 128)
				digit = 5;
			break;
		}
		case 5:
		{
			if (sequence[0] == 8 && sequence[1] == 512 && sequence[2] == 1024 && sequence[3] == 1024 && sequence[4] == 1024)
				digit = 2;
			break;
		}
		case 6:
		{
			if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 1 && sequence[4] == 2 && sequence[5] == 1)
				digit = 7;
			break;
		}
		}

		if (digit != -1)
		{
			if (leftSide) {
				pos.x *= 10;
				pos.x += digit;
			}
			else {
				pos.y *= 10;
				pos.y += digit;
			}
				

			sequence.clear();
		}
	}

	destroyMMBitmap(bitmap);

	Local<Array> results = Nan::New<Array>();

	Local<Array> query_results = Nan::New<Array>();

	for (int i=0; i<query_count; i++)
	{
		Query *query = &queries[i];

		Local<Array> query_result = Nan::New<Array>();

		for (int i=0; i<query->match_count; i++)
		{
			Local<Object> point = Nan::New<Object>();

			Nan::Set(point, Nan::New("x").ToLocalChecked(), Nan::New<Number>(query->matches[i].x));
			Nan::Set(point, Nan::New("y").ToLocalChecked(), Nan::New<Number>(query->matches[i].y));

			Nan::Set(query_result, i, point);
		}

		Nan::Set(query_results, i, query_result);
	}

	Nan::Set(results, 0, query_results);

	Local<Array> measure_results = Nan::New<Array>();

	for (int i=0; i<measure_count; i++)
	{
		Nan::Set(measure_results, i, Nan::New<Number>(measures[i].percentage));
	}

	Nan::Set(results, 1, measure_results);

	Local<Object> point = Nan::New<Object>();
	Nan::Set(point, Nan::New("x").ToLocalChecked(), Nan::New<Number>(pos.x));
	Nan::Set(point, Nan::New("y").ToLocalChecked(), Nan::New<Number>(pos.y));
	Nan::Set(results, 2, point);

	info.GetReturnValue().Set(results);
}


NAN_METHOD(getScreenSize)
{
	//Get display size.
	MMSize displaySize = getMainDisplaySize();

	//Create our return object.
	Local<Object> obj = Nan::New<Object>();
	Nan::Set(obj, Nan::New("width").ToLocalChecked(), Nan::New<Number>(displaySize.width));
	Nan::Set(obj, Nan::New("height").ToLocalChecked(), Nan::New<Number>(displaySize.height));

	//Return our object with .width and .height.
	info.GetReturnValue().Set(obj);
}

NAN_METHOD(getXDisplayName)
{
	#if defined(USE_X11)
	const char* display = getXDisplay();
	info.GetReturnValue().Set(Nan::New<String>(display).ToLocalChecked());
	#else
	Nan::ThrowError("getXDisplayName is only supported on Linux");
	#endif
}

NAN_METHOD(setXDisplayName)
{
	#if defined(USE_X11)
	Nan::Utf8String string(info[0]);
	setXDisplay(*string);
	info.GetReturnValue().Set(Nan::New(1));
	#else
	Nan::ThrowError("setXDisplayName is only supported on Linux");
	#endif
}

NAN_METHOD(captureScreen)
{
	size_t x;
	size_t y;
	size_t w;
	size_t h;

	//If user has pro

	// If user has provided screen coords, use them!
	if (info.Length() == 4)
	{
		//TODO: Make sure requested coords are within the screen bounds, or we get a seg fault.
		// 		An error message is much nicer!

		x = Nan::To<int32_t>(info[0]).FromJust();
		y = Nan::To<int32_t>(info[1]).FromJust();
		w = Nan::To<int32_t>(info[2]).FromJust();
		h = Nan::To<int32_t>(info[3]).FromJust();
	}
	else
	{
		//We're getting the full screen.
		x = 0;
		y = 0;

		//Get screen size.
		MMSize displaySize = getMainDisplaySize();
		w = displaySize.width;
		h = displaySize.height;
	}

	MMBitmapRef bitmap = copyMMBitmapFromDisplayInRect(MMRectMake(x, y, w, h));

	uint32_t bufferSize = bitmap->bytewidth * bitmap->height;
	Local<Object> buffer = Nan::NewBuffer((char*)bitmap->imageBuffer, bufferSize, destroyMMBitmapBuffer, NULL).ToLocalChecked();

	Local<Object> obj = Nan::New<Object>();
	Nan::Set(obj, Nan::New("width").ToLocalChecked(), Nan::New<Number>(bitmap->width));
	Nan::Set(obj, Nan::New("height").ToLocalChecked(), Nan::New<Number>(bitmap->height));
	Nan::Set(obj, Nan::New("byteWidth").ToLocalChecked(), Nan::New<Number>(bitmap->bytewidth));
	Nan::Set(obj, Nan::New("bitsPerPixel").ToLocalChecked(), Nan::New<Number>(bitmap->bitsPerPixel));
	Nan::Set(obj, Nan::New("bytesPerPixel").ToLocalChecked(), Nan::New<Number>(bitmap->bytesPerPixel));
	Nan::Set(obj, Nan::New("image").ToLocalChecked(), buffer);

	info.GetReturnValue().Set(obj);
}

/*
 ____  _ _
| __ )(_) |_ _ __ ___   __ _ _ __
|  _ \| | __| '_ ` _ \ / _` | '_ \
| |_) | | |_| | | | | | (_| | |_) |
|____/|_|\__|_| |_| |_|\__,_| .__/
                            |_|
 */

class BMP
{
	public:
		size_t width;
		size_t height;
		size_t byteWidth;
		uint8_t bitsPerPixel;
		uint8_t bytesPerPixel;
		uint8_t *image;
};

//Convert object from Javascript to a C++ class (BMP).
BMP buildBMP(Local<Object> info)
{
	Local<Object> obj = Nan::To<v8::Object>(info).ToLocalChecked();

	BMP img;

	img.width = Nan::Get(obj, Nan::New("width").ToLocalChecked()).ToLocalChecked()->Uint32Value(Nan::GetCurrentContext()).FromJust();
	img.height = Nan::Get(obj, Nan::New("height").ToLocalChecked()).ToLocalChecked()->Uint32Value(Nan::GetCurrentContext()).FromJust();
	img.byteWidth = Nan::Get(obj, Nan::New("byteWidth").ToLocalChecked()).ToLocalChecked()->Uint32Value(Nan::GetCurrentContext()).FromJust();
	img.bitsPerPixel = Nan::Get(obj, Nan::New("bitsPerPixel").ToLocalChecked()).ToLocalChecked()->Uint32Value(Nan::GetCurrentContext()).FromJust();
	img.bytesPerPixel = Nan::Get(obj, Nan::New("bytesPerPixel").ToLocalChecked()).ToLocalChecked()->Uint32Value(Nan::GetCurrentContext()).FromJust();

	char* buf = node::Buffer::Data(Nan::Get(obj, Nan::New("image").ToLocalChecked()).ToLocalChecked());

	//Convert the buffer to a uint8_t which createMMBitmap requires.
	img.image = (uint8_t *)malloc(img.byteWidth * img.height);
	memcpy(img.image, buf, img.byteWidth * img.height);

	return img;
 }

NAN_METHOD(getColor)
{
	MMBitmapRef bitmap;
	MMRGBHex color;

	size_t x = Nan::To<int32_t>(info[1]).FromJust();
	size_t y = Nan::To<int32_t>(info[2]).FromJust();

	//Get our image object from JavaScript.
	BMP img = buildBMP(Nan::To<v8::Object>(info[0]).ToLocalChecked());

	//Create the bitmap.
	bitmap = createMMBitmap(img.image, img.width, img.height, img.byteWidth, img.bitsPerPixel, img.bytesPerPixel);

	// Make sure the requested pixel is inside the bitmap.
	if (!MMBitmapPointInBounds(bitmap, MMPointMake(x, y)))
	{
		return Nan::ThrowError("Requested coordinates are outside the bitmap's dimensions.");
	}

	color = MMRGBHexAtPoint(bitmap, x, y);

	char hex[7];

	padHex(color, hex);

	destroyMMBitmap(bitmap);

	info.GetReturnValue().Set(Nan::New(hex).ToLocalChecked());

}

NAN_MODULE_INIT(InitAll)
{
	Nan::Set(target, Nan::New("dragMouse").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(dragMouse)).ToLocalChecked());

	Nan::Set(target, Nan::New("updateScreenMetrics").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(updateScreenMetrics)).ToLocalChecked());

	Nan::Set(target, Nan::New("moveMouse").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(moveMouse)).ToLocalChecked());

	Nan::Set(target, Nan::New("moveMouseSmooth").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(moveMouseSmooth)).ToLocalChecked());

	Nan::Set(target, Nan::New("getMousePos").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(getMousePos)).ToLocalChecked());

	Nan::Set(target, Nan::New("mouseClick").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(mouseClick)).ToLocalChecked());

	Nan::Set(target, Nan::New("mouseToggle").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(mouseToggle)).ToLocalChecked());

	Nan::Set(target, Nan::New("scrollMouse").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(scrollMouse)).ToLocalChecked());

	Nan::Set(target, Nan::New("setMouseDelay").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(setMouseDelay)).ToLocalChecked());

	Nan::Set(target, Nan::New("keyTap").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(keyTap)).ToLocalChecked());

	Nan::Set(target, Nan::New("keyToggle").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(keyToggle)).ToLocalChecked());

	Nan::Set(target, Nan::New("typeString").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(typeString)).ToLocalChecked());

	Nan::Set(target, Nan::New("typeStringDelayed").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(typeStringDelayed)).ToLocalChecked());

	Nan::Set(target, Nan::New("setKeyboardDelay").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(setKeyboardDelay)).ToLocalChecked());

	Nan::Set(target, Nan::New("getPixelColor").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(getPixelColor)).ToLocalChecked());

	Nan::Set(target, Nan::New("findColor").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(findColor)).ToLocalChecked());

	Nan::Set(target, Nan::New("scanColors").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(scanColors)).ToLocalChecked());

	Nan::Set(target, Nan::New("pixelScan").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(pixelScan)).ToLocalChecked());

	Nan::Set(target, Nan::New("getScreenSize").ToLocalChecked(	),
		Nan::GetFunction(Nan::New<FunctionTemplate>(getScreenSize)).ToLocalChecked());

	Nan::Set(target, Nan::New("captureScreen").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(captureScreen)).ToLocalChecked());

	Nan::Set(target, Nan::New("getColor").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(getColor)).ToLocalChecked());

	Nan::Set(target, Nan::New("getXDisplayName").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(getXDisplayName)).ToLocalChecked());

	Nan::Set(target, Nan::New("setXDisplayName").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(setXDisplayName)).ToLocalChecked());
}

NODE_MODULE(robotjs, InitAll)
