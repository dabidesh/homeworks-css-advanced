import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllListings, getCollectionSize } from '../api/data.js';

import { carTemplate } from './common/car.js';

const catalogTemplate = (cars, page, pages) => html`
<section id="car-listings">
  <h1>Car Listings</h1>
  <div class="listings">
  <!-- Template is functional, no logic -->
    <div>Page ${page} / ${pages}
      ${page == 1 ? '' :
        html`<a class="button-list" href="/all-listings?page=${page - 1}">&lt; Prev</a>`}
      ${page >= pages ? '' :
    html`<a class="button-list" href="/all-listings?page=${page + 1}">Next &gt;</a>`}
    </div>
    ${cars.length == 0 ? html`<p class="no-cars">No cars in database.</p>` : cars.map(carTemplate)}
  </div>
</section>
`;

export async function catalogPage(context) {
  // if first is falsy will be 1
  const page = +(context.querystring.split('=')[1]) || 1;

  const count = await getCollectionSize();
  const pages = Math.ceil(count / 3);
  const cars = await getAllListings(page);
  context.render(catalogTemplate(cars, page, pages));
}