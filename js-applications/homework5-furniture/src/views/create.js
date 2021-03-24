import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecord } from '../api/data.js';

const createTemplate = (onSubmit,
  errMake, isMakeValid,
  errModel, isModelValid,
  errYear, isYearValid,
  errDescription, isDescriptionValid,
  errPrice, isPriceValid,
  errImg, isImgValid) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>Create New Furniture</h1>
    <p>Please fill all fields except material.</p>
  </div>
</div>
<form @submit=${onSubmit}>
  <div class="row space-top">
    <div class="col-md-4">
      ${!isMakeValid ? html`<p class="red">${errMake}</p>` : ''}
      ${!isModelValid ? html`<p class="red">${errModel}</p>` : ''}
      ${!isYearValid ? html`<p class="red">${errYear}</p>` : ''}
      ${!isDescriptionValid ? html`<p class="red">${errDescription}</p>` : ''}
      ${!isPriceValid ? html`<p class="red">${errPrice}</p>` : ''}
      ${!isImgValid ? html`<p class="red">${errImg}</p>` : ''}
      <div class="form-group">
        <label class="form-control-label" for="new-make">Make</label>
        <input class=${'form-control' + (!isMakeValid ? ' is-invalid' : ' is-valid')} id="new-make" type="text"
          name="make">
      </div>
      <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input class=${'form-control' + (!isModelValid ? ' is-invalid' : ' is-valid')} id="new-model" type="text"
          name="model">
      </div>
      <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input class=${'form-control' + (!isYearValid ? ' is-invalid' : ' is-valid' )} id="new-year" type="number"
          name="year">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-description">Description</label>
        <input class=${'form-control' + (!isDescriptionValid ? ' is-invalid' : ' is-valid' )} id="new-description"
          type="text" name="description">
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input class=${'form-control' + (!isPriceValid ? ' is-invalid' : ' is-valid' )} id="new-price" type="number"
          name="price">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input class=${'form-control' + (!isImgValid ? ' is-invalid' : ' is-valid' )} id="new-image" type="text"
          name="img">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-material">Material (optional)</label>
        <input class="form-control" id="new-material" type="text" name="material">
      </div>
      <input type="submit" class="btn btn-primary" value="Create" />
    </div>
  </div>
</form>`;

export async function createPage(ctx) {
  //console.log('create page');

  //const id = ctx.params.id;
  //const item = await getItemById(id);

  //console.log('item: ' + item);  //  [object Object]


  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let data = {};
    const formData = new FormData(e.target);
    data.make = formData.get('make').trim();
    data.model = formData.get('model').trim();
    data.year = +(formData.get('year').trim());
    data.description = formData.get('description').trim();
    data.price = +(formData.get('price').trim());
    data.img = formData.get('img').trim();
    data.material = formData.get('material').trim();

    let isMakeValid = false;
    let isModelValid = false;
    let isYearValid = false;
    let isDescriptionValid = false;
    let isPriceValid = false;
    let isImgValid = false;

    if (data.make.length >= 4) {
      isMakeValid = true;
    }
    if (data.model.length >= 4) {
      isModelValid = true;
    }
    if (data.year >= 1950 && data.year <= 2050) {
      isYearValid = true;
    }
    if (data.description.length >= 10) {
      isDescriptionValid = true;
    }
    if (data.price > 0) {
      isPriceValid = true;
    }
    if (data.img != '') {
      isImgValid = true;
    }
    if (!isMakeValid || !isModelValid || !isYearValid || !isDescriptionValid || !isPriceValid || !isImgValid) {
      return ctx.render(createTemplate(onSubmit,
        'Make must be at least 4 symbols long!', isMakeValid,
        'Model must be at least 4 symbols long!', isModelValid,
        'Year must be between 1950 and 2050!', isYearValid,
        'Description must be more than 10 symbols!', isDescriptionValid,
        'Price must be a positive number!', isPriceValid,
        'Image URL is required!', isImgValid
      ));
    }
    //console.log(formData.getAll());  //error: argument required

    //return object with all fields
    /* console.log([...formData.entries()]
      .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})); */

    //not good :TODO: one by one
    //const formData = new FormData(e.target);
    //const make = formData.get('make').trim();
    //:TODO: validate one by one all fields!
    /* const data = [...formData.entries()]
      .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    if (Object.entries(data)
      .filter(([k, v]) => k != 'material')
      .some(([k, v]) => v == '')) {
      return alert('Some fields is missing!');
    }

    data.year = +data.year;
    data.price = +data.price;
    console.log('d: ' + data);
    console.log('d: ' + Object.entries(data)); */

    await createRecord(data);

    ctx.page.redirect('/');
  }
}