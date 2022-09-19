const burger = document.querySelector('.burger');
const nav = document.querySelector('.menu__body');
const body = document.body;
const navItems = nav.querySelectorAll('a');
const login = document.querySelector('.header__btn')
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion__item');

    accordions.forEach(el => {
        el.addEventListener('click', (e) =>{
            const self = e.currentTarget;
            const control = self.querySelector('.accordion__control');
            const content = self.querySelector('.accordion__control');

            self.classList.toggle('open');
        })
    })
})
function init() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        slider.oninput = onSliderInput;

        updateValue(slider);
        updateValuePosition(slider);
        updateLabels(slider);
        updateProgress(slider);

        setTicks(slider);
    }
}

function onSliderInput(event) {
    updateValue(event.target);
    updateValuePosition(event.target);
    updateLabels(event.target);
    updateProgress(event.target);
}

function updateValue(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    value.innerHTML = "<div>" + slider.value + "</div>";
}

function updateValuePosition(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    const percent = getSliderPercent(slider);

    const sliderWidth = slider.getBoundingClientRect().width;
    const valueWidth = value.getBoundingClientRect().width;
    const handleSize = slider.dataset.handleSize;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = slider.value === slider.min ? 0 : left;

    value.style.left = left + "px";
}

function updateLabels(slider) {
    const value = document.getElementById(slider.dataset.valueId);
    const minLabel = document.getElementById(slider.dataset.minLabelId);
    const maxLabel = document.getElementById(slider.dataset.maxLabelId);

    const valueRect = value.getBoundingClientRect();
    const minLabelRect = minLabel.getBoundingClientRect();
    const maxLabelRect = maxLabel.getBoundingClientRect();

    const minLabelDelta = valueRect.left - (minLabelRect.left);
    const maxLabelDelta = maxLabelRect.left - valueRect.left;

    const deltaThreshold = 32;

    if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
    else minLabel.classList.remove("hidden");

    if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
    else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
    let progress = document.getElementById(slider.dataset.progressId);
    const percent = getSliderPercent(slider);

    progress.style.width = percent * 10 + "%";
}

function getSliderPercent(slider) {
    const range = slider.max - slider.min;
    const absValue = slider.value - slider.min;

    return absValue / range;
}

function setTicks(slider) {
    let container = document.getElementById(slider.dataset.tickId);
    const spacing = parseFloat(slider.dataset.tickStep);
    const sliderRange = slider.max - slider.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");

        tick.className = "tick-slider-tick";

        container.appendChild(tick);
    }
}

function onResize() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        updateValuePosition(slider);
    }
}

window.onload = init;
window.addEventListener("resize", onResize);

//Открывать меню
burger.addEventListener('click', () =>{
	body.classList.toggle('stop-scroll');
	burger.classList.toggle('active');
	nav.classList.toggle('active');
    login.classList.toggle('active');
});
// Чтобы закрывать меню при клики на свободную область 
nav.addEventListener('click', e => {
	if (e.target.classList.contains('nav')) {
		body.classList.remove('stop-scroll');
		burger.classList.remove('burger__active');
		nav.classList.remove('active');
        login.classList.remove('active');
	}
});
// Закрывать меню при клике на ссылки
navItems.forEach(el => {
	el.addEventListener('click', () => {
		body.classList.remove('stop-scroll');
		burger.classList.remove('active');
		nav.classList.remove('active');
        login.classList.remove('active');
	})
});

//___RANGE-SLIDER___
const rangeSlider = document.getElementById('range-slider');
const rangeSlider2 = document.getElementById('range-slider2');

    var slider = document.getElementById('slider');
    
noUiSlider.create(rangeSlider, {
    tooltips: [
        true, // tooltip with default formattin
    ],
    start: [1000],
    connect: 'lower',
    range: {
        'min': [1000],
        'max': [100000]
    },
    format:{
        to: function (value) {
            return parseInt(value);
        },
        from: function (value) {
            return parseInt(value);
        }
    }
});
noUiSlider.create(rangeSlider2, {
    tooltips: true,
    start: [3],
    connect: 'lower',
    steps: [1],
    range: {
        'min': [3],
        'max': [30]
    },
    format:{
        to: function (value) {
            return parseInt(value);
        },
        from: function (value) {
            return parseInt(value);
        }
    }
});
