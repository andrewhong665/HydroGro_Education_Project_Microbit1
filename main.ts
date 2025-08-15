input.onButtonPressed(Button.A, function () {
    pins.analogWritePin(AnalogPin.P2, 0)
})
let pHValue = 0
let voltagePH = 0
let analogValuePH = 0
let TDS = 0
let voltage = 0
let analogValue = 0
OLED.init(128, 64)
pins.analogWritePin(AnalogPin.P2, 1023)
basic.forever(function () {
    analogValue = pins.analogReadPin(AnalogPin.P1)
    // 將模擬值轉換為電壓示意（Microbit ADC範圍0~1023 對應 0~3.3V）
    voltage = analogValue * 3.3 / 1023
    // 模擬轉換成TDS數據的公式，依照您板子說明微調
    // 如板子說明，模擬數值換算比例
    TDS = voltage * 500
    OLED.writeString("TDS:")
    OLED.writeNumNewLine(TDS)
    basic.pause(1000)
    // 讀取pH感測器（接P10）
    analogValuePH = pins.analogReadPin(AnalogPin.P10)
    voltagePH = analogValuePH * 3.3 / 1023
    // 依pH感測器校正公式轉換，pH約線性與電壓對應
    // 假設輸出範圍0.5~3.3V對應pH0~14
    pHValue = (voltagePH - 0.8) * 14 / 3
    OLED.writeString("PH:")
    OLED.writeNumNewLine(pHValue)
    basic.pause(1000)
    basic.clearScreen()
    if (pHValue < 0 && TDS < 0) {
        pins.analogWritePin(AnalogPin.P2, 0)
        basic.pause(2000)
        pins.analogWritePin(AnalogPin.P2, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P2, 1023)
    }
})
