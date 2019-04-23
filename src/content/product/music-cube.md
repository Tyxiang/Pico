---
title: 音乐魔方
order: 10
template: content
h1: 音乐魔方 Music Cube
# navigate: header
description: 随音乐节奏闪动的全彩魔方。最简单的应用，涉及模拟信号（声音）采样、PWM输出、RGB三原色、数组、排序算法等知识。
---
<!--pico-element centre-park-->

![main](%base_url%/images/main-music-cube.jpg)

<!--pico-element-end-->

<!--pico-element toc-->

## 零件清单

| 型号 | 名称            | 数量 | 说明           |
|------|----------------|:----:|----------------|
| P-01 | 方片           | 52    |               |
| P-02 | 角连           | 32    |               |
| P-03 | 直连           | 58    |               |
| P-04 | 三连           | 6     |               |
| P-09 | 支撑           | 2     |               |
| U-01 | Micro USB 接口 | 1     |               |
| M-03 | 声音传感器模块  | 1     |               |
| M-04 | 全彩LED模块    | 1     |               |
| C-01 | 连接线         | 1     |               |

## 硬件装配

Coming Soon ...

## 示例程序（Arduino）

```arduino
/*
Music Cube Official Program by Arduino
Version: 1.01
*/

int pin_red = 12;
int pin_green = 13;
int pin_blue = 14;

int amplitude[10];

int gain = 100;

void setup() {
  Serial.begin(115200);
  pinMode(pin_red, OUTPUT);
  pinMode(pin_green, OUTPUT);
  pinMode(pin_blue, OUTPUT);
}

void loop() {
  for (int i = 0; i < 10; i++) {
    unsigned long now = millis();
    int interval = 10;
    int sample;
    amplitude[i] = 0;
    int output;
    while (millis() < now + interval) {
      sample = analogRead(A0);
      if(sample > amplitude[i]) amplitude[i] = sample;
    }
  }

  for (int i = 0; i < 9; i++) {
      for (int j = 0; j < 9 - i; j++) {
          if (amplitude[j] > amplitude[j+1]) {
              int temp = amplitude[j+1];
              amplitude[j+1] = amplitude[j];
              amplitude[j] = temp;
          }
      }
  }

  int r = (amplitude[9] - amplitude[6])*gain;
  int g = (amplitude[8] - amplitude[5])*gain;
  int b = (amplitude[7] - amplitude[4])*gain;
  
  analogWrite(pin_red, r);
  analogWrite(pin_green, g);
  analogWrite(pin_blue, b);

  Serial.print(r);
  Serial.print(",");
  Serial.print(g);
  Serial.print(",");
  Serial.print(b);
  Serial.println();
}
```
[代码下载](code/music-cube.ino)

<!--pico-element-end-->