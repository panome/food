'use strict'
window.addEventListener('DOMContentLoaded', () => {



	//TABS
	const tabContent = document.querySelectorAll('.tabcontent'),
			tabheaderParent = document.querySelector('.tabheader__items'),
			tabheaderItem = tabheaderParent.querySelectorAll('.tabheader__item')


	function hideTabContent() {
		tabContent.forEach(item => {
			item.classList.add('hide')
			item.classList.remove('show')
		})

		tabheaderItem.forEach(item => {
			item.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(i = 0) {
		tabContent[i].classList.remove('hide')
		tabContent[i].classList.add('show')
		tabheaderItem[i].classList.add('tabheader__item_active')
	}

	hideTabContent()
	showTabContent()

	tabheaderParent.addEventListener('click', (e) => {
		const target = e.target

		if (target && target.classList.contains('tabheader__item')) {
			tabheaderItem.forEach((item, i) => {
				if (target == item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})


	//TIMER
	const deadline = '2020-08-10'

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor(t / (1000 * 60) % 60),
				hours = Math.floor(t / (1000 * 60 * 60) % 24),
				days = Math.floor(t / (1000 * 60 * 60 * 24))
		
		return {
			'total': t,
			'seconds': seconds,
			'minutes': minutes,
			'hours': hours,
			'days': days
		}
	}

	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`
		} else {
			return num
		}
	}
	
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
				seconds = timer.querySelector('#seconds'),
				minutes = timer.querySelector('#minutes'),
				hours = timer.querySelector('#hours'),
				days = timer.querySelector('#days')

		function updateClock() {
			const t = getTimeRemaining(endtime)
					seconds.innerHTML = addZero(t.seconds)
					minutes.innerHTML = addZero(t.minutes)
					hours.innerHTML = addZero(t.hours)
					days.innerHTML = addZero(t.days)
		}
		updateClock()

		setInterval(updateClock, 1000)
	}
	setClock('.timer', deadline)

	//MODAL
	const modal = document.querySelector('[data-modal]'),
			modalOpen = document.querySelectorAll('[data-modalOpen]'),
			modalClose = document.querySelector('[data-modalClose]')

	const showModal = (selectorModal, selectorOpen) => {
		selectorOpen.forEach(item => {
			item.addEventListener('click', () => {
				selectorModal.style.display = 'block'
				document.body.style.overflow = 'hidden'
			})
		})	
	}

	const hideModal = (selectorModal, selectorClose) => {
		selectorClose.addEventListener('click', () => {
			selectorModal.style.display = 'none'
			document.body.style.overflow = 'scroll'
		})
	}
	showModal(modal, modalOpen)
	hideModal(modal, modalClose)
	
	//DYNAMIC CARDS
	class Cards {
		constructor (img, alt, title, descr, price, parentSelector) {
			this.img = img
			this.alt = alt
			this.title = title
			this.descr = descr
			this.price = price
			this.parent = document.querySelector(parentSelector)
		}

		render() {
			const element = document.createElement('div')

			element.classList.add('menu__item')
			
			element.innerHTML = `
				<img src="${this.img}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`
			this.parent.append(element)
		}
	}

	new Cards (
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощейи фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой высоким качеством!',
		'229',
		'.menu .container'
	).render()

	new Cards(
		'img/tabs/elite.jpg',
		'elite',
		'Меню "Премиум"',
		'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		'550',
		'.menu .container'
	).render()

	new Cards(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		'430',
		'.menu .container'
	).render()

	//FORMS
	const forms = document.querySelectorAll('form')

	const message = {
		loading: 'Zagruzka',
		succes: 'Spasibo! Skoro my s vami svyazhemsya',
		failure: 'Chtoto poshlo ne tak'
	}

	forms.forEach(item => {
		postData(item)
	})

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault()

			const statusMessage = document.createElement('div')
			statusMessage.classList.add('status')
			statusMessage.textContent = message.loading
			form.append(statusMessage)

			const request = new XMLHttpRequest()
			request.open('POST', 'server.php')

			request.setRequestHeader('Content-type', 'application/json')

			const formData = new FormData(form)

			const object = {}

			formData.forEach((value, key) => {
				object[key] = value
			})

			const json = JSON.stringify(object)

			request.send(json)

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response)
					statusMessage.textContent = message.succes
					form.reset()
					setTimeout(() => {
						statusMessage.remove()
					}, 2000)
				} else {
					statusMessage.textContent = message.failure
				}
			})
		})
	}


})