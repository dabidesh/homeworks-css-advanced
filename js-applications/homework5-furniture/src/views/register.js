import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate = (onSubmit, errorMsg, invalidEmail, invalidPass, invalidRe) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
  </div>
</div>
<!-- Best way action action="/create"
@submit simple !-->
<form @submit=${onSubmit}>
  <div class="row space-top">
    <div class="col-md-4">
      ${errorMsg ? html`<p class="red">${errorMsg}</p>` : ''}
      <div class="form-group">
        <label class="form-control-label" for="email">Email</label>
        <input class=${'form-control' + (invalidEmail ? ' is-invalid' : ' is-valid')} id="email" type="text"
          name="email">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="password">Password</label>
        <input class=${'form-control' + (invalidPass ? ' is-invalid' : ' is-valid' )} id="password" type="password"
          name="password">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="rePass">Repeat</label>
        <input class=${'form-control' + (invalidRe ? ' is-invalid' : ' is-valid' )} id="rePass" type="password"
          name="rePass">
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </div>
  </div>
</form>`;



export async function registerPage(ctx) {
  //console.log('register page');

  ctx.render(registerTemplate(onSubmit));

  // not need to export
  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    if (email == '' || password == '' || rePass == '') {
      return ctx.render(registerTemplate(onSubmit, 'Please fill all fields!', email == '', password == '', rePass == ''));
    }

    if (password != rePass) {
      return ctx.render(registerTemplate(onSubmit, 'Passwords do not match!', false, true, true));
    }

    await register(email, password);

    ctx.setUserNav();
    ctx.page.redirect('/');
  }
}