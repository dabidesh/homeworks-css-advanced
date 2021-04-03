import { html } from '../../node_modules/lit-html/lit-html.js';

import { getMyListings } from '../api/data.js';

import { carTemplate } from './common/car.js';


const myListingsTemplate = (cars) => html`
<section id="my-listings">
  <h1>My car listings</h1>
  <div class="listings">

    ${cars.length == 0 ? html`<p class="no-cars">
      You haven't listed any cars yet.
    </p>` : cars.map(carTemplate)}

  </div>
</section>

`;

export async function myListingsPage(context) {

  const userId = context.user._id;

  const cars = await getMyListings(userId);

  context.render(myListingsTemplate(cars));
}