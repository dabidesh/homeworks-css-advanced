import { html } from '../../node_modules/lit-html/lit-html.js';
// render come outside from context

const homeTemplate = () => html`
<div id="welcome-container">
  <h1>Welcome To Car Tube</h1>
  <img class="hero" src="/images/car-png.webp" alt="carIntro">
  <h2>To see all the listings click the link below:</h2>
  <div>
    <a href="/all-listings" class="button">Listings</a>
  </div>
</div>`;

export async function homePage(context) {
  await context.render(homeTemplate());
}