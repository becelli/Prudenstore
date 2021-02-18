const body = document.querySelector('body')
const page = document.querySelector('#page')
const shipping = document.querySelector('#shipping')
let id = 0

//  List the bought products
const listProducts = (array) => {
	const main = document.createElement('section')
	const title = document.createElement('h1')
	title.classList.add('title')
	title.innerHTML = 'Resumo do Pedido'
	page.appendChild(title)
	main.setAttribute('id', 'products')
	array.forEach((item) => {
		const card = document.createElement('section')
		const name = document.createElement('h1')
		const image = document.createElement('img')
		card.classList.add('card')
		image.setAttribute('src', item.image)
		name.innerHTML = item.name

		card.appendChild(image)
		card.appendChild(name)
		main.appendChild(card)
		id++
	})
	page.appendChild(main)
	lastDisplayed = array
}
// Display the shipping time and a message
const showShipping = () => {
	const div = document.createElement('div')
	div.classList.add('margin')
	const h1 = document.createElement('h1')
	h1.classList.add('title')
	const h2 = document.createElement('h2')
	h2.classList.add('sub-title')
	const plural = id > 1 ? true : false
	h2.innerHTML = `Obrigado por comprar na Prudenstore! Nos envie um feedback quando o${
		plural ? 's' : ''
	} produto${plural ? 's' : ''} chegar${plural ? 'em' : ''}! 😍`

	const randomByDays = Math.floor(Math.random() * 10 + 1)
	const randomByQuantity = Math.floor(Math.random() * Math.floor(id / 6) + 1)
	const ShippingTimeMax = Math.floor(Math.random() * (randomByQuantity * randomByDays) + 4)
	const ShippingTimeMin = ShippingTimeMax > 6 ? ShippingTimeMax - 5 : ShippingTimeMax - 2
	h1.innerHTML = `Tempo de entrega: ${ShippingTimeMin} a ${ShippingTimeMax} dias úteis`

	div.appendChild(h1)
	div.appendChild(h2)

	shipping.appendChild(div)
}

// Get info by sessionStorage
const recoverInfo = () => {
	cart = JSON.parse(sessionStorage.getItem('shipping'))
	if (cart == null || cart.length == 0) window.location.href = './'
	else {
		listProducts(cart)
		showShipping()
	}
}
recoverInfo()
