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
				days = timer.querySelector('#days'),
				timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const t = getTimeRemaining(endtime)

			seconds.innerHTML = addZero(t.seconds)
			minutes.innerHTML = addZero(t.minutes)
			hours.innerHTML = addZero(t.hours)
			days.innerHTML = addZero(t.days)
		}
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
	//SLIDER
})