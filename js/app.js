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