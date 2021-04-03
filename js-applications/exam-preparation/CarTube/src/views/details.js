import { html } from '../../node_modules/lit-html/lit-html.js';

import { getListingById, deleteListing } from '../api/data.js';

const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
  <h1>Details</h1>
  <div class="details-info">
    <img src="${car.imageUrl}">
    <hr>
    <ul class="listing-props">
      <li><span>Brand:</span>${car.brand}</li>
      <li><span>Model:</span>${car.model}</li>
      <li><span>Year:</span>${car.year}</li>
      <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>

    ${isOwner ? html`<div class="listings-buttons">
      <a href="/edit/${car._id}" class="button-list">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
    </div>` : ''}

  </div>
</section>
`;

export async function detailsPage(context) {

  const onDelete = async () => {
    if (confirm('Are you sure?')) {
      await deleteListing(carId);
      context.page.redirect('/all-listings');
    }
  };

  const carId = context.params.id;
  const car = await getListingById(carId);

  const isOwner = context.user && car._ownerId == context.user._id;

  /* document.querySelector('title').textContent =
    'Car Tube ' + `${car.brand} ${car.model} ${car.price}$`;
  document.querySelector('meta[name="description"').setAttribute('content',
    `${car.brand} ${car.model} ${car.price}$ Year: ${car.year} 
    Grandmama driving this car 20 minutes per day!`); */

  context.render(detailsTemplate(car, isOwner, onDelete));



}
