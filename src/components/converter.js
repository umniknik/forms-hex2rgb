import React, { useState } from "react";

function Converter() {

    //Обработчик отправки формы, чтобы отменить автоматическую отправку формы
    const handleSubmit = evt => {
        evt.preventdefault();
    }

    //Задаем изначальные состояния цветов, пока они пустые, т.к. в поля ничего не ввели ещё
    const [form, setForm] = useState({
        colorHEX: '',
        colorRGB: '',
    })

    //Функция обновления состояния цветов, при вводе значения в первое поле
    const handleHEXtoRGB = ({ target }) => {
        //В состоянмие цветы hex устнавливаем значение полученное из первого поля ввода данных
        setForm({ colorHEX: target.value }); 

        //В состояние цвета RGB устанавливаем значение вычисленное функцией hexToRgb()
        setForm({ colorRGB: hexToRgb(target.value) }); 
    }

    //Функция преобразования HEX в RGB
    const hexToRgb = (hex) => {  

        if (hex.length === 7) {
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);

            //Проверка на то, что ввод начали с '#'
            if (hex[0] !== '#') {
                 //Меняем цвет фона, если цвет введен неверно
                 document.body.style.backgroundColor = '#e94b35';
                return 'ошибка, начните с "#"';            
            }
            // Проверка на NaN
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                 //Меняем цвет фона, если цвет введен неверно
                 document.body.style.backgroundColor = '#e94b35';
                return 'Ошибка!';
            }

            //Меняем цвет фона, если цвет введен правильно
            document.body.style.backgroundColor = hex;

            return `rgb(${r}, ${g}, ${b})`;
        }

         //Меняем цвет фона на начальное, если ещё не все символы цвета введены
         document.body.style.backgroundColor = '#33495f';
        return '';
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* При вводе каждом вводе или уделнии символа запускаем функцию handleHEXtoRGB */}
            <input id='colorHEX' name='colorHEX' value={form.colorHEX} onChange={handleHEXtoRGB} maxlength='7' />
            <input id='colorRGB' name='colorRGB' value={form.colorRGB} readOnly  />           
        </form>
    )
}

export default Converter;