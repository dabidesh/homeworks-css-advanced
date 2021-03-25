import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFurniture, setStyleInMenu } from '../api/data.js';
import { itemTemplate } from './common/item.js';

const myFurnitureTemplate = (data) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>My Furniture</h1>
    <p>This is a list of your publications.</p>
  </div>
</div>
<div class="row space-top">
  ${data.map(itemTemplate)}
</div>`;

export async function myPage(ctx) {
  //console.log('my page');

  const data = await getMyFurniture();

  await ctx.render(myFurnitureTemplate(data));

  setStyleInMenu();
}