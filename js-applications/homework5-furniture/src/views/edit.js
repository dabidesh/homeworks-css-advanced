import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editRecord } from '../api/data.js';

const editTemplate = (onSubmit,
  errMake, isMakeValid,
  errModel, isModelValid,
  errYear, isYearValid,
  errDescription, isDescriptionValid,
  errPrice, isPriceValid,
  errImg, isImgValid,
  makeField,
  modelField,
  yearField,
  descriptionField,
  priceField,
  imgField,
  materialField) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>Edit Furniture</h1>
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
        <!-- was property but i like attribute for make vanilla app if have time, syntax: .value=$\{item.make\}-->
        <input class=${'form-control' + (!isMakeValid ? ' is-invalid' : ' is-valid')} id="new-make" type="text"
          name="make" value="${makeField}">
      </div>
      <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input class=${'form-control' + (!isModelValid ? ' is-invalid' : ' is-valid')} id="new-model" type="text"
          name="model" value="${modelField}">
      </div>
      <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input class=${'form-control' + (!isYearValid ? ' is-invalid' : ' is-valid')} id="new-year" type="number"
          name="year" value="${yearField}">
      </div>
      <div class=" form-group">
        <label class="form-control-label" for="new-description">Description</label>
        <input class=${'form-control' + (!isDescriptionValid ? ' is-invalid' : ' is-valid')} id="new-description"
          type="text" name="description" value="${descriptionField}">
      </div>
    </div>
    <div class=" col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input class=${'form-control' + (!isPriceValid ? ' is-invalid' : ' is-valid')} id="new-price" type="number"
          name="price" value="${priceField}">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input class=${'form-control' + (!isImgValid ? ' is-invalid' : ' is-valid')} id="new-image" type="text"
          name="img" value="${imgField}">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-material">Material (optional)</label>
        <input class="form-control" id="new-material" type="text" name="material" value="${materialField}">
      </div>
      <input type="submit" class="btn btn-info" value="Edit" />
    </div>
  </div>
</form>
`;

const editTemplateFirstLoad = (item, onSubmit) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields except material.</p>
  </div>
</div>
<form @submit=${onSubmit}>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-make">Make</label>
        <!-- was property but i like attribute for make vanilla app if have time, syntax: .value=$\{item.make\}-->
        <input class="form-control" id="new-make" type="text" name="make" value="${item.make}">
      </div>
      <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input class="form-control" id="new-model" type="text" name="model" value="${item.model}">
      </div>
      <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input class="form-control" id="new-year" type="number" name="year" value="${item.year}">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-description">Description</label>
        <input class="form-control" id="new-description" type="text" name="description" value="${item.description}">
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input class="form-control" id="new-price" type="number" name="price" value="${item.price}">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input class="form-control" id="new-image" type="text" name="img" value="${item.img}">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-material">Material (optional)</label>
        <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
      </div>
      <input type="submit" class="btn btn-info" value="Edit" />
    </div>
  </div>
</form>
`;

export async function editPage(ctx) {
  //console.log('edit page', ctx.params.id);  //1st stage

  const id = ctx.params.id;
  const item = await getItemById(id);

  //console.log('item: ' + item);  //  [object Object]


  ctx.render(editTemplateFirstLoad(item, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let data = {};
    data.make = formData.get('make').trim();
    data.model = formData.get('model').trim();
    data.year = +(formData.get('year').trim());
    data.description = formData.get('description').trim();
    data.price = +(formData.get('price').trim());
    data.img = formData.get('img').trim();
    data.material = formData.get('material').trim();

    //console.log(data.year);

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
      return ctx.render(editTemplate(onSubmit,
        'Make must be at least 4 symbols long!', isMakeValid,
        'Model must be at least 4 symbols long!', isModelValid,
        'Year must be between 1950 and 2050!', isYearValid,
        'Description must be more than 10 symbols!', isDescriptionValid,
        'Price must be a positive number!', isPriceValid,
        'Image URL is required!', isImgValid,
        data.make,
        data.model,
        data.year,
        data.description,
        data.price,
        data.img,
        data.material));
    }

    //console.log(data);

    await editRecord(item._id, data);

    ctx.page.redirect('/');

  }
}